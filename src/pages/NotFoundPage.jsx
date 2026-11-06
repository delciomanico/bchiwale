import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';

export default function NotFoundPage() {
  const { t } = useLang();
  return (
    <section className="min-h-screen flex items-center bg-gray-light">
      <div className="container text-center py-20">
        <div className="font-mono font-semibold text-cyan text-8xl tracking-tight mb-6">
          404
        </div>
        <div className="section-rule mx-auto" aria-hidden="true" />
        <h1 className="section-title mt-6 mb-4">{t('notfound.title')}</h1>
        <p className="section-subtitle mx-auto">
          {t('notfound.subtitle')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <Link to="/" className="btn-primary">
            {t('common.back_home')}
          </Link>
          <Link to="/contacto" className="btn-secondary">
            {t('common.contact_us')}
          </Link>
        </div>
      </div>
    </section>
  );
}
