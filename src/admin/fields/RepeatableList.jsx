import { upload } from '@vercel/blob/client';

// Generic editor for an array of plain strings (tags, subtechniques, results, etc.)
export default function RepeatableList({ label, value, onChange, allowImageUpload, placeholder }) {
  const items = Array.isArray(value) ? value : [];

  function update(i, next) {
    const copy = items.slice();
    copy[i] = next;
    onChange(copy);
  }

  function remove(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }

  function move(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const copy = items.slice();
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  }

  function add() {
    onChange([...items, '']);
  }

  async function handleUploadAdd(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const blob = await upload(file.name, file, { access: 'public', handleUploadUrl: '/api/admin/upload' });
    onChange([...items, blob.url]);
  }

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs font-semibold text-slate-600">{label}</label>}
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <input
              type="text"
              value={item}
              placeholder={placeholder}
              onChange={(e) => update(i, e.target.value)}
              className="flex-1 rounded border border-slate-300 px-2 py-1.5 text-xs"
            />
            <button type="button" onClick={() => move(i, -1)} className="text-slate-400 hover:text-slate-700 text-xs px-1">↑</button>
            <button type="button" onClick={() => move(i, 1)} className="text-slate-400 hover:text-slate-700 text-xs px-1">↓</button>
            <button type="button" onClick={() => remove(i)} className="text-red-500 hover:text-red-700 text-xs px-1">Remover</button>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={add} className="text-xs font-medium text-blue-600 hover:text-blue-700">
          + Adicionar
        </button>
        {allowImageUpload && (
          <label className="cursor-pointer text-xs font-medium text-blue-600 hover:text-blue-700">
            + Carregar imagem
            <input type="file" accept="image/*" className="hidden" onChange={handleUploadAdd} />
          </label>
        )}
      </div>
    </div>
  );
}
