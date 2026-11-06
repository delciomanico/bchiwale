// PlaceholderPage — reusable scaffold for pages not yet fully built.
// Shows a styled page hero + coming-soon message matching the design system.
import { Link } from 'react-router-dom';
import { useSiteData } from '../contexts/ContentContext';
import { useLang } from '../contexts/LangContext';

export default function PlaceholderPage({ title, subtitle, breadcrumb }) {
  const { SITE_IMAGES } = useSiteData();
  const { t } = useLang();
  return (
    <>
      {/* Internal page hero */}
      <section
        className="relative min-h-[calc(40vh+72px)] flex items-end pb-16"
        style={{ borderBottom: '3px solid #00AEEF', paddingTop: '72px' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${SITE_IMAGES.hero_default})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(10,14,22,0.78)' }} aria-hidden="true" />
        <div className="relative z-10 container">
          {/* Breadcrumb */}
          <nav aria-label={t('common.breadcrumb')} className="mb-6">
            <ol className="flex items-center gap-2 font-mono text-xs text-white/40 tracking-widest3">
              <li>
                <Link to="/" className="hover:text-cyan transition-colors">
                  {t('common.home')}
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/20">
                /
              </li>
              <li className="text-white/60" aria-current="page">
                {breadcrumb || title}
              </li>
            </ol>
          </nav>

          <div className="section-rule" aria-hidden="true" />
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl tracking-tight mt-4">
            {title}
          </h1>
          {subtitle && (
            <p className="font-body text-white/60 text-lg mt-3 max-w-xl">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Coming soon body */}
      <section className="section-pad">
        <div className="container max-w-2xl text-center">
          <div className="section-rule mx-auto" aria-hidden="true" />
          <p className="eyebrow">{t('placeholder.eyebrow')}</p>
          <h2 className="section-title mt-2">{t('placeholder.title')}</h2>
          <p className="section-subtitle mx-auto mt-4">
            {t('placeholder.body')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link to="/contacto" className="btn-primary">
              {t('common.contact_us')}
            </Link>
            <Link to="/" className="btn-secondary">
              {t('common.back_home')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
