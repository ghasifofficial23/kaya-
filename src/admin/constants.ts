import type { Role, View } from './types';

export const ROLE_NAVS: Record<Role, View[]> = {
  waiter: ['tables', 'reservations'],
  kitchen: ['kitchen'],
  manager: ['tables', 'kitchen', 'manager', 'reservations'],
  cashier: ['tables', 'cashier', 'manager'],
};

export const NAV_DEFS: Record<View, { label: string; icon: string }> = {
  tables: { label: 'Tables', icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="2" rx="1"/><rect x="8" y="10" width="2" height="8" rx="1"/><rect x="14" y="10" width="2" height="8" rx="1"/></svg>` },
  kitchen: { label: 'Kitchen', icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C7 2 3 6 3 11v2h18v-2c0-5-4-9-9-9z"/><rect x="8" y="14" width="8" height="6" rx="1"/></svg>` },
  manager: { label: 'Dashboard', icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>` },
  cashier: { label: 'Billing', icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>` },
  reservations: { label: 'Reserve', icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/></svg>` },
};
