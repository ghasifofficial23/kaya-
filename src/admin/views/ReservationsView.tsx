import { useState } from 'react';
import { useStoreContext } from '../store';
import { useToast } from '../components/Toast';

export function ReservationsView() {
  const { store, updateStore } = useStoreContext();
  const toast = useToast();
  const [tab, setTab] = useState<'upcoming' | 'new'>('upcoming');
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '19:30', guests: 2, tableId: 1, notes: '' });

  const today = new Date().toISOString().split('T')[0];
  const upcoming = store.reservations
    .filter(r => r.date >= today && r.status === 'confirmed')
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  const minDate = new Date().toISOString().split('T')[0];

  function saveReservation() {
    if (!form.name.trim()) { toast('Please enter guest name'); return; }
    const res = {
      id: 'r' + Date.now(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      date: form.date,
      time: form.time,
      guests: form.guests,
      tableId: form.tableId,
      notes: form.notes.trim(),
      status: 'confirmed' as const,
    };
    updateStore(s => {
      const next = { ...s, reservations: [...s.reservations], tables: [...s.tables] };
      next.reservations.push(res);
      next.tables = next.tables.map(t =>
        t.id === form.tableId && t.status === 'free'
          ? { ...t, status: 'reserved' as const, reservation: { name: form.name.trim(), time: form.time, guests: form.guests } }
          : t
      );
      return next;
    });
    toast(`✓ Reservation confirmed for ${form.name}`);
    setTab('upcoming');
  }

  function seatReservation(resId: string) {
    updateStore(s => {
      const res = s.reservations.find(r => r.id === resId);
      if (!res) return s;
      const next = { ...s, reservations: [...s.reservations], tables: [...s.tables] };
      next.reservations = next.reservations.map(r => r.id === resId ? { ...r, status: 'seated' as const } : r);
      next.tables = next.tables.map(t =>
        t.id === res.tableId ? { ...t, status: 'active' as const, openedAt: Date.now(), reservation: null } : t
      );
      toast(`Table ${res.tableId} seated for ${res.name}`);
      return next;
    });
  }

  function cancelReservation(resId: string) {
    updateStore(s => {
      const res = s.reservations.find(r => r.id === resId);
      if (!res) return s;
      const next = { ...s, reservations: [...s.reservations], tables: [...s.tables] };
      next.reservations = next.reservations.map(r => r.id === resId ? { ...r, status: 'cancelled' as const } : r);
      next.tables = next.tables.map(t =>
        t.id === res.tableId && t.status === 'reserved' ? { ...t, status: 'free' as const } : t
      );
      toast('Reservation cancelled');
      return next;
    });
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => setTab('upcoming')}
          style={{
            padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 500,
            border: tab === 'upcoming' ? 'none' : '1px solid #E5E5EA',
            background: tab === 'upcoming' ? '#C8667A' : 'white',
            color: tab === 'upcoming' ? 'white' : '#636366', cursor: 'pointer',
          }}>Upcoming</button>
        <button onClick={() => setTab('new')}
          style={{
            padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 500,
            border: tab === 'new' ? 'none' : '1px solid #E5E5EA',
            background: tab === 'new' ? '#C8667A' : 'white',
            color: tab === 'new' ? 'white' : '#636366', cursor: 'pointer',
          }}>+ New</button>
      </div>

      {tab === 'upcoming' ? (
        upcoming.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 24px', color: '#8E8E93' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📅</div>
            <p style={{ fontSize: 15, margin: 0 }}>No upcoming reservations</p>
          </div>
        ) : (
          upcoming.map(r => {
            const isToday = r.date === today;
            return (
              <div key={r.id} style={{
                background: 'white', borderRadius: 14, padding: '14px 16px', marginBottom: 8,
                boxShadow: '0 1px 3px rgba(0,0,0,.1), 0 4px 16px rgba(0,0,0,.06)',
                display: 'flex', gap: 14, alignItems: 'center',
              }}>
                <div style={{ background: '#F5E0E4', borderRadius: 10, padding: '8px 12px', textAlign: 'center', minWidth: 60 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#A04D5F' }}>{r.time}</div>
                  <div style={{ fontSize: 10, color: '#C8667A', fontWeight: 600, textTransform: 'uppercase' }}>
                    {isToday ? 'Today' : new Date(r.date).toLocaleDateString('en-PK', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: '#8E8E93', marginTop: 2 }}>
                    {r.guests} guests · Table {r.tableId} · {r.phone}
                  </div>
                  {r.notes && <div style={{ fontSize: 11, color: '#C8667A', marginTop: 3 }}>📝 {r.notes}</div>}
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => seatReservation(r.id)}
                    style={{ padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, background: '#E8F5EE', color: '#2E7D4F', border: 'none', cursor: 'pointer' }}>
                    Seat
                  </button>
                  <button onClick={() => cancelReservation(r.id)}
                    style={{ padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, background: '#FDECEA', color: '#C0392B', border: 'none', cursor: 'pointer' }}>
                    ✕
                  </button>
                </div>
              </div>
            );
          })
        )
      ) : (
        <div style={{ background: 'white', borderRadius: 14, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,.1), 0 4px 16px rgba(0,0,0,.06)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#636366', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>New Reservation</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#636366', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '.5px' }}>Guest Name</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #E5E5EA', fontSize: 15, color: '#1C1C1E', background: 'white', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                placeholder="Full name" />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#636366', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '.5px' }}>Phone</label>
              <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #E5E5EA', fontSize: 15, color: '#1C1C1E', background: 'white', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                placeholder="+92 3xx xxxxxxx" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#636366', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '.5px' }}>Date</label>
              <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                min={minDate}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #E5E5EA', fontSize: 15, color: '#1C1C1E', background: 'white', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#636366', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '.5px' }}>Time</label>
              <select value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #E5E5EA', fontSize: 15, color: '#1C1C1E', background: 'white', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}>
                <option>12:00</option><option>13:00</option><option>14:00</option>
                <option>18:00</option><option>19:00</option><option selected>19:30</option>
                <option>20:00</option><option>20:30</option><option>21:00</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#636366', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '.5px' }}>Guests</label>
              <select value={form.guests} onChange={e => setForm(f => ({ ...f, guests: parseInt(e.target.value) }))}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #E5E5EA', fontSize: 15, color: '#1C1C1E', background: 'white', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#636366', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '.5px' }}>Table</label>
              <select value={form.tableId} onChange={e => setForm(f => ({ ...f, tableId: parseInt(e.target.value) }))}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #E5E5EA', fontSize: 15, color: '#1C1C1E', background: 'white', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}>
                {store.tables.map(t => <option key={t.id} value={t.id}>Table {t.id} ({t.seats} seats)</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#636366', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '.5px' }}>Special Notes</label>
            <input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #E5E5EA', fontSize: 15, color: '#1C1C1E', background: 'white', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
              placeholder="Birthday, dietary requirements..." />
          </div>
          <button onClick={saveReservation}
            style={{ width: '100%', padding: 14, borderRadius: 12, fontSize: 15, fontWeight: 600, background: '#C8667A', color: 'white', border: 'none', cursor: 'pointer' }}>
            Confirm Reservation →
          </button>
        </div>
      )}
    </div>
  );
}
