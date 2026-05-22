import { createContext, useContext, useCallback, useSyncExternalStore, useEffect, type ReactNode } from 'react';
import type { Store, Table, Order, Reservation } from './types';
import { TAX_RATE, SERVICE_CHARGE } from './menu';

const STORE_KEY = 'kaya_pos_data';

function initStore(): Store {
  const tables: Table[] = Array.from({ length: 9 }, (_, i) => {
    const id = i + 1;
    const seats = [2, 4, 4, 6, 2, 4, 8, 4, 2][i];
    if (id === 2) return { id, seats, status: 'active', orders: [], reservation: null, openedAt: Date.now() - 3600000 };
    if (id === 4) return { id, seats, status: 'reserved', orders: [], reservation: { name: 'Ahmed Khan', time: '19:30', guests: 5 } };
    if (id === 6) return { id, seats, status: 'active', orders: [], reservation: null, openedAt: Date.now() - 1800000 };
    return { id, seats, status: 'free', orders: [], reservation: null };
  });

  const today = new Date();
  const tom = new Date(today); tom.setDate(tom.getDate() + 1);
  const fmt = (d: Date) => d.toISOString().split('T')[0];
  const reservations: Reservation[] = [
    { id: 'r1', name: 'Sara Malik', guests: 4, date: fmt(today), time: '19:00', tableId: 4, phone: '+92 300 1234567', notes: 'Anniversary', status: 'confirmed' },
    { id: 'r2', name: 'Bilal Ahmed', guests: 2, date: fmt(today), time: '20:00', tableId: 1, phone: '+92 321 9876543', notes: '', status: 'confirmed' },
    { id: 'r3', name: 'Ayesha Noor', guests: 6, date: fmt(tom), time: '19:30', tableId: 7, phone: '+92 333 5551234', notes: 'Birthday cake', status: 'confirmed' },
  ];

  const orders: Order[] = [];
  const demo = [
    { tableId: 2, waiter: 'Ayesha', items: [{ id: 'm1', name: 'Kaya Signature Karahi', qty: 2, price: 2200, note: '' }, { id: 'b1', name: 'Garlic Naan', qty: 4, price: 180, note: '' }] },
    { tableId: 6, waiter: 'Hassan', items: [{ id: 's1', name: 'Chicken Malai Tikka', qty: 1, price: 950, note: '' }, { id: 'dr2', name: 'Mango Lassi', qty: 2, price: 320, note: '' }, { id: 'm3', name: 'Butter Chicken', qty: 2, price: 1800, note: 'less spicy' }] },
  ];
  let nextId = 1;
  demo.forEach(d => {
    const sub = d.items.reduce((s, i) => s + i.price * i.qty, 0);
    const tax = Math.round(sub * TAX_RATE);
    const svc = Math.round(sub * SERVICE_CHARGE);
    orders.push({
      id: 'ORD-' + String(nextId).padStart(4, '0'),
      tableId: d.tableId,
      waiter: d.waiter,
      items: d.items,
      subtotal: sub,
      tax,
      service: svc,
      total: sub + tax + svc,
      status: 'cooking',
      sentAt: Date.now() - Math.random() * 900000,
      statusUpdatedAt: Date.now(),
    });
    nextId++;
  });

  return { tables, orders, reservations, session: { opened: Date.now(), revenue: 0, covers: 0 }, nextOrderId: nextId };
}

function getStore(): Store {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : initStore();
  } catch {
    return initStore();
  }
}

function setStore(data: Store) {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
  try {
    const bc = new BroadcastChannel('kaya_pos');
    bc.postMessage({ type: 'update' });
    bc.close();
  } catch { }
}

const listeners = new Set<() => void>();
let cachedStore: Store | null = null;

function subscribeToStore(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): Store {
  if (!cachedStore) cachedStore = getStore();
  return cachedStore;
}

function broadcastUpdate() {
  cachedStore = getStore();
  listeners.forEach(l => l());
}

export function useStore() {
  const store = useSyncExternalStore(subscribeToStore, getSnapshot, getSnapshot);

  const updateStore = useCallback((updater: (s: Store) => Store) => {
    const next = updater(getStore());
    setStore(next);
    cachedStore = next;
    listeners.forEach(l => l());
  }, []);

  return { store, updateStore };
}

type StoreContextType = ReturnType<typeof useStore>;
const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const value = useStore();

  useEffect(() => {
    let bc: BroadcastChannel;
    try {
      bc = new BroadcastChannel('kaya_pos');
      bc.onmessage = () => broadcastUpdate();
    } catch { }
    return () => { try { bc?.close(); } catch { } };
  }, []);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStoreContext() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStoreContext must be used within StoreProvider');
  return ctx;
}
