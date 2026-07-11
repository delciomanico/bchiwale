import bcrypt from 'bcryptjs';
import { signToken, setAuthCookie } from '../../server-lib/auth.js';
import { withErrorHandling } from '../../server-lib/respond.js';

export default withErrorHandling(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { username, password } = req.body || {};
  if (!username || !password) {
    res.status(400).json({ error: 'Credenciais em falta' });
    return;
  }

  const isValidUser = username === process.env.ADMIN_USERNAME;
  const isValidPassword = isValidUser
    ? await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH || '')
    : false;

  if (!isValidUser || !isValidPassword) {
    res.status(401).json({ error: 'Credenciais inválidas' });
    return;
  }

  const token = await signToken({ sub: 'admin', role: 'admin' });
  setAuthCookie(res, token);
  res.status(200).json({ ok: true });
});
