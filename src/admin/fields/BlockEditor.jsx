// Editor for a blog post body: an array of {type:'paragraph'|'heading', content} or {type:'list', items:[]}
const TYPES = ['paragraph', 'heading', 'list'];

export default function BlockEditor({ label, value, onChange }) {
  const blocks = Array.isArray(value) ? value : [];

  function update(i, next) {
    const copy = blocks.slice();
    copy[i] = next;
    onChange(copy);
  }

  function remove(i) {
    onChange(blocks.filter((_, idx) => idx !== i));
  }

  function move(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    const copy = blocks.slice();
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  }

  function addBlock(type) {
    onChange([...blocks, type === 'list' ? { type: 'list', items: [''] } : { type, content: '' }]);
  }

  function changeType(i, type) {
    const current = blocks[i];
    update(i, type === 'list' ? { type: 'list', items: [''] } : { type, content: current.content || '' });
  }

  function updateListItem(i, itemIndex, val) {
    const items = (blocks[i].items || []).slice();
    items[itemIndex] = val;
    update(i, { ...blocks[i], items });
  }

  function addListItem(i) {
    update(i, { ...blocks[i], items: [...(blocks[i].items || []), ''] });
  }

  function removeListItem(i, itemIndex) {
    update(i, { ...blocks[i], items: (blocks[i].items || []).filter((_, idx) => idx !== itemIndex) });
  }

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs font-semibold text-slate-600">{label}</label>}
      <div className="space-y-3">
        {blocks.map((block, i) => (
          <div key={i} className="rounded border border-slate-200 p-3 space-y-2 bg-slate-50">
            <div className="flex items-center justify-between gap-2">
              <select
                value={block.type}
                onChange={(e) => changeType(i, e.target.value)}
                className="rounded border border-slate-300 px-2 py-1 text-xs bg-white"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => move(i, -1)} className="text-slate-400 hover:text-slate-700 text-xs px-1">↑</button>
                <button type="button" onClick={() => move(i, 1)} className="text-slate-400 hover:text-slate-700 text-xs px-1">↓</button>
                <button type="button" onClick={() => remove(i)} className="text-red-500 hover:text-red-700 text-xs px-1">Remover</button>
              </div>
            </div>

            {block.type === 'list' ? (
              <div className="space-y-1.5">
                {(block.items || []).map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateListItem(i, itemIndex, e.target.value)}
                      className="flex-1 rounded border border-slate-300 px-2 py-1.5 text-xs"
                    />
                    <button type="button" onClick={() => removeListItem(i, itemIndex)} className="text-red-500 hover:text-red-700 text-xs px-1">×</button>
                  </div>
                ))}
                <button type="button" onClick={() => addListItem(i)} className="text-xs font-medium text-blue-600 hover:text-blue-700">
                  + item
                </button>
              </div>
            ) : (
              <textarea
                value={block.content || ''}
                onChange={(e) => update(i, { ...block, content: e.target.value })}
                rows={block.type === 'heading' ? 1 : 4}
                className="w-full rounded border border-slate-300 px-2 py-1.5 text-xs"
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        {TYPES.map((t) => (
          <button key={t} type="button" onClick={() => addBlock(t)} className="text-xs font-medium text-blue-600 hover:text-blue-700">
            + {t}
          </button>
        ))}
      </div>
    </div>
  );
}
