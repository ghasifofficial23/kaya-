import { useState } from 'react';
import { useStoreContext } from '../store';
import { BillModal } from '../components/BillModal';

export function CashierView() {
  const { store } = useStoreContext();
  const [billTable, setBillTable] = useState<number | null>(null);

  const activeTables = store.tables.filter(t => t.status !== 'free');

  function tableTotal(tableId: number) {
    return store.orders
      .filter(o => o.tableId === tableId && o.status !== 'cancelled' && o.status !== 'paid')
      .reduce((sum, o) => sum + o.subtotal, 0);
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Tables — Billing</h2>
      </div>

      {activeTables.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 24px', color: '#8E8E93' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✓</div>
          <p style={{ fontSize: 15, margin: 0 }}>All tables are free</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {store.tables.map(t => {
            const total = tableTotal(t.id);
            const borderColor = t.status === 'free' ? '#E5E5EA' : t.status === 'active' ? '#E8BF60' : t.status === 'ready' ? '#6EC98A' : '#C8667A';
            return (
              <div key={t.id} onClick={() => t.status !== 'free' && setBillTable(t.id)}
                style={{
                  aspectRatio: '1', borderRadius: 14, border: '2px solid', borderColor,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: 4, cursor: t.status !== 'free' ? 'pointer' : 'default',
                  transition: 'all .2s', position: 'relative',
                  background: t.status === 'free' ? 'white' : t.status === 'active' ? '#FFFBF0' : t.status === 'ready' ? '#F0FBF4' : '#F5E0E4',
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 700, color: t.status === 'free' ? '#1C1C1E' : t.status === 'active' ? '#B07A1A' : t.status === 'ready' ? '#2E7D4F' : '#A04D5F' }}>{t.id}</div>
                <div style={{ fontSize: 11, color: '#8E8E93' }}>{t.seats} seats</div>
                <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.5px', color: t.status === 'free' ? '#8E8E93' : t.status === 'active' ? '#B07A1A' : t.status === 'ready' ? '#2E7D4F' : '#C8667A' }}>
                  {t.status}
                </div>
                {total > 0 && <div style={{ fontSize: 11, fontWeight: 600, position: 'absolute', bottom: 8, color: '#636366' }}>PKR {total.toLocaleString()}</div>}
              </div>
            );
          })}
        </div>
      )}

      <BillModal tableId={billTable} onClose={() => setBillTable(null)} />
    </div>
  );
}
