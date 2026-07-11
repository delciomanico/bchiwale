import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from './lib/api';

// Client-side gate only for UX (redirect to /admin/login when logged out).
// Every /api/admin/* handler independently re-checks the cookie server-side —
// this guard never grants access to data on its own.
export default function AdminAuthGuard({ children }) {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    let cancelled = false;
    api
      .get('/api/auth/me')
      .then(() => !cancelled && setStatus('authenticated'))
      .catch(() => !cancelled && setStatus('anonymous'));
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === 'checking') {
    return <div className="min-h-screen flex items-center justify-center text-sm text-slate-400">A verificar sessão…</div>;
  }
  if (status === 'anonymous') {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
