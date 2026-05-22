import { useState, useEffect } from 'react';
import { StoreProvider, useStoreContext } from './store';
import { ToastProvider } from './components/Toast';
import { AdminLogin } from './AdminLogin';
import { AdminLayout } from './AdminLayout';
import { TablesView } from './views/TablesView';
import { KitchenView } from './views/KitchenView';
import { ManagerView } from './views/ManagerView';
import { CashierView } from './views/CashierView';
import { ReservationsView } from './views/ReservationsView';
import type { User, View } from './types';

function AdminContent() {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = sessionStorage.getItem('kaya_admin_user');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });
  const [currentView, setCurrentView] = useState<View>('tables');

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('kaya_admin_user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('kaya_admin_user');
    }
  }, [user]);

  if (!user) {
    return <AdminLogin onLogin={(u) => { setUser(u); setCurrentView('tables'); }} />;
  }

  return (
    <AdminLayout user={user} currentView={currentView} onNavigate={setCurrentView} onLogout={() => setUser(null)}>
      {currentView === 'tables' && <TablesView />}
      {currentView === 'kitchen' && <KitchenView />}
      {currentView === 'manager' && <ManagerView />}
      {currentView === 'cashier' && <CashierView />}
      {currentView === 'reservations' && <ReservationsView />}
    </AdminLayout>
  );
}

export function AdminApp() {
  return (
    <StoreProvider>
      <ToastProvider>
        <AdminContent />
      </ToastProvider>
    </StoreProvider>
  );
}
