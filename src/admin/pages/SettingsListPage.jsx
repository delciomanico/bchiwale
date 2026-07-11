import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';

export default function SettingsListPage() {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/api/admin/settings').then(setRows).catch((e) => setError(e.message));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-800 mb-2">Definições do Site</h1>
      <p className="text-sm text-slate-500 mb-6">
        Blocos de conteúdo estrutural (menu, rodapé, contacto, banner, linha do tempo, filtros, etc.), editados como
        JSON — mantenha a mesma estrutura de campos ao editar.
      </p>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      {!rows ? (
        <p className="text-sm text-slate-500">A carregar…</p>
      ) : (
        <div className="bg-white rounded border border-slate-200 divide-y divide-slate-100">
          {rows.map((row) => (
            <Link
              key={row.key}
              to={`/admin/settings/${row.key}`}
              className="flex items-center justify-between px-4 py-3 hover:bg-slate-50"
            >
              <span className="text-sm text-slate-700">{row.label || row.key}</span>
              <span className="text-xs font-mono text-slate-400">{row.key}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
