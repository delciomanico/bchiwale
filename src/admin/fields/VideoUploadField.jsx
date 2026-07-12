import { useState } from 'react';
import { upload } from '@vercel/blob/client';

export default function VideoUploadField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    setProgress(0);
    setError(null);
    try {
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/admin/upload',
        onUploadProgress: ({ percentage }) => setProgress(percentage),
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
      <div className="space-y-3">
        {value ? (
          <video src={value} controls className="w-full max-w-md rounded border border-slate-200 bg-charcoal" />
        ) : (
          <div className="w-full max-w-md aspect-video rounded border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400">
            sem vídeo
          </div>
        )}
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/about-video.mp4 ou https://..."
          className="w-full max-w-md rounded border border-slate-300 px-2 py-1.5 text-xs"
        />
        <label className="inline-block cursor-pointer text-xs font-medium text-blue-600 hover:text-blue-700">
          {uploading ? `A enviar… ${progress}%` : 'Carregar vídeo'}
          <input type="file" accept="video/*" className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
}
