import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ADMIN_COLLECTIONS } from './collections.config';
import { api } from './lib/api';

export default function CollectionListPage() {
  const { collection } = useParams();
  const config = ADMIN_COLLECTIONS[collection];
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!config) return;
    setRows(null);
    api.get(config.apiBase).then(setRows).catch((e) => setError(e.message));
  }, [collection]);

  if (!config) {
    return <p className="text-sm text-red-600">Colecção desconhecida.</p>;
  }

  async function handleDelete(id) {
    if (!window.confirm('Apagar este registo? Esta acção não pode ser desfeita.')) return;
    await api.delete(`${config.apiBase}/${encodeURIComponent(id)}`);
    setRows((prev) => prev.filter((r) => r[config.idField] !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-slate-800">{config.title}</h1>
        <Link
          to={`/admin/${collection}/new`}
          className="rounded bg-blue-600 text-white text-sm font-medium px-4 py-2 hover:bg-blue-700"
        >
          + Novo
        </Link>
      </div>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      {!rows ? (
        <p className="text-sm text-slate-500">A carregar…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-slate-500">Ainda não há registos.</p>
      ) : (
        <div className="bg-white rounded border border-slate-200 divide-y divide-slate-100">
          {rows.map((row) => (
            <div key={row[config.idField]} className="flex items-center justify-between px-4 py-3 gap-4">
              <div className="flex items-center gap-6 text-sm text-slate-700 min-w-0">
                {config.listColumns.map((col) => (
                  <span key={col.key} className="truncate max-w-xs">
                    {typeof row[col.key] === 'boolean' ? (row[col.key] ? '✓' : '—') : (row[col.key] || '—')}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <Link
                  to={`/admin/${collection}/${encodeURIComponent(row[config.idField])}`}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700"
                >
                  Editar
                </Link>
                <button onClick={() => handleDelete(row[config.idField])} className="text-xs font-medium text-red-500 hover:text-red-700">
                  Apagar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
