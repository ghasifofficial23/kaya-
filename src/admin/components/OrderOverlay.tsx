import { useState } from 'react';
import { useStoreContext } from '../store';
import { MENU, CATEGORIES, TAX_RATE, SERVICE_CHARGE } from '../menu';
import { useToast } from './Toast';
import { NoteModal } from './NoteModal';
import type { Table, MenuItem } from '../types';

interface OrderOverlayProps {
  table: Table | null;
  onClose: () => void;
  onSent: () => void;
}

export function OrderOverlay({ table, onClose, onSent }: OrderOverlayProps) {
  const { store, updateStore } = useStoreContext();
  const toast = useToast();
  const [orderMap, setOrderMap] = useState<Record<string, { item: MenuItem; qty: number; note: string }>>({});
  const [currentCat, setCurrentCat] = useState('All');
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [noteItemId, setNoteItemId] = useState<string | null>(null);

  if (!table) return null;

  const items = currentCat === 'All' ? MENU : MENU.filter(m => m.cat === currentCat);
  const orderVals = Object.values(orderMap);
  const itemCount = orderVals.reduce((s, i) => s + i.qty, 0);
  const subtotal = orderVals.reduce((s, i) => s + i.item.price * i.qty, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const service = Math.round(subtotal * SERVICE_CHARGE);
  const total = subtotal + tax + service;

  function changeQty(itemId: string, delta: number) {
    const item = MENU.find(m => m.id === itemId);
    if (!item) return;
    setOrderMap(prev => {
      const next = { ...prev };
      if (!next[itemId]) next[itemId] = { item, qty: 0, note: '' };
      next[itemId] = { ...next[itemId], qty: Math.max(0, next[itemId].qty + delta) };
      if (next[itemId].qty === 0) delete next[itemId];
      return next;
    });
  }

  function sendOrder() {
    if (itemCount === 0) return;
    const items = Object.values(orderMap);
    const sub = items.reduce((s, i) => s + i.item.price * i.qty, 0);
    const tx = Math.round(sub * TAX_RATE);
    const sv = Math.round(sub * SERVICE_CHARGE);

    const order = {
      id: 'ORD-' + String(store.nextOrderId).padStart(4, '0'),
      tableId: table.id,
      waiter: store.orders.length > 0 ? store.orders[0].waiter : 'Staff',
      items: items.map(i => ({ id: i.item.id, name: i.item.name, qty: i.qty, price: i.item.price, note: i.note })),
      subtotal: sub, tax: tx, service: sv,
      total: sub + tx + sv,
      status: 'new' as const,
      sentAt: Date.now(),
      statusUpdatedAt: Date.now(),
    };

    updateStore(s => {
      const next = { ...s, orders: [...s.orders], tables: [...s.tables], nextOrderId: s.nextOrderId + 1 };
      next.orders.push(order);
      next.tables = next.tables.map(t =>
        t.id === table.id
          ? { ...t, status: 'active' as const, openedAt: t.openedAt || Date.now(), orders: [...t.orders, order.id] }
          : t
      );
      return next;
    });

    toast(`✓ Order sent to kitchen — Table ${table.id}`);
    onSent();
  }

  const noteTarget = noteItemId ? orderMap[noteItemId]?.note || '' : '';

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#F2F2F7', zIndex: 200, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #E5E5EA', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 8, background: '#F2F2F7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#1C1C1E', border: 'none', cursor: 'pointer' }}>←</button>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>Table {table.id}</div>
          <div style={{ fontSize: 12, color: '#8E8E93' }}>{table.seats} seats</div>
        </div>
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20, letterSpacing: '.3px', textTransform: 'uppercase', background: table.status === 'free' ? '#F5F5F5' : '#FFF3DC', color: table.status === 'free' ? '#888' : '#B07A1A' }}>
          {table.status === 'free' ? 'New' : 'Add Items'}
        </span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, scrollbarWidth: 'none' }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCurrentCat(c)}
                style={{
                  padding: '7px 16px', borderRadius: 20, fontSize: 13, fontWeight: 500,
                  whiteSpace: 'nowrap', cursor: 'pointer',
                  background: c === currentCat ? '#C8667A' : 'white',
                  color: c === currentCat ? 'white' : '#636366',
                  border: c === currentCat ? 'none' : '1px solid #E5E5EA',
                }}
              >{c}</button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {items.map(item => {
              const inOrder = orderMap[item.id]?.qty || 0;
              return (
                <div key={item.id} onClick={() => changeQty(item.id, 1)}
                  style={{
                    background: inOrder ? '#F5E0E4' : 'white',
                    borderRadius: 14, padding: 12, border: `2px solid ${inOrder ? '#C8667A' : 'transparent'}`,
                    cursor: 'pointer', transition: 'all .15s', display: 'flex', flexDirection: 'column',
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1C1C1E', lineHeight: 1.3, marginBottom: 3 }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: '#8E8E93', lineHeight: 1.4, marginBottom: 8 }}>{item.desc}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: '#A04D5F' }}>PKR {item.price.toLocaleString()}</span>
                    {item.tag && (
                      <span style={{
                        fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px',
                        padding: '2px 6px', borderRadius: 4,
                        background: item.tag === 'veg' ? '#E8F5EE' : item.tag === 'sig' ? '#F5E0E4' : '#FFF0E0',
                        color: item.tag === 'veg' ? '#1A6B40' : item.tag === 'sig' ? '#A04D5F' : '#C05000',
                      }}>{item.tag}</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    {inOrder ? (
                      <button onClick={e => { e.stopPropagation(); setNoteItemId(item.id); }}
                        style={{ fontSize: 11, color: '#C8667A', padding: '2px 6px', border: '1px solid #F5E0E4', borderRadius: 4, background: 'none', cursor: 'pointer' }}>
                        + note
                      </button>
                    ) : <span />}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {inOrder ? (
                        <>
                          <button onClick={e => { e.stopPropagation(); changeQty(item.id, -1); }}
                            style={{ width: 26, height: 26, borderRadius: '50%', background: '#C8667A', color: 'white', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, border: 'none', cursor: 'pointer' }}>−</button>
                          <span style={{ fontSize: 14, fontWeight: 700, minWidth: 16, textAlign: 'center' }}>{orderMap[item.id].qty}</span>
                          <button onClick={e => { e.stopPropagation(); changeQty(item.id, 1); }}
                            style={{ width: 26, height: 26, borderRadius: '50%', background: '#C8667A', color: 'white', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, border: 'none', cursor: 'pointer' }}>+</button>
                        </>
                      ) : (
                        <button onClick={e => { e.stopPropagation(); changeQty(item.id, 1); }}
                          style={{ width: 26, height: 26, borderRadius: '50%', background: '#C8667A', color: 'white', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, border: 'none', cursor: 'pointer' }}>+</button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: 'white', borderTop: '1px solid #E5E5EA', flexShrink: 0 }}>
          <div onClick={() => setSummaryOpen(!summaryOpen)} style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>Order ({itemCount} item{itemCount !== 1 ? 's' : ''}) — PKR {total.toLocaleString()}</span>
            <span style={{ fontSize: 22, color: '#8E8E93', transform: summaryOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>⌃</span>
          </div>
          {summaryOpen && (
            <div style={{ maxHeight: '40vh', overflowY: 'auto', padding: '0 16px 12px' }}>
              {orderVals.length === 0 ? (
                <div style={{ padding: '12px 0', color: '#8E8E93', fontSize: 14, textAlign: 'center' }}>No items yet</div>
              ) : (
                <>
                  {orderVals.map(i => (
                    <div key={i.item.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #E5E5EA' }}>
                      <span style={{ fontSize: 13, color: '#636366', minWidth: 20, textAlign: 'center' }}>×{i.qty}</span>
                      <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>
                        {i.item.name}
                        {i.note && <div style={{ fontSize: 11, color: '#C8667A', marginTop: 2 }}>📝 {i.note}</div>}
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 600, minWidth: 54, textAlign: 'right' }}>PKR {(i.item.price * i.qty).toLocaleString()}</span>
                      <button onClick={() => changeQty(i.item.id, -999)}
                        style={{ width: 24, height: 24, borderRadius: 6, background: '#FDECEA', color: '#C0392B', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>×</button>
                    </div>
                  ))}
                  <div style={{ padding: '12px 0', borderTop: '1px solid #E5E5EA' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#636366', marginBottom: 6 }}><span>Subtotal</span><span>PKR {subtotal.toLocaleString()}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#636366', marginBottom: 6 }}><span>Tax (17%)</span><span>PKR {tax.toLocaleString()}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#636366', marginBottom: 6 }}><span>Service (5%)</span><span>PKR {service.toLocaleString()}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700, color: '#1C1C1E', marginTop: 4, paddingTop: 8, borderTop: '1px solid #E5E5EA' }}>
                      <span>Total</span><span>PKR {total.toLocaleString()}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          <button onClick={sendOrder} disabled={itemCount === 0}
            style={{
              margin: '0 16px 16px', padding: 16, borderRadius: 12,
              background: itemCount === 0 ? '#8E8E93' : '#C8667A',
              color: 'white', fontSize: 16, fontWeight: 700, textAlign: 'center',
              border: 'none', cursor: itemCount === 0 ? 'not-allowed' : 'pointer',
              opacity: itemCount === 0 ? 0.5 : 1, width: 'calc(100% - 32px)',
            }}
          >Send to Kitchen</button>
        </div>
      </div>

      <NoteModal
        open={noteItemId !== null}
        initialNote={noteTarget}
        onSave={(note) => {
          if (noteItemId && orderMap[noteItemId]) {
            setOrderMap(prev => ({
              ...prev,
              [noteItemId]: { ...prev[noteItemId], note },
            }));
          }
          setNoteItemId(null);
        }}
        onClose={() => setNoteItemId(null)}
      />
    </div>
  );
}
