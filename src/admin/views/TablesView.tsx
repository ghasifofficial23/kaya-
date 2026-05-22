import { useState } from 'react';
import { useStoreContext } from '../store';
import { OrderOverlay } from '../components/OrderOverlay';
import type { Table } from '../types';

export function TablesView() {
  const { store } = useStoreContext();
  const [activeTable, setActiveTable] = useState<Table | null>(null);

  const freeCount = store.tables.filter(t => t.status === 'free').length;

  function tableTotal(t: Table) {
    return store.orders
      .filter(o => o.tableId === t.id && o.status !== 'cancelled' && o.status !== 'paid')
      .reduce((sum, o) => sum + o.subtotal, 0);
  }

  function elapsed(ts: number) {
    const mins = Math.floor((Date.now() - ts) / 60000);
    if (mins < 60) return `${mins}m`;
    return `${Math.floor(mins / 60)}h${mins % 60}m`;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Tables</h2>
        <span style={{ fontSize: 13, color: '#8E8E93' }}>{freeCount} free · {store.tables.length - freeCount} occupied</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {store.tables.map(t => {
          const total = tableTotal(t);
          const statusClass = t.status === 'free' ? { background: 'white', borderColor: '#E5E5EA' }
            : t.status === 'active' ? { background: '#FFFBF0', borderColor: '#E8BF60' }
            : t.status === 'reserved' ? { background: '#F5E0E4', borderColor: '#C8667A' }
            : { background: '#F0FBF4', borderColor: '#6EC98A' };

          return (
            <div key={t.id} onClick={() => setActiveTable(t)}
              style={{
                aspectRatio: '1', borderRadius: 14, border: '2px solid',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 4, cursor: 'pointer', transition: 'all .2s', position: 'relative',
                ...statusClass,
              }}
            >
              {t.openedAt && <div style={{ fontSize: 10, color: '#8E8E93', position: 'absolute', top: 8, right: 8 }}>{elapsed(t.openedAt)}</div>}
              <div style={{ fontSize: 22, fontWeight: 700, color: t.status === 'free' ? '#1C1C1E' : t.status === 'active' ? '#B07A1A' : t.status === 'reserved' ? '#A04D5F' : '#2E7D4F' }}>{t.id}</div>
              <div style={{ fontSize: 11, color: '#8E8E93' }}>{t.seats} seats</div>
              <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px', color: t.status === 'free' ? '#8E8E93' : t.status === 'active' ? '#B07A1A' : t.status === 'reserved' ? '#C8667A' : '#2E7D4F' }}>
                {t.status === 'free' ? 'Free' : t.status === 'active' ? 'Occupied' : t.status === 'reserved' ? 'Reserved' : 'Ready'}
              </div>
              {t.reservation && <div style={{ fontSize: 9, color: '#C8667A', marginTop: 2 }}>{t.reservation.name}</div>}
              {total > 0 && <div style={{ fontSize: 11, fontWeight: 600, position: 'absolute', bottom: 8, color: '#636366' }}>PKR {total.toLocaleString()}</div>}
            </div>
          );
        })}
      </div>

      {activeTable && (
        <OrderOverlay table={activeTable} onClose={() => setActiveTable(null)} onSent={() => setActiveTable(null)} />
      )}
    </div>
  );
}
