import { useStoreContext } from '../store';

export function ManagerView() {
  const { store } = useStoreContext();

  const paid = store.orders.filter(o => o.status === 'paid');
  const revenue = paid.reduce((s, o) => s + o.total, 0);
  const activeOrders = store.orders.filter(o => ['new', 'cooking', 'ready', 'served'].includes(o.status));
  const occupied = store.tables.filter(t => t.status !== 'free').length;

  const stats = [
    { val: `PKR ${revenue.toLocaleString()}`, lbl: 'Revenue today', color: '#2E7D4F' },
    { val: paid.length, lbl: 'Bills closed', color: '#1A5C9E' },
    { val: `${occupied}/${store.tables.length}`, lbl: 'Tables occupied', color: '#C8667A' },
    { val: activeOrders.length, lbl: 'Active orders', color: '#B07A1A' },
  ];

  function elapsed(ts: number) {
    const mins = Math.floor((Date.now() - ts) / 60000);
    return `${mins}m`;
  }

  const active = store.orders.filter(o => ['new', 'cooking', 'ready', 'served'].includes(o.status));
  const log = store.orders.filter(o => o.status === 'paid' || o.status === 'cancelled');

  function exportCSV() {
    const rows = [['Order ID', 'Table', 'Waiter', 'Items', 'Subtotal', 'Tax', 'Service', 'Total', 'Status', 'Time']];
    store.orders.forEach(o => {
      rows.push([o.id, o.tableId.toString(), o.waiter, o.items.map(i => `${i.qty}x${i.name}`).join(';'), o.subtotal.toString(), o.tax.toString(), o.service.toString(), o.total.toString(), o.status, new Date(o.sentAt).toLocaleString()]);
    });
    const csv = rows.map(r => r.join(',')).join('\n');
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = `kaya_orders_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  }

  const pills: Record<string, { bg: string; color: string }> = {
    new: { bg: '#FDECEA', color: '#B03020' },
    cooking: { bg: '#FFF3DC', color: '#8A5C10' },
    ready: { bg: '#E8F5EE', color: '#1A6B40' },
    served: { bg: '#EAF2FB', color: '#1A5C9E' },
    paid: { bg: '#E8F5EE', color: '#1A6B40' },
    cancelled: { bg: '#F5F5F5', color: '#888' },
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 12 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: 'white', borderRadius: 14, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,.1), 0 4px 16px rgba(0,0,0,.06)' }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color, marginBottom: 2 }}>{s.val}</div>
            <div style={{ fontSize: 12, color: '#8E8E93', fontWeight: 500 }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'white', borderRadius: 14, padding: 16, marginBottom: 12, boxShadow: '0 1px 3px rgba(0,0,0,.1), 0 4px 16px rgba(0,0,0,.06)' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#636366', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>Active Orders</div>
        {active.length === 0 ? (
          <div style={{ padding: 24, textAlign: 'center', color: '#8E8E93' }}><p style={{ margin: 0 }}>No active orders</p></div>
        ) : (
          active.sort((a, b) => b.sentAt - a.sentAt).map(o => (
            <div key={o.id} style={{
              background: 'white', borderRadius: 8, padding: '14px 16px', marginBottom: 8,
              boxShadow: '0 1px 3px rgba(0,0,0,.1), 0 4px 16px rgba(0,0,0,.06)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ fontSize: 20, fontWeight: 800, minWidth: 32, color: '#1C1C1E' }}>{o.tableId}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>
                  {o.id}
                  <span style={{
                    marginLeft: 6, display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 600,
                    padding: '2px 8px', borderRadius: 20, letterSpacing: '.3px', textTransform: 'uppercase',
                    background: pills[o.status]?.bg || '#F5F5F5', color: pills[o.status]?.color || '#888',
                  }}>{o.status}</span>
                </div>
                <div style={{ fontSize: 13, color: '#636366', marginTop: 2, lineHeight: 1.4 }}>
                  {o.items.map(i => `${i.qty}× ${i.name}`).join(' · ')}
                </div>
                <div style={{ fontSize: 11, color: '#8E8E93', marginTop: 2 }}>Waiter: {o.waiter}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>PKR {o.total.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: '#8E8E93', marginTop: 2 }}>{elapsed(o.sentAt)} ago</div>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ background: 'white', borderRadius: 14, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,.1), 0 4px 16px rgba(0,0,0,.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#636366', textTransform: 'uppercase', letterSpacing: '.8px' }}>Session Log</span>
          <button onClick={exportCSV} style={{ padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, background: '#C8667A', color: 'white', border: 'none', cursor: 'pointer' }}>
            Export CSV
          </button>
        </div>
        {log.length === 0 ? (
          <div style={{ color: '#8E8E93', fontSize: 14, padding: '12px 0' }}>No completed orders yet</div>
        ) : (
          log.slice().reverse().map(o => (
            <div key={o.id} style={{
              background: 'white', borderRadius: 8, padding: '14px 16px', marginBottom: 8,
              boxShadow: '0 1px 3px rgba(0,0,0,.1), 0 4px 16px rgba(0,0,0,.06)',
              display: 'flex', alignItems: 'center', gap: 12, opacity: o.status === 'cancelled' ? 0.5 : 1,
            }}>
              <div style={{ fontSize: 20, fontWeight: 800, minWidth: 32, color: o.status === 'paid' ? '#2E7D4F' : '#C0392B' }}>{o.tableId}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>
                  {o.id}
                  <span style={{
                    marginLeft: 6, display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 600,
                    padding: '2px 8px', borderRadius: 20, letterSpacing: '.3px', textTransform: 'uppercase',
                    background: pills[o.status]?.bg || '#F5F5F5', color: pills[o.status]?.color || '#888',
                  }}>{o.status}</span>
                </div>
                <div style={{ fontSize: 12, color: '#636366', marginTop: 2 }}>
                  {o.items.map(i => `${i.qty}× ${i.name}`).join(' · ')}
                </div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: o.status === 'paid' ? '#2E7D4F' : '#C0392B' }}>
                PKR {o.total.toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
