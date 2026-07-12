import { handleUpload } from '@vercel/blob/client';
import { del } from '@vercel/blob';
import { requireAuth } from '../../server-lib/auth.js';
import { withErrorHandling } from '../../server-lib/respond.js';

export default withErrorHandling(async (req, res) => {
  await requireAuth(req);

  if (req.method === 'DELETE') {
    const { url } = req.query;
    if (!url || !/\.blob\.vercel-storage\.com\//.test(url)) {
      res.status(400).json({ error: 'url inválido' });
      return;
    }
    await del(url);
    res.status(200).json({ ok: true });
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const jsonResponse = await handleUpload({
    body: req.body,
    request: req,
    onBeforeGenerateToken: async () => ({
      allowedContentTypes: [
        'image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif',
        'video/mp4', 'video/webm', 'video/ogg',
      ],
      addRandomSuffix: true,
      maximumSizeInBytes: 200 * 1024 * 1024,
    }),
    onUploadCompleted: async () => {},
  });

  res.status(200).json(jsonResponse);
});
