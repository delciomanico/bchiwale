import RepeatableList from './RepeatableList';
import ObjectRepeatableList from './ObjectRepeatableList';
import ImageUploadField from './ImageUploadField';
import BlockEditor from './BlockEditor';

const TAG_SCHEMA = [
  { key: 'label', label: 'Texto', placeholder: 'ex: GNSS' },
  { key: 'type', label: 'Cor', type: 'select', options: ['cyan', 'gray', 'yellow'] },
];
const METHODOLOGY_SCHEMA = [
  { key: 'step', label: 'Nº', placeholder: '01' },
  { key: 'title', label: 'Título', placeholder: 'Diagnóstico' },
  { key: 'desc', label: 'Descrição', type: 'textarea' },
];
const FAQ_SCHEMA = [
  { key: 'q', label: 'Pergunta' },
  { key: 'a', label: 'Resposta', type: 'textarea' },
];

function SingleWidget({ type, value, onChange, placeholder, allowImageUpload }) {
  switch (type) {
    case 'textarea':
      return (
        <textarea
          value={value || ''}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full rounded border border-slate-300 px-2.5 py-1.5 text-sm"
        />
      );
    case 'number':
      return (
        <input
          type="number"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))}
          className="w-full rounded border border-slate-300 px-2.5 py-1.5 text-sm"
        />
      );
    case 'image':
      return <ImageUploadField value={value} onChange={onChange} />;
    case 'list':
      return <RepeatableList value={value} onChange={onChange} allowImageUpload={allowImageUpload} placeholder={placeholder} />;
    case 'tags':
      return <ObjectRepeatableList value={value} onChange={onChange} schema={TAG_SCHEMA} emptyItem={{ label: '', type: 'cyan' }} />;
    case 'methodology':
      return <ObjectRepeatableList value={value} onChange={onChange} schema={METHODOLOGY_SCHEMA} emptyItem={{ step: '', title: '', desc: '' }} />;
    case 'faqs':
      return <ObjectRepeatableList value={value} onChange={onChange} schema={FAQ_SCHEMA} emptyItem={{ q: '', a: '' }} />;
    case 'blocks':
      return <BlockEditor value={value} onChange={onChange} />;
    default:
      return (
        <input
          type="text"
          value={value || ''}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded border border-slate-300 px-2.5 py-1.5 text-sm"
        />
      );
  }
}

export default function FieldRenderer({ field, values, onChange, disabled }) {
  if (field.base) {
    const ptKey = `${field.base}_pt`;
    const enKey = `${field.base}_en`;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-slate-100 pb-5 mb-1">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-1.5">{field.label} — PT</p>
          <SingleWidget type={field.type} value={values[ptKey]} onChange={(v) => onChange(ptKey, v)} placeholder={field.placeholder} allowImageUpload={field.allowImageUpload} />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1.5">{field.label} — EN (opcional)</p>
          <SingleWidget type={field.type} value={values[enKey]} onChange={(v) => onChange(enKey, v)} placeholder="Deixe vazio para usar o texto em PT" allowImageUpload={field.allowImageUpload} />
        </div>
      </div>
    );
  }

  const column = field.column || field.key;

  if (field.type === 'boolean') {
    return (
      <div className="border-b border-slate-100 pb-5 mb-1">
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <input
            type="checkbox"
            checked={!!values[column]}
            disabled={disabled}
            onChange={(e) => onChange(column, e.target.checked)}
          />
          {field.label}
        </label>
      </div>
    );
  }

  return (
    <div className="border-b border-slate-100 pb-5 mb-1">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-1.5">
        {field.label}
        {field.help && <span className="normal-case font-normal text-slate-400"> — {field.help}</span>}
      </p>
      {disabled ? (
        <input type="text" value={values[column] || ''} disabled className="w-full rounded border border-slate-200 bg-slate-100 px-2.5 py-1.5 text-sm text-slate-500" />
      ) : (
        <SingleWidget type={field.type} value={values[column]} onChange={(v) => onChange(column, v)} placeholder={field.placeholder} allowImageUpload={field.allowImageUpload} />
      )}
    </div>
  );
}
