import { useState } from 'react';
import { useStoreContext } from '../store';
import { useToast } from '../components/Toast';

export function KitchenView() {
  const { store, updateStore } = useStoreContext();
  const toast = useToast();
  const [filter, setFilter] = useState<'all' | 'new' | 'cooking' | 'ready'>('all');

  const activeOrders = store.orders.filter(o => ['new', 'cooking', 'ready'].includes(o.status));
  const filtered = filter === 'all' ? activeOrders : activeOrders.filter(o => o.status === filter);

  function updateStatus(orderId: string, newStatus: string) {
    updateStore(s => {
      const next = { ...s, orders: [...s.orders], tables: [...s.tables] };
      next.orders = next.orders.map(o =>
        o.id === orderId ? { ...o, status: newStatus as any, statusUpdatedAt: Date.now() } : o
      );
      if (newStatus === 'served') {
        const order = next.orders.find(o => o.id === orderId);
        if (order) {
          const pending = next.orders.filter(o => o.tableId === order.tableId && ['new', 'cooking'].includes(o.status));
          if (pending.length <= 1) {
            next.tables = next.tables.map(t =>
              t.id === order.tableId ? { ...t, status: 'ready' as const } : t
            );
          }
        }
      }
      toast(`Order ${orderId} → ${newStatus}`);
      return next;
    });
  }

  const pills: Record<string, { bg: string; color: string }> = {
    new: { bg: '#FDECEA', color: '#B03020' },
    cooking: { bg: '#FFF3DC', color: '#8A5C10' },
    ready: { bg: '#E8F5EE', color: '#1A6B40' },
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Kitchen Display</h2>
        <span style={{ fontSize: 13, color: '#8E8E93' }}>{activeOrders.length} active ticket{activeOrders.length !== 1 ? 's' : ''}</span>
      </div>

      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 10, scrollbarWidth: 'none' }}>
        {(['all', 'new', 'cooking', 'ready'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{
              padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 500,
              border: f === filter ? 'none' : '1px solid #E5E5EA',
              background: f === filter ? '#C8667A' : 'white',
              color: f === filter ? 'white' : '#636366',
              cursor: 'pointer', whiteSpace: 'nowrap',
            }}
          >
            {f === 'all' ? 'All' : f === 'new' ? 'New 🔴' : f === 'cooking' ? 'Cooking 🟡' : 'Ready 🟢'}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {filtered.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 24px', color: '#8E8E93' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🍽️</div>
            <p style={{ fontSize: 15, margin: 0 }}>No {filter === 'all' ? 'active' : filter} orders</p>
          </div>
        ) : (
          filtered.sort((a, b) => a.sentAt - b.sentAt).map(o => {
            const age = Math.floor((Date.now() - o.sentAt) / 60000);
            return (
              <div key={o.id} style={{
                background: 'white', borderRadius: 14, padding: 14,
                boxShadow: '0 1px 3px rgba(0,0,0,.1), 0 4px 16px rgba(0,0,0,.06)',
                borderTop: `4px solid ${o.status === 'new' ? '#C0392B' : o.status === 'cooking' ? '#B07A1A' : '#2E7D4F'}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: '#1C1C1E' }}>T{o.tableId}</span>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600,
                    padding: '4px 10px', borderRadius: 20, letterSpacing: '.3px', textTransform: 'uppercase',
                    background: pills[o.status]?.bg || '#F5F5F5',
                    color: pills[o.status]?.color || '#888',
                  }}>{o.status}</span>
                  <span style={{ fontSize: 12, color: '#8E8E93' }}>{age}m ago</span>
                </div>
                <div style={{ fontSize: 11, color: '#8E8E93', marginBottom: 8 }}>
                  {o.id} · {o.waiter}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 12px' }}>
                  {o.items.map((i, idx) => (
                    <li key={idx} style={{
                      fontSize: 14, padding: '5px 0', borderBottom: '1px solid #E5E5EA',
                      display: 'flex', gap: 8,
                    }}>
                      <span style={{ fontWeight: 700, color: '#A04D5F', minWidth: 20 }}>{i.qty}×</span>
                      <div>
                        <div>{i.name}</div>
                        {i.note && <div style={{ fontSize: 11, color: '#8E8E93', fontStyle: 'italic' }}>{i.note}</div>}
                      </div>
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', gap: 6 }}>
                  {o.status === 'new' && (
                    <button onClick={() => updateStatus(o.id, 'cooking')}
                      style={{ flex: 1, padding: 8, borderRadius: 8, fontSize: 12, fontWeight: 600, background: '#FFF3DC', color: '#B07A1A', border: 'none', cursor: 'pointer' }}>
                      Start Cooking
                    </button>
                  )}
                  {o.status === 'cooking' && (
                    <button onClick={() => updateStatus(o.id, 'ready')}
                      style={{ flex: 1, padding: 8, borderRadius: 8, fontSize: 12, fontWeight: 600, background: '#E8F5EE', color: '#2E7D4F', border: 'none', cursor: 'pointer' }}>
                      Mark Ready ✓
                    </button>
                  )}
                  {o.status === 'ready' && (
                    <button onClick={() => updateStatus(o.id, 'served')}
                      style={{ flex: 1, padding: 8, borderRadius: 8, fontSize: 12, fontWeight: 600, background: '#EAF2FB', color: '#1A5C9E', border: 'none', cursor: 'pointer' }}>
                      Served ✓
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
