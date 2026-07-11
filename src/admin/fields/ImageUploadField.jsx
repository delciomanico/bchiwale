import { useState } from 'react';
import { upload } from '@vercel/blob/client';

export default function ImageUploadField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/admin/upload',
      });
      onChange(blob.url);
    } catch (err) {
      setError(err.message || 'Falha no upload');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs font-semibold text-slate-600">{label}</label>}
      <div className="flex items-start gap-3">
        {value ? (
          <img src={value} alt="" className="w-24 h-24 object-cover rounded border border-slate-200" />
        ) : (
          <div className="w-24 h-24 rounded border border-dashed border-slate-300 flex items-center justify-center text-[10px] text-slate-400">
            sem imagem
          </div>
        )}
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/exemplo.jpg ou https://..."
            className="w-full rounded border border-slate-300 px-2 py-1.5 text-xs"
          />
          <label className="inline-block cursor-pointer text-xs font-medium text-blue-600 hover:text-blue-700">
            {uploading ? 'A enviar…' : 'Carregar imagem'}
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
          </label>
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
