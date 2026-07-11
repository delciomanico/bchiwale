import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { api } from './lib/api';
import { ADMIN_COLLECTIONS } from './collections.config';

const NAV_LINKS = [
  { to: '/admin', label: 'Dashboard', end: true },
  ...Object.entries(ADMIN_COLLECTIONS).map(([key, cfg]) => ({ to: `/admin/${key}`, label: cfg.title })),
  { to: '/admin/settings', label: 'Definições do Site' },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  async function handleLogout() {
    await api.post('/api/auth/logout', {});
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-56 shrink-0 bg-slate-900 text-slate-200 flex flex-col">
        <div className="px-5 py-5 text-sm font-bold tracking-wide text-white border-b border-slate-800">
          B-CHIWALE CMS
        </div>
        <nav className="flex-1 py-3">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `block px-5 py-2.5 text-sm ${isActive ? 'bg-slate-800 text-white font-medium' : 'text-slate-300 hover:bg-slate-800/60'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button onClick={handleLogout} className="px-5 py-4 text-left text-xs text-slate-400 hover:text-white border-t border-slate-800">
          Terminar sessão
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
