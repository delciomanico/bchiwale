// Single generic handler for all 7 CRUD collections (services, team, portfolio,
// blog, gallery, testimonials, jobs). Vercel's Hobby plan caps a deployment at
// 12 Serverless Functions, so every collection is routed here via vercel.json
// rewrites (?collection=<name>&id=<id>) instead of one file pair per collection.
import { requireAuth } from '../../server-lib/auth.js';
import { withErrorHandling } from '../../server-lib/respond.js';
import { listRows, getRow, createRow, updateRow, deleteRow } from '../../server-lib/crud.js';
import { COLLECTIONS } from '../../server-lib/collections.js';

export default withErrorHandling(async (req, res) => {
  await requireAuth(req);

  const { collection, id } = req.query;
  const config = COLLECTIONS[collection];
  if (!config) {
    res.status(404).json({ error: `Unknown collection: ${collection}` });
    return;
  }

  if (id === undefined) {
    if (req.method === 'GET') {
      res.status(200).json(await listRows(config));
      return;
    }
    if (req.method === 'POST') {
      res.status(201).json(await createRow(config, req.body || {}));
      return;
    }
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const itemId = config.idIsText ? id : Number(id);

  if (req.method === 'GET') {
    const row = await getRow(config, itemId);
    if (!row) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.status(200).json(row);
    return;
  }
  if (req.method === 'PUT') {
    res.status(200).json(await updateRow(config, itemId, req.body || {}));
    return;
  }
  if (req.method === 'DELETE') {
    res.status(200).json(await deleteRow(config, itemId));
    return;
  }
  res.status(405).json({ error: 'Method not allowed' });
});
