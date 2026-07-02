import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PORTFOLIO_ITEMS,
  EXTRA_PORTFOLIO_ITEMS,
  PORTFOLIO_SERVICE_FILTERS,
  PORTFOLIO_PROVINCE_FILTERS,
  PORTFOLIO_PERIOD_FILTERS,
} from '../data/siteData';

const ALL_PROJECTS = [
  ...PORTFOLIO_ITEMS.map((p, i) => ({ ...p, period: ['2024', '2023', '2023', '2022', '2024', '2024'][i] })),
  ...EXTRA_PORTFOLIO_ITEMS,
];

function ProjectCard({ project, index }) {
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
          <span className="font-mono text-[10px] text-charcoal/35 tracking-[0.15em]">{project.period}</span>
        </div>
        <h3 className="font-heading font-semibold text-charcoal text-base leading-snug tracking-tight">{project.title}</h3>
        <p className="font-body text-gray-text text-xs leading-relaxed flex-1">{project.description}</p>
        <div className="flex items-center justify-between mt-1 pt-3 border-t border-charcoal/8">
          <span className="font-mono text-[10px] text-charcoal/35 tracking-[0.12em] uppercase">{project.province}</span>
          <Link
            to={`/portfolio/${project.slug}`}
            className="font-mono text-[10px] text-cyan hover:underline tracking-[0.12em]"
            aria-label={`Ver detalhe do projecto: ${project.title}`}
          >
            Ver projecto <span aria-hidden="true">→</span>
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
  const [activeService, setActiveService] = useState('Todos');
  const [activeProvince, setActiveProvince] = useState('Todas');
  const [activePeriod, setActivePeriod] = useState('Todos');

  const filtered = ALL_PROJECTS.filter((p) => {
    const svcMatch = activeService === 'Todos' || p.service === activeService;
    const prvMatch = activeProvince === 'Todas' || p.province === activeProvince;
    const perMatch = activePeriod === 'Todos' || p.period === activePeriod;
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
          style={{ backgroundImage: 'url(/images/caminion.jpg)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(10,14,22,0.78)' }} aria-hidden="true" />
        <div className="relative z-10 container">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-mono text-xs text-white/40">
              <li><Link to="/" className="hover:text-cyan transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li className="text-white/60" aria-current="page">Portfolio</li>
            </ol>
          </nav>
          <h1 className="font-heading font-semibold text-white text-4xl md:text-5xl tracking-tight">
            Casos de <em className="italic" style={{ color: '#00AEEF' }}>Estudo</em>
          </h1>
          <p className="font-body text-white/55 text-lg mt-4 max-w-xl leading-relaxed">
            Mais de 50 projectos concluídos em 21 províncias angolanas. Uma selecção representativa do nosso trabalho.
          </p>
          {/* Count indicators */}
          <div className="flex gap-8 mt-10">
            {[['50+', 'Projectos'], ['21', 'Províncias'], ['7', 'Serviços']].map(([n, l]) => (
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
              label="Por Serviço"
              value={activeService}
              onChange={setActiveService}
              options={PORTFOLIO_SERVICE_FILTERS}
            />
            <FilterSelect
              label="Por Província"
              value={activeProvince}
              onChange={setActiveProvince}
              options={PORTFOLIO_PROVINCE_FILTERS}
            />
            <FilterSelect
              label="Por Período"
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
                onClick={() => { setActiveService('Todos'); setActiveProvince('Todas'); setActivePeriod('Todos'); }}
                className="btn-primary"
              >
                LIMPAR FILTROS
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-10">
                <p className="font-body text-gray-text text-sm">
                  <span className="font-semibold text-charcoal">{filtered.length}</span> projecto{filtered.length !== 1 ? 's' : ''}
                </p>
                {(activeService !== 'Todos' || activeProvince !== 'Todas' || activePeriod !== 'Todos') && (
                  <button
                    onClick={() => { setActiveService('Todos'); setActiveProvince('Todas'); setActivePeriod('Todos'); }}
                    className="font-mono text-[10px] text-charcoal/40 hover:text-charcoal transition-colors tracking-[0.15em] uppercase"
                  >
                    Limpar filtros ×
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
            Tem um projecto <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>semelhante?</em>
          </h2>
          <p className="font-body text-white/45 text-base mb-8 max-w-md mx-auto leading-relaxed">
            Conte-nos os detalhes e receba uma proposta técnica personalizada.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/contacto"
              className="font-body font-medium text-white border-b border-white
                         hover:text-cyan hover:border-cyan transition-colors pb-0.5 text-[15px]"
            >
              Solicitar proposta <span aria-hidden="true">↗</span>
            </Link>
            <Link
              to="/servicos"
              className="font-mono text-[13px] text-white/40 hover:text-white transition-colors tracking-wide"
            >
              Ver serviços
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
