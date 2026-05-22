import { useStoreContext } from './store';
import { ROLE_NAVS, NAV_DEFS } from './constants';
import type { User, View } from './types';

interface AdminLayoutProps {
  user: User;
  currentView: View;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export function AdminLayout({ user, currentView, onNavigate, onLogout, children }: AdminLayoutProps) {
  const { store } = useStoreContext();
  const navItems = ROLE_NAVS[user.role];

  const newOrdersCount = store.orders.filter(o => o.status === 'new').length;

  return (
    <div style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', sans-serif" }}>
      <div style={{
        height: 56, background: 'white', borderBottom: '1px solid #E5E5EA',
        display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12, flexShrink: 0, position: 'relative', zIndex: 100,
      }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#C8667A', letterSpacing: 2, flex: 1 }}>
          KAYA
        </span>
        <span style={{ fontSize: 13, color: '#636366', display: 'flex', alignItems: 'center', gap: 6 }}>
          {user.name}
          <span style={{ background: '#F5E0E4', color: '#A04D5F', fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '.5px' }}>
            {user.role}
          </span>
        </span>
        <button onClick={() => onNavigate('kitchen')} style={{
          width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 18, color: '#636366', border: 'none', background: 'none', cursor: 'pointer', position: 'relative',
        }}>
          🔔
          {newOrdersCount > 0 && <span style={{
            position: 'absolute', top: -1, right: -1, width: 8, height: 8,
            background: '#C8667A', borderRadius: '50%', border: '2px solid white',
          }} />}
        </button>
        <button onClick={onLogout} style={{
          width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 18, color: '#636366', border: 'none', background: 'none', cursor: 'pointer',
        }}>
          ↩
        </button>
      </div>

      <div id="main" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: 16 }}>
        {children}
      </div>

      <nav style={{
        height: 64, background: 'white', borderTop: '1px solid #E5E5EA',
        display: 'flex', flexShrink: 0,
      }}>
        {navItems.map(key => (
          <button key={key} onClick={() => onNavigate(key)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 3, fontSize: 10, fontWeight: 500, border: 'none', background: 'none', cursor: 'pointer',
              color: currentView === key ? '#C8667A' : '#8E8E93',
              position: 'relative',
            }}
          >
            <span dangerouslySetInnerHTML={{ __html: NAV_DEFS[key].icon }} />
            <span>{NAV_DEFS[key].label}</span>
            {key === 'kitchen' && newOrdersCount > 0 && (
              <span style={{
                position: 'absolute', top: 6, right: 'calc(50% - 18px)',
                background: '#C8667A', color: 'white', fontSize: 9, fontWeight: 700,
                minWidth: 16, height: 16, borderRadius: 8, padding: '0 4px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {newOrdersCount}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
