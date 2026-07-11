import { requireAuth } from '../../server-lib/auth.js';
import { withErrorHandling } from '../../server-lib/respond.js';
import { sql } from '../../server-lib/db.js';

export default withErrorHandling(async (req, res) => {
  await requireAuth(req);
  const { key } = req.query;

  if (key === undefined) {
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }
    const rows = await sql('SELECT key, label, updated_at FROM site_settings ORDER BY key', []);
    res.status(200).json(rows);
    return;
  }

  if (req.method === 'GET') {
    const rows = await sql('SELECT * FROM site_settings WHERE key = $1', [key]);
    if (!rows[0]) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.status(200).json(rows[0]);
    return;
  }

  if (req.method === 'PUT') {
    const { value_pt, value_en } = req.body || {};
    if (value_pt === undefined) {
      res.status(400).json({ error: 'value_pt is required' });
      return;
    }
    const rows = await sql(
      'UPDATE site_settings SET value_pt = $1, value_en = $2, updated_at = now() WHERE key = $3 RETURNING *',
      [JSON.stringify(value_pt), value_en === undefined || value_en === null ? null : JSON.stringify(value_en), key]
    );
    if (!rows[0]) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.status(200).json(rows[0]);
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
});
