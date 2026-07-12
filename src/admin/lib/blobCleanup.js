import { api } from './api';

const BLOB_HOST_RE = /\.blob\.vercel-storage\.com\//;

// Only Vercel Blob URLs are deletable this way — static assets under /public
// (e.g. the original /about-video.mp4 seed value) aren't managed by us.
export async function deleteBlobIfManaged(url) {
  if (!url || !BLOB_HOST_RE.test(url)) return;
  try {
    await api.delete(`/api/admin/upload?url=${encodeURIComponent(url)}`);
  } catch {
    // best-effort cleanup — a stale/already-deleted blob shouldn't block the save
  }
}

// Deletes any single-image fields whose value was swapped for a different one
// during this edit. Only ever a no-op on record creation, since initialValues
// is empty then — there is nothing to replace yet.
export async function cleanupReplacedImages(fields, initialValues, newValues) {
  if (!initialValues) return;
  const imageColumns = fields.filter((f) => f.type === 'image').map((f) => f.key || f.column);
  await Promise.all(
    imageColumns.map((col) => {
      const oldUrl = initialValues[col];
      const newUrl = newValues[col];
      return oldUrl && oldUrl !== newUrl ? deleteBlobIfManaged(oldUrl) : null;
    })
  );
}
