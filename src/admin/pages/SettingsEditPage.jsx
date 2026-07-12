import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../lib/api';
import VideoUploadField from '../fields/VideoUploadField';

function AboutVideoEditPage() {
  const [row, setRow] = useState(null);
  const [url, setUrl] = useState('');
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/api/admin/settings/about_video').then((data) => {
      setRow(data);
      setUrl(data.value_pt || '');
    }).catch((e) => setError(e.message));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setSaving(true);
    try {
      await api.put('/api/admin/settings/about_video', { value_pt: url, value_en: null });
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (!row) return <p className="text-sm text-slate-500">A carregar…</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-slate-800 mb-1">{row.label || 'Vídeo da Secção Sobre'}</h1>
      <p className="text-xs font-mono text-slate-400 mb-6">about_video</p>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      {saved && <p className="text-sm text-green-600 mb-4">Guardado com sucesso.</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <VideoUploadField label="Vídeo" value={url} onChange={setUrl} />
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-blue-600 text-white text-sm font-medium px-5 py-2.5 hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'A guardar…' : 'Guardar'}
        </button>
      </form>
    </div>
  );
}

export default function SettingsEditPage() {
  const { key } = useParams();
  const [row, setRow] = useState(null);
  const [ptText, setPtText] = useState('');
  const [enText, setEnText] = useState('');
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (key === 'about_video') return;
    setRow(null);
    setError(null);
    setSaved(false);
    api.get(`/api/admin/settings/${key}`).then((data) => {
      setRow(data);
      setPtText(JSON.stringify(data.value_pt, null, 2));
      setEnText(data.value_en ? JSON.stringify(data.value_en, null, 2) : '');
    }).catch((e) => setError(e.message));
  }, [key]);

  if (key === 'about_video') return <AboutVideoEditPage />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    let value_pt;
    let value_en = null;
    try {
      value_pt = JSON.parse(ptText);
    } catch {
      setError('O JSON em PT é inválido.');
      return;
    }
    if (enText.trim()) {
      try {
        value_en = JSON.parse(enText);
      } catch {
        setError('O JSON em EN é inválido.');
        return;
      }
    }
    setSaving(true);
    try {
      await api.put(`/api/admin/settings/${key}`, { value_pt, value_en });
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (!row) return <p className="text-sm text-slate-500">A carregar…</p>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-semibold text-slate-800 mb-1">{row.label || key}</h1>
      <p className="text-xs font-mono text-slate-400 mb-6">{key}</p>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      {saved && <p className="text-sm text-green-600 mb-4">Guardado com sucesso.</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Valor — PT (JSON)</label>
            <textarea
              value={ptText}
              onChange={(e) => setPtText(e.target.value)}
              rows={20}
              spellCheck={false}
              className="w-full rounded border border-slate-300 px-3 py-2 text-xs font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Valor — EN (JSON, opcional)</label>
            <textarea
              value={enText}
              onChange={(e) => setEnText(e.target.value)}
              rows={20}
              spellCheck={false}
              placeholder="Deixe vazio para usar sempre o valor em PT"
              className="w-full rounded border border-slate-300 px-3 py-2 text-xs font-mono"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-blue-600 text-white text-sm font-medium px-5 py-2.5 hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'A guardar…' : 'Guardar'}
        </button>
      </form>
    </div>
  );
}
