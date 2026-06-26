import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PORTFOLIO_ITEMS, SERVICES } from '../data/siteData';

// ── Extended portfolio data (adds more projects beyond siteData.js base) ──
const EXTRA_PROJECTS = [
  {
    label: 'Geofísica · Bié',
    service: 'Geofísica',
    province: 'Bié',
    title: 'Levantamento Magnetométrico — Área Mineira',
    description: 'Interpretação de anomalias magnéticas para identificação de targets de cobre e ferro em 350 km².',
    period: '2024',
  },
  {
    label: 'Topografia · Huíla',
    service: 'Topografia',
    province: 'Huíla',
    title: 'Cartografia UAV — Concessão Agrária',
    description: 'Fotogrametria de alta resolução por drone em 850 ha com MDT e ortofotomapa para delimitação de parcelas.',
    period: '2023',
  },
  {
    label: 'Geologia · Lunda Sul',
    service: 'Geologia',
    province: 'Lunda Sul',
    title: 'Prospecção Diamantífera — Zona Aluvionar',
    description: 'Amostragem e mapeamento de depósitos aluvionares em área de 400 km² na bacia diamantífera angolana.',
    period: '2024',
  },
  {
    label: 'Ambiente · Moxico',
    service: 'Ambiente',
    province: 'Moxico',
    title: 'EIA — Central Hidroeléctrica Mini-Hídrica',
    description: 'Estudo completo de impacto ambiental para projecto de geração de energia hídrica de 5 MW.',
    period: '2023',
  },
  {
    label: 'Águas · Cunene',
    service: 'Águas Subterrâneas',
    province: 'Cunene',
    title: 'Furos Tubulares — Programa de Abastecimento Rural',
    description: 'Prospecção e execução de 12 furos tubulares para abastecimento de comunidades rurais do Cunene.',
    period: '2022',
  },
  {
    label: 'Geotecnia · Luanda',
    service: 'Geotecnia',
    province: 'Luanda',
    title: 'Investigação Geotécnica — Urbanização de Grande Porte',
    description: 'Estudo completo do subsolo para projecto residencial de 48 edifícios em terreno de 32 ha.',
    period: '2024',
  },
];

const ALL_PROJECTS = [
  ...PORTFOLIO_ITEMS.map((p, i) => ({ ...p, period: ['2024', '2023', '2023', '2022', '2024', '2024'][i] })),
  ...EXTRA_PROJECTS,
];

// Service filter labels derived from data
const SERVICE_FILTERS = ['Todos', 'Geologia', 'Geofísica', 'Geotecnia', 'Topografia', 'Ambiente', 'Consultoria', 'Águas Subterrâneas'];
const PROVINCE_FILTERS = ['Todas', 'Luanda', 'Malanje', 'Benguela', 'Huambo', 'Cabinda', 'Lunda Norte', 'Bié', 'Huíla', 'Lunda Sul', 'Moxico', 'Cunene'];
const PERIOD_FILTERS = ['Todos', '2024', '2023', '2022'];

// Placeholder card background (no real photos)
function ProjectCardBg({ index }) {
  const gradients = [
    'linear-gradient(135deg, #0d1829 0%, #1a2d40 100%)',
    'linear-gradient(135deg, #0f1e2a 0%, #1a3320 100%)',
    'linear-gradient(135deg, #1a1a1a 0%, #2a1a0a 100%)',
    'linear-gradient(135deg, #0a1a2a 0%, #0a2020 100%)',
    'linear-gradient(135deg, #1a0a1a 0%, #0a1a30 100%)',
    'linear-gradient(135deg, #0d2020 0%, #0a1025 100%)',
  ];
  const accents = ['#00AEEF', '#F5C200', '#00AEEF', '#F5C200', '#00AEEF', '#F5C200'];
  return (
    <div
      className="w-full h-48 relative overflow-hidden"
      style={{ background: gradients[index % gradients.length] }}
      aria-hidden="true"
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 39px, ${accents[index % accents.length]}14 39px, ${accents[index % accents.length]}14 40px),
                            repeating-linear-gradient(0deg, transparent, transparent 39px, ${accents[index % accents.length]}14 39px, ${accents[index % accents.length]}14 40px)`,
        }}
      />
      {/* Accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: accents[index % accents.length] }} />
      {/* Corner mark */}
      <div className="absolute top-4 right-4 font-mono text-xs tracking-widest opacity-30" style={{ color: accents[index % accents.length] }}>
        B-CHW
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article
      className="reveal group bg-white border border-gray-mid flex flex-col transition-all duration-300
                 hover:shadow-card-hover hover:-translate-y-0.5"
      style={{ transitionDelay: `${(index % 6) * 60}ms` }}
    >
      <div className="overflow-hidden">
        <ProjectCardBg index={index} />
      </div>
      <div className="p-7 flex flex-col flex-1 gap-3">
        <div className="flex items-center justify-between gap-2">
          <span className="tag-cyan">{project.service}</span>
          <span className="font-mono text-xs text-gray-text">{project.period}</span>
        </div>
        <h3 className="font-heading font-bold text-charcoal text-base leading-snug tracking-tight">{project.title}</h3>
        <p className="font-body text-gray-text text-xs leading-relaxed flex-1">{project.description}</p>
        <div className="flex items-center justify-between mt-1 pt-3 border-t border-gray-mid">
          <span className="font-mono text-xs text-gray-text opacity-60">{project.province}</span>
          <Link
            to="/contacto"
            className="font-mono text-xs text-cyan hover:underline"
            aria-label={`Falar sobre projecto similar a ${project.title}`}
          >
            Projecto similar <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
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

  function FilterBar({ label, options, active, setActive }) {
    return (
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs text-gray-text tracking-widest uppercase">{label}</span>
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => setActive(opt)}
              className={`font-mono text-xs tracking-widest px-4 py-2 border transition-colors ${
                active === opt
                  ? 'bg-cyan text-white border-cyan'
                  : 'bg-white text-charcoal border-gray-mid hover:border-cyan hover:text-cyan'
              }`}
            >
              {opt.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section
        className="min-h-[44vh] flex items-end pb-16"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 60%, #0d1829 100%)', borderBottom: '3px solid #00AEEF' }}
      >
        <div className="container">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-mono text-xs text-white/40">
              <li><Link to="/" className="hover:text-cyan transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li className="text-white/60" aria-current="page">Portfolio</li>
            </ol>
          </nav>
          <div className="section-rule" aria-hidden="true" />
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl tracking-tight mt-4">
            Casos de <em className="italic" style={{ color: '#00AEEF' }}>Estudo</em>
          </h1>
          <p className="font-body text-white/60 text-lg mt-3 max-w-xl">
            Mais de 50 projectos concluídos em 18 províncias angolanas. Uma selecção representativa do nosso trabalho.
          </p>
          {/* Count badges */}
          <div className="flex gap-6 mt-8">
            {[['50+', 'Projectos'], ['18', 'Províncias'], ['7', 'Serviços']].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="font-mono font-bold text-cyan text-2xl">{n}</div>
                <div className="font-body text-white/40 text-xs">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-10 bg-gray-light border-b border-gray-mid" aria-label="Filtros do portfolio">
        <div className="container space-y-6">
          <FilterBar label="Por Serviço" options={SERVICE_FILTERS} active={activeService} setActive={setActiveService} />
          <FilterBar label="Por Província" options={PROVINCE_FILTERS} active={activeProvince} setActive={setActiveProvince} />
          <FilterBar label="Por Período" options={PERIOD_FILTERS} active={activePeriod} setActive={setActivePeriod} />
        </div>
      </section>

      {/* Results */}
      <section className="section-pad" aria-label="Projectos">
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
              <div className="flex items-center justify-between mb-8">
                <p className="font-body text-gray-text text-sm">
                  A mostrar <span className="font-semibold text-charcoal">{filtered.length}</span> projecto{filtered.length !== 1 ? 's' : ''}
                </p>
                {(activeService !== 'Todos' || activeProvince !== 'Todas' || activePeriod !== 'Todos') && (
                  <button
                    onClick={() => { setActiveService('Todos'); setActiveProvince('Todas'); setActivePeriod('Todos'); }}
                    className="font-mono text-xs text-gray-text hover:text-cyan transition-colors"
                  >
                    LIMPAR FILTROS ×
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((project, i) => (
                  <ProjectCard key={project.title} project={project} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ backgroundColor: '#1A1A2E', borderTop: '4px solid #00AEEF' }}>
        <div className="container">
          <h2 className="font-heading font-bold text-white text-2xl md:text-3xl tracking-tight mb-3">
            Tem um projecto <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>semelhante?</em>
          </h2>
          <p className="font-body text-white/50 text-base mb-8 max-w-md mx-auto">
            Conte-nos os detalhes e receba uma proposta técnica personalizada.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/contacto" className="btn-primary">SOLICITAR PROPOSTA <span aria-hidden="true">→</span></Link>
            <Link to="/servicos" className="btn-ghost">VER SERVIÇOS</Link>
          </div>
        </div>
      </section>
    </>
  );
}
