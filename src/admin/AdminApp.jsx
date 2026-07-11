import { Routes, Route } from 'react-router-dom';
import AdminAuthGuard from './AdminAuthGuard';
import AdminLayout from './AdminLayout';
import AdminLoginPage from './pages/AdminLoginPage';
import DashboardPage from './pages/DashboardPage';
import CollectionListPage from './CollectionListPage';
import CollectionEditPage from './CollectionEditPage';
import SettingsListPage from './pages/SettingsListPage';
import SettingsEditPage from './pages/SettingsEditPage';

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<AdminLoginPage />} />
      <Route
        element={
          <AdminAuthGuard>
            <AdminLayout />
          </AdminAuthGuard>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="settings" element={<SettingsListPage />} />
        <Route path="settings/:key" element={<SettingsEditPage />} />
        <Route path=":collection" element={<CollectionListPage />} />
        <Route path=":collection/new" element={<CollectionEditPage />} />
        <Route path=":collection/:id" element={<CollectionEditPage />} />
      </Route>
    </Routes>
  );
}
