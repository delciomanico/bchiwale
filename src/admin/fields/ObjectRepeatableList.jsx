// Generic editor for an array of small objects (tags, methodology steps, FAQs).
// `schema` describes each sub-field: [{ key, label, placeholder, type: 'text'|'textarea'|'select', options }]
export default function ObjectRepeatableList({ label, value, onChange, schema, emptyItem }) {
  const items = Array.isArray(value) ? value : [];

  function update(i, key, next) {
    const copy = items.map((it) => ({ ...it }));
    copy[i][key] = next;
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
    onChange([...items, { ...emptyItem }]);
  }

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs font-semibold text-slate-600">{label}</label>}
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="rounded border border-slate-200 p-3 space-y-2 bg-slate-50">
            <div className="flex items-center justify-end gap-1">
              <button type="button" onClick={() => move(i, -1)} className="text-slate-400 hover:text-slate-700 text-xs px-1">↑</button>
              <button type="button" onClick={() => move(i, 1)} className="text-slate-400 hover:text-slate-700 text-xs px-1">↓</button>
              <button type="button" onClick={() => remove(i)} className="text-red-500 hover:text-red-700 text-xs px-1">Remover</button>
            </div>
            {schema.map((field) => (
              <div key={field.key}>
                <label className="block text-[10px] uppercase tracking-wide text-slate-400 mb-1">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    value={item[field.key] || ''}
                    onChange={(e) => update(i, field.key, e.target.value)}
                    className="w-full rounded border border-slate-300 px-2 py-1.5 text-xs bg-white"
                  >
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    value={item[field.key] || ''}
                    placeholder={field.placeholder}
                    onChange={(e) => update(i, field.key, e.target.value)}
                    rows={3}
                    className="w-full rounded border border-slate-300 px-2 py-1.5 text-xs"
                  />
                ) : (
                  <input
                    type="text"
                    value={item[field.key] || ''}
                    placeholder={field.placeholder}
                    onChange={(e) => update(i, field.key, e.target.value)}
                    className="w-full rounded border border-slate-300 px-2 py-1.5 text-xs"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button type="button" onClick={add} className="text-xs font-medium text-blue-600 hover:text-blue-700">
        + Adicionar
      </button>
    </div>
  );
}
