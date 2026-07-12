import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ADMIN_COLLECTIONS } from './collections.config';
import { api } from './lib/api';
import FieldRenderer from './fields/FieldRenderer';

export default function CollectionEditPage() {
  const { collection, id } = useParams();
  const config = ADMIN_COLLECTIONS[collection];
  const isNew = id === 'new';
  const [values, setValues] = useState(isNew ? {} : null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!config || isNew) return;
    setValues(null);
    api.get(`${config.apiBase}/${encodeURIComponent(id)}`).then(setValues).catch((e) => setError(e.message));
  }, [collection, id]);

  if (!config) return <p className="text-sm text-red-600">Colecção desconhecida.</p>;
  if (error && !values) return <p className="text-sm text-red-600">{error}</p>;
  if (!values) return <p className="text-sm text-slate-500">A carregar…</p>;

  function set(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (isNew) {
        await api.post(config.apiBase, values);
      } else {
        await api.put(`${config.apiBase}/${encodeURIComponent(id)}`, values);
      }
      navigate(`/admin/${collection}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (isNew) return;
    if (!window.confirm('Apagar este registo? Esta acção não pode ser desfeita.')) return;
    await api.delete(`${config.apiBase}/${encodeURIComponent(id)}`);
    navigate(`/admin/${collection}`);
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-slate-800">
          {isNew ? `Novo — ${config.title}` : `Editar — ${config.title}`}
        </h1>
        {!isNew && (
          <button onClick={handleDelete} className="text-xs font-medium text-red-500 hover:text-red-700">
            Apagar
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white rounded border border-slate-200 p-6 space-y-1">
        {config.fields.map((field) => {
          const key = field.base || field.key || field.column;
          const disabled = !!(field.createOnly && !isNew);
          return <FieldRenderer key={key} field={field} values={values} disabled={disabled} onChange={set} />;
        })}
        <div className="pt-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded bg-blue-600 text-white text-sm font-medium px-5 py-2.5 hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'A guardar…' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
}
