import { useState } from 'react';
import type { Role, User } from './types';

interface AdminLoginProps {
  onLogin: (user: User) => void;
}

const ROLES: { key: Role; icon: string; label: string }[] = [
  { key: 'waiter', icon: '🧑‍🍽️', label: 'Waiter' },
  { key: 'kitchen', icon: '👨‍🍳', label: 'Kitchen' },
  { key: 'manager', icon: '📊', label: 'Manager' },
  { key: 'cashier', icon: '💳', label: 'Cashier' },
];

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [role, setRole] = useState<Role>('waiter');
  const [name, setName] = useState('');

  function handleSubmit() {
    onLogin({ name: name.trim() || role.charAt(0).toUpperCase() + role.slice(1), role });
  }

  return (
    <div style={{
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(145deg,#1C0A0F 0%,#2D1520 50%,#1A0D0D 100%)',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)',
        borderRadius: 24, padding: 48, width: 340, textAlign: 'center',
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, color: '#F5C4D0', letterSpacing: 4, marginBottom: 4 }}>
          KAYA
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 40 }}>
          Restaurant Management
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {ROLES.map(r => (
            <button key={r.key} onClick={() => setRole(r.key)}
              style={{
                padding: '16px 10px', borderRadius: 12, cursor: 'pointer',
                border: role === r.key ? '1px solid rgba(200,102,122,.5)' : '1px solid rgba(255,255,255,.12)',
                background: role === r.key ? 'rgba(200,102,122,.2)' : 'transparent',
                color: role === r.key ? '#F5C4D0' : 'rgba(255,255,255,.7)',
                fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                transition: 'all .2s',
              }}
            >
              <span style={{ fontSize: 24 }}>{r.icon}</span>
              <span>{r.label}</span>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="Your name..."
            maxLength={20}
            style={{
              flex: 1, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)',
              borderRadius: 10, padding: '12px 14px', color: 'white', fontSize: 14, outline: 'none',
              fontFamily: 'inherit',
            }}
          />
        </div>
        <button onClick={handleSubmit}
          style={{
            width: '100%', padding: 14, borderRadius: 10,
            background: '#C8667A', color: 'white', fontSize: 15, fontWeight: 600,
            border: 'none', cursor: 'pointer', letterSpacing: '.3px', fontFamily: 'inherit',
            transition: 'background .2s',
          }}
        >
          Enter System →
        </button>
      </div>
    </div>
  );
}
