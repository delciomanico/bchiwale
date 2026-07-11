import { requireAuth } from '../../server-lib/auth.js';

export default async function handler(req, res) {
  try {
    await requireAuth(req);
    res.status(200).json({ authenticated: true });
  } catch {
    res.status(401).json({ authenticated: false });
  }
}
