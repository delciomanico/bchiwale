import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../contexts/ContentContext';
import { useLang } from '../contexts/LangContext';
import Rich from '../components/Rich';
import { usePageMeta } from '../hooks/usePageMeta';

function ProjectCard({ project, index }) {
  const { t } = useLang();
  const accent = index % 2 === 0 ? '#00AEEF' : '#F5C200';
  return (
    <article
      className="reveal group bg-white flex flex-col transition-all duration-300
                 hover:shadow-[0_6px_24px_rgba(0,0,0,0.07)] hover:-translate-y-0.5"
      style={{ transitionDelay: `${(index % 6) * 60}ms` }}
    >
      <div className="overflow-hidden w-full h-48 relative">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ background: 'linear-gradient(135deg, #0d1829 0%, #1a2d40 100%)', position: 'relative' }}
            aria-hidden="true"
          >
            <div className="absolute top-4 right-4 font-mono text-xs tracking-widest opacity-20" style={{ color: accent }}>
              B-CHW
            </div>
          </div>
        )}
      </div>
      <div className="p-7 flex flex-col flex-1 gap-3">
        <div className="flex items-center justify-between gap-2">
          {/* Tag — now plain mono text via global .tag-cyan */}
          <span className="tag-cyan">{project.service}</span>
          <span className="font-mono text-[10px] text-charcoal/35 tracking-[0.15em]">{project.year}</span>
        </div>
        <h3 className="font-heading font-semibold text-charcoal text-base leading-snug tracking-tight">{project.title}</h3>
        <p className="font-body text-gray-text text-xs leading-relaxed flex-1">{project.description}</p>
        <div className="flex items-center justify-between mt-1 pt-3 border-t border-charcoal/8">
          <span className="font-mono text-[10px] text-charcoal/35 tracking-[0.12em] uppercase">{project.province}</span>
          <Link
            to={`/portfolio/${project.slug}`}
            className="font-mono text-[10px] text-cyan hover:underline tracking-[0.12em]"
            aria-label={`${t('portfolio_page.view_detail')} ${project.title}`}
          >
            {t('portfolio_page.view_project')} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

// Filter dropdown
function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-2 flex-1 min-w-[180px]">
      <span className="font-mono text-[10px] text-charcoal/35 tracking-[0.18em] uppercase">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-charcoal/15 px-4 py-3 font-mono text-xs text-charcoal
                   tracking-[0.08em] uppercase bg-white focus:outline-none focus:border-cyan
                   transition-colors"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
}

export default function PortfolioPage() {
  const { PORTFOLIO_ITEMS, PORTFOLIO_SERVICE_FILTERS, PORTFOLIO_PROVINCE_FILTERS, PORTFOLIO_PERIOD_FILTERS, SITE_IMAGES } = useSiteData();
  const { t } = useLang();
  usePageMeta(t('meta.portfolio_title'), t('meta.portfolio_description'), '/portfolio');
  // O primeiro valor de cada lista de filtros (editável no CMS) é o "Todos"
  const ALL_SVC = PORTFOLIO_SERVICE_FILTERS[0];
  const ALL_PRV = PORTFOLIO_PROVINCE_FILTERS[0];
  const ALL_PER = PORTFOLIO_PERIOD_FILTERS[0];
  const [activeService, setActiveService] = useState(ALL_SVC);
  const [activeProvince, setActiveProvince] = useState(ALL_PRV);
  const [activePeriod, setActivePeriod] = useState(ALL_PER);

  const filtered = PORTFOLIO_ITEMS.filter((p) => {
    const svcMatch = activeService === ALL_SVC || p.service === activeService;
    const prvMatch = activeProvince === ALL_PRV || p.province === activeProvince;
    const perMatch = activePeriod === ALL_PER || p.year === activePeriod;
    return svcMatch && prvMatch && perMatch;
  });

  return (
    <>
      {/* Page hero */}
      <section
        className="relative min-h-[calc(44vh+72px)] flex items-end pb-16"
        style={{
          borderBottom: '1px solid rgba(0,174,239,0.2)',
          paddingTop: '72px',
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${SITE_IMAGES.hero_portfolio})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(10,14,22,0.78)' }} aria-hidden="true" />
        <div className="relative z-10 container">
          <nav aria-label={t('common.breadcrumb')} className="mb-6">
            <ol className="flex items-center gap-2 font-mono text-xs text-white/40">
              <li><Link to="/" className="hover:text-cyan transition-colors">{t('common.home')}</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li className="text-white/60" aria-current="page">{t('portfolio_page.breadcrumb')}</li>
            </ol>
          </nav>
          <h1 className="font-heading font-semibold text-white text-4xl md:text-5xl tracking-tight">
            <Rich text={t('portfolio_page.hero_title')} emClassName="italic" emStyle={{ color: '#00AEEF' }} />
          </h1>
          <p className="font-body text-white/55 text-lg mt-4 max-w-xl leading-relaxed">
            {t('portfolio_page.hero_subtitle')}
          </p>
          {/* Count indicators */}
          <div className="flex gap-8 mt-10">
            {[1, 2, 3].map((n) => [t(`portfolio_page.stat${n}_value`), t(`portfolio_page.stat${n}_label`)]).map(([n, l]) => (
              <div key={l}>
                <div className="font-heading font-light text-white text-2xl leading-none">{n}</div>
                <div className="font-mono text-[10px] text-white/35 tracking-[0.18em] uppercase mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters — white background, hairline border */}
      <section className="py-8 bg-white border-b border-charcoal/8" aria-label="Filtros do portfolio">
        <div className="container">
          <div className="flex flex-wrap gap-5">
            <FilterSelect
              label={t('portfolio_page.by_service')}
              value={activeService}
              onChange={setActiveService}
              options={PORTFOLIO_SERVICE_FILTERS}
            />
            <FilterSelect
              label={t('portfolio_page.by_province')}
              value={activeProvince}
              onChange={setActiveProvince}
              options={PORTFOLIO_PROVINCE_FILTERS}
            />
            <FilterSelect
              label={t('portfolio_page.by_period')}
              value={activePeriod}
              onChange={setActivePeriod}
              options={PORTFOLIO_PERIOD_FILTERS}
            />
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-pad bg-white" aria-label="Projectos">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-body text-gray-text text-lg mb-6">Nenhum projecto corresponde aos filtros seleccionados.</p>
              <button
                onClick={() => { setActiveService(ALL_SVC); setActiveProvince(ALL_PRV); setActivePeriod(ALL_PER); }}
                className="btn-primary"
              >
                {t('portfolio_page.clear_caps')}
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-10">
                <p className="font-body text-gray-text text-sm">
                  <span className="font-semibold text-charcoal">{filtered.length}</span> projecto{filtered.length !== 1 ? 's' : ''}
                </p>
                {(activeService !== ALL_SVC || activeProvince !== ALL_PRV || activePeriod !== ALL_PER) && (
                  <button
                    onClick={() => { setActiveService(ALL_SVC); setActiveProvince(ALL_PRV); setActivePeriod(ALL_PER); }}
                    className="font-mono text-[10px] text-charcoal/40 hover:text-charcoal transition-colors tracking-[0.15em] uppercase"
                  >
                    {t('portfolio_page.clear')}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((project, i) => (
                  <ProjectCard key={project.title} project={project} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center bg-charcoal border-t border-white/5">
        <div className="container">
          <h2 className="font-heading font-semibold text-white text-2xl md:text-3xl tracking-tight mb-3">
            <Rich text={t('portfolio_page.cta_title')} emStyle={{ color: '#00AEEF', fontStyle: 'italic' }} />
          </h2>
          <p className="font-body text-white/45 text-base mb-8 max-w-md mx-auto leading-relaxed">
            {t('portfolio_page.cta_body')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/contacto"
              className="font-body font-medium text-white border-b border-white
                         hover:text-cyan hover:border-cyan transition-colors pb-0.5 text-[15px]"
            >
              {t('servicos.cta_proposal')} <span aria-hidden="true">↗</span>
            </Link>
            <Link
              to="/servicos"
              className="font-mono text-[13px] text-white/40 hover:text-white transition-colors tracking-wide"
            >
              {t('sobre.next_services')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
