import { useStoreContext } from '../store';
import { useToast } from './Toast';

interface BillModalProps {
  tableId: number | null;
  onClose: () => void;
}

export function BillModal({ tableId, onClose }: BillModalProps) {
  const { store, updateStore } = useStoreContext();
  const toast = useToast();

  if (tableId === null) return null;

  const orders = store.orders.filter(o => o.tableId === tableId && !['cancelled', 'paid'].includes(o.status));

  if (orders.length === 0) {
    toast('No active orders for this table');
    return null;
  }

  const allItems: Record<string, { name: string; qty: number; price: number }> = {};
  orders.forEach(o => {
    o.items.forEach(i => {
      if (!allItems[i.id]) allItems[i.id] = { name: i.name, qty: 0, price: i.price };
      allItems[i.id].qty += i.qty;
    });
  });

  const subtotal = orders.reduce((s, o) => s + o.subtotal, 0);
  const tax = orders.reduce((s, o) => s + o.tax, 0);
  const service = orders.reduce((s, o) => s + o.service, 0);
  const total = subtotal + tax + service;
  const now = new Date().toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' });
  const orderIds = orders.map(o => o.id).join(', ');

  function markPaid() {
    updateStore(s => {
      const next = { ...s, orders: [...s.orders], tables: [...s.tables] };
      next.orders = next.orders.map(o =>
        o.tableId === tableId && !['cancelled', 'paid'].includes(o.status)
          ? { ...o, status: 'paid' as const, paidAt: Date.now() }
          : o
      );
      next.tables = next.tables.map(t =>
        t.id === tableId ? { ...t, status: 'free' as const, openedAt: null, orders: [], reservation: null } : t
      );
      toast(`✓ Table ${tableId} marked as paid & cleared`);
      return next;
    });
    onClose();
  }

  function printBill() {
    const printWin = window.open('', '_blank');
    if (!printWin) return;
    printWin.document.write(`
      <html><head><title>KAYA Bill</title>
      <style>
        body { font-family: monospace; font-size: 13px; padding: 20px; max-width: 300px; margin: 0 auto; }
        h1 { font-family: serif; text-align: center; color: #C8667A; font-size: 28px; letter-spacing: 3px; margin-bottom: 4px; }
        .addr { text-align: center; font-size: 12px; color: #888; margin-bottom: 20px; }
        .line { display: flex; justify-content: space-between; padding: 2px 0; }
        .total { font-size: 18px; font-weight: 800; border-top: 2px solid #000; padding-top: 8px; margin-top: 4px; }
        hr { border: none; border-top: 1px dashed #ccc; margin: 12px 0; }
        .thanks { text-align: center; font-size: 12px; color: #888; margin-top: 16px; font-style: italic; }
      </style></head><body>
      <h1>KAYA</h1>
      <div class="addr">Fine Dining Restaurant<br>Lahore, Pakistan</div>
      <div class="line"><span>Table ${tableId}</span><span>${now}</span></div>
      <div style="font-size:12px;color:#888;margin-bottom:4px">${orderIds}</div>
      <hr>
      <div class="line" style="font-weight:600;font-size:12px;text-transform:uppercase"><span>Item</span><span>Qty</span><span>Amount</span></div>
      ${Object.values(allItems).map(i => `<div class="line"><span>${i.name}</span><span>×${i.qty}</span><span>PKR ${(i.price * i.qty).toLocaleString()}</span></div>`).join('')}
      <hr>
      <div class="line"><span>Subtotal</span><span>PKR ${subtotal.toLocaleString()}</span></div>
      <div class="line"><span>Tax 17%</span><span>PKR ${tax.toLocaleString()}</span></div>
      <div class="line"><span>Service 5%</span><span>PKR ${service.toLocaleString()}</span></div>
      <div class="line total"><span>TOTAL</span><span>PKR ${total.toLocaleString()}</span></div>
      <div class="thanks">Thank you for dining at KAYA!<br>Please come again ✦</div>
      </body></html>
    `);
    printWin.document.close();
    printWin.print();
    toast('Sent to printer');
  }

  return (
    <div
      style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 500,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white', borderRadius: '24px 24px 0 0', width: '100%', maxWidth: 500,
          maxHeight: '90vh', overflowY: 'auto', padding: 24, animation: 'slideUp .25s ease',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#C8667A', letterSpacing: 3, textAlign: 'center', marginBottom: 4 }}>KAYA</div>
        <div style={{ fontSize: 12, color: '#8E8E93', textAlign: 'center', marginBottom: 20 }}>
          Fine Dining Restaurant<br />Lahore, Pakistan · Tel: 042-1234-5678
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#8E8E93', marginBottom: 4 }}>
          <span>Table {tableId}</span><span>{now}</span>
        </div>
        <div style={{ fontSize: 12, color: '#8E8E93', marginBottom: 4 }}>Orders: {orderIds}</div>
        <hr style={{ border: 'none', borderTop: '1px dashed #E5E5EA', margin: '16px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, color: '#636366', textTransform: 'uppercase', letterSpacing: '.5px', paddingBottom: 8 }}>
          <span>Item</span><span>Qty</span><span>Amount</span>
        </div>
        {Object.values(allItems).map((i, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '4px 0' }}>
            <span>{i.name}</span>
            <span style={{ color: '#636366' }}>×{i.qty}</span>
            <span>PKR {(i.price * i.qty).toLocaleString()}</span>
          </div>
        ))}
        <hr style={{ border: 'none', borderTop: '1px dashed #E5E5EA', margin: '16px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#636366', padding: '4px 0' }}>
          <span>Subtotal</span><span>PKR {subtotal.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#636366', padding: '4px 0' }}>
          <span>Tax 17%</span><span>PKR {tax.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#636366', padding: '4px 0' }}>
          <span>Service 5%</span><span>PKR {service.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 800, borderTop: '2px solid #1C1C1E', paddingTop: 10, marginTop: 6 }}>
          <span>TOTAL</span><span>PKR {total.toLocaleString()}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 20 }}>
          <button onClick={printBill} style={{ padding: 14, borderRadius: 12, fontSize: 15, fontWeight: 600, background: '#1C1C1E', color: 'white', border: 'none', cursor: 'pointer' }}>
            🖨 Print
          </button>
          <button onClick={markPaid} style={{ padding: 14, borderRadius: 12, fontSize: 15, fontWeight: 600, background: '#2E7D4F', color: 'white', border: 'none', cursor: 'pointer' }}>
            ✓ Paid
          </button>
          <button onClick={onClose} style={{ gridColumn: '1 / -1', padding: 14, borderRadius: 12, fontSize: 15, fontWeight: 600, background: '#F2F2F7', color: '#636366', border: 'none', cursor: 'pointer' }}>
            Close
          </button>
        </div>
        <div style={{ textAlign: 'center', fontSize: 13, color: '#8E8E93', marginTop: 16, fontStyle: 'italic' }}>
          Thank you for dining at KAYA!<br />Please come again ✦
        </div>
      </div>
    </div>
  );
}
