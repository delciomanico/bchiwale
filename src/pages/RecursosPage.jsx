import { Link } from 'react-router-dom';
import { useSiteData } from '../contexts/ContentContext';
import { useLang } from '../contexts/LangContext';
import Rich from '../components/Rich';
import { usePageMeta } from '../hooks/usePageMeta';

export default function RecursosPage() {
  const { DOWNLOADS, TOOLS, SITE_IMAGES } = useSiteData();
  const { t } = useLang();
  usePageMeta(t('meta.recursos_title'), t('meta.recursos_description'), '/recursos');
  return (
    <>
      {/* Page hero */}
      <section
        className="relative min-h-[calc(40vh+72px)] flex items-end pb-16"
        style={{
          borderBottom: '1px solid rgba(0,174,239,0.2)',
          paddingTop: '72px',
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${SITE_IMAGES.hero_recursos})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(10,14,22,0.78)' }} aria-hidden="true" />
        <div className="relative z-10 container">
          <nav aria-label={t('common.breadcrumb')} className="mb-6">
            <ol className="flex items-center gap-2 font-mono text-xs text-white/40">
              <li><Link to="/" className="hover:text-cyan transition-colors">{t('common.home')}</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li className="text-white/60" aria-current="page">{t('recursos.breadcrumb')}</li>
            </ol>
          </nav>
          <h1 className="font-heading font-semibold text-white text-4xl md:text-5xl tracking-tight">
            <Rich text={t('recursos.hero_title')} emClassName="italic" emStyle={{ color: '#00AEEF' }} />
          </h1>
          <p className="font-body text-white/55 text-lg mt-4 max-w-xl leading-relaxed">
            {t('recursos.hero_subtitle')}
          </p>
        </div>
      </section>

      {/* Quick links nav — white, hairline border */}
      <nav className="bg-white border-b border-charcoal/8 py-4" aria-label={t('recursos.sections_label')}>
        <div className="container">
          <div className="flex flex-wrap gap-6">
            {[
              ['#downloads', t('recursos.downloads_eyebrow')],
              ['#ferramentas', t('recursos.tools_eyebrow')],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="font-mono text-[10px] text-charcoal/45 tracking-[0.18em] uppercase
                           hover:text-charcoal transition-colors pb-0.5 border-b border-transparent
                           hover:border-charcoal/30"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── 1. Downloads ── */}
      <section id="downloads" className="section-pad bg-white border-t border-charcoal/8" aria-labelledby="dl-title">
        <div className="container">
          <header className="mb-10">
            <p className="eyebrow">{t('recursos.downloads_eyebrow')}</p>
            <h2 className="section-title" id="dl-title"><Rich text={t('recursos.downloads_title')} /></h2>
            <p className="section-subtitle mt-2">
              {t('recursos.downloads_subtitle')}
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOWNLOADS.map((doc, i) => (
              <div
                key={doc.id}
                className="reveal bg-white flex flex-col gap-4
                           hover:shadow-[0_6px_24px_rgba(0,0,0,0.07)] transition-all duration-300"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* File type — plain mono, accent color */}
                  <span
                    className="font-mono font-medium text-[10px] tracking-[0.18em] uppercase"
                    style={{ color: doc.accentColor }}
                  >
                    {doc.type}
                  </span>
                  <span className="tag-gray">{doc.cat}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-charcoal text-sm leading-snug mb-1">{doc.title}</h3>
                  <p className="font-body text-gray-text text-xs leading-relaxed">{doc.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-charcoal/8">
                  <span className="font-mono text-[10px] text-charcoal/30 tracking-[0.12em]">{doc.size}</span>
                  <Link
                    to="/contacto"
                    className="font-mono text-[10px] text-cyan hover:underline tracking-[0.12em]"
                    aria-label={`${t('recursos.request')} ${doc.title}`}
                  >
                    {t('recursos.request')} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="font-body text-gray-text text-xs mt-8 text-center leading-relaxed">
            {t('recursos.downloads_note')}
          </p>
        </div>
      </section>

      {/* ── 2. Technical tools ── */}
      <section id="ferramentas" className="section-pad bg-white border-t border-charcoal/8" aria-labelledby="tools-title">
        <div className="container">
          <header className="mb-10">
            <p className="eyebrow">{t('recursos.tools_eyebrow_caps')}</p>
            <h2 className="section-title" id="tools-title"><Rich text={t('recursos.tools_title')} /></h2>
            <p className="section-subtitle mt-2">
              {t('recursos.tools_subtitle')}
            </p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
            {TOOLS.map((tool, i) => (
              <div
                key={tool.title}
                className="reveal bg-white flex gap-4 items-start p-7
                           hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="text-charcoal/25 text-xl shrink-0 mt-0.5" aria-hidden="true">{tool.icon}</span>
                <div>
                  <h3 className="font-heading font-semibold text-charcoal text-sm mb-1">{tool.title}</h3>
                  <p className="font-body text-gray-text text-xs leading-relaxed">{tool.desc}</p>
                  <Link
                    to="/contacto"
                    className="font-mono text-[10px] text-cyan hover:underline mt-3 inline-block tracking-[0.12em]"
                  >
                    {t('recursos.request_access')} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="font-body text-gray-text text-xs mt-8 max-w-lg leading-relaxed">
            {t('recursos.tools_note')}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center bg-charcoal border-t border-white/5">
        <div className="container">
          <h2 className="font-heading font-semibold text-white text-2xl md:text-3xl tracking-tight mb-6">
            <Rich text={t('recursos.cta_title')} emStyle={{ color: '#00AEEF', fontStyle: 'italic' }} />
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/contacto"
              className="font-body font-medium text-white border-b border-white
                         hover:text-cyan hover:border-cyan transition-colors pb-0.5 text-[15px]"
            >
              {t('recursos.cta_contact')} <span aria-hidden="true">↗</span>
            </Link>
            <Link
              to="/blog"
              className="font-mono text-[13px] text-white/40 hover:text-white transition-colors tracking-wide"
            >
              {t('recursos.cta_articles')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
