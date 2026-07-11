import { sql } from '../../server-lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const [services, team, portfolio, blog, gallery, testimonials, jobs, settings] = await Promise.all([
      sql('SELECT * FROM services ORDER BY order_index', []),
      sql('SELECT * FROM team_members ORDER BY order_index', []),
      sql('SELECT * FROM portfolio_items ORDER BY order_index', []),
      sql('SELECT * FROM blog_posts ORDER BY order_index', []),
      sql('SELECT * FROM gallery_items ORDER BY order_index', []),
      sql('SELECT * FROM testimonials ORDER BY order_index', []),
      sql('SELECT * FROM jobs WHERE is_open = true ORDER BY order_index', []),
      sql('SELECT key, value_pt, value_en FROM site_settings', []),
    ]);

    const settingsMap = {};
    for (const row of settings) {
      settingsMap[row.key] = { value_pt: row.value_pt, value_en: row.value_en };
    }

    res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    res.status(200).json({ services, team, portfolio, blog, gallery, testimonials, jobs, settings: settingsMap });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load site data' });
  }
}
