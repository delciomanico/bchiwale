import { Link } from 'react-router-dom';
import { ADMIN_COLLECTIONS } from '../collections.config';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(ADMIN_COLLECTIONS).map(([key, cfg]) => (
          <Link
            key={key}
            to={`/admin/${key}`}
            className="block bg-white rounded border border-slate-200 p-5 hover:border-blue-400 hover:shadow-sm transition"
          >
            <p className="text-sm font-semibold text-slate-800">{cfg.title}</p>
            <p className="text-xs text-slate-500 mt-1">Gerir registos de {cfg.title.toLowerCase()}</p>
          </Link>
        ))}
        <Link
          to="/admin/settings"
          className="block bg-white rounded border border-slate-200 p-5 hover:border-blue-400 hover:shadow-sm transition"
        >
          <p className="text-sm font-semibold text-slate-800">Definições do Site</p>
          <p className="text-xs text-slate-500 mt-1">Menu, rodapé, contacto, banner, linha do tempo, certificações…</p>
        </Link>
      </div>
    </div>
  );
}
