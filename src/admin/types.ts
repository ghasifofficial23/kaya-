export interface MenuItem {
  id: string;
  cat: string;
  name: string;
  desc: string;
  price: number;
  tag: string;
}

export interface Table {
  id: number;
  seats: number;
  status: 'free' | 'active' | 'reserved' | 'ready';
  orders: string[];
  reservation: { name: string; time: string; guests: number } | null;
  openedAt?: number | null;
}

export interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  note: string;
}

export interface Order {
  id: string;
  tableId: number;
  waiter: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  service: number;
  total: number;
  status: 'new' | 'cooking' | 'ready' | 'served' | 'paid' | 'cancelled';
  sentAt: number;
  statusUpdatedAt: number;
  paidAt?: number;
}

export interface Reservation {
  id: string;
  name: string;
  guests: number;
  date: string;
  time: string;
  tableId: number;
  phone: string;
  notes: string;
  status: 'confirmed' | 'seated' | 'cancelled';
}

export interface Store {
  tables: Table[];
  orders: Order[];
  reservations: Reservation[];
  session: { opened: number; revenue: number; covers: number };
  nextOrderId: number;
}

export type Role = 'waiter' | 'kitchen' | 'manager' | 'cashier';

export interface User {
  name: string;
  role: Role;
}

export type View = 'tables' | 'kitchen' | 'manager' | 'cashier' | 'reservations';
