import { handleUpload } from '@vercel/blob/client';
import { requireAuth } from '../../server-lib/auth.js';
import { withErrorHandling } from '../../server-lib/respond.js';

export default withErrorHandling(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  await requireAuth(req);

  const jsonResponse = await handleUpload({
    body: req.body,
    request: req,
    onBeforeGenerateToken: async () => ({
      allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'],
      addRandomSuffix: true,
      maximumSizeInBytes: 15 * 1024 * 1024,
    }),
    onUploadCompleted: async () => {},
  });

  res.status(200).json(jsonResponse);
});
