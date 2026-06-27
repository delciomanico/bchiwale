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
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 39px, ${accents[index % accents.length]}14 39px, ${accents[index % accents.length]}14 40px),
                            repeating-linear-gradient(0deg, transparent, transparent 39px, ${accents[index % accents.length]}14 39px, ${accents[index % accents.length]}14 40px)`,
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ backgroundColor: accents[index % accents.length], opacity: 0.4 }} />
      <div className="absolute top-4 right-4 font-mono text-xs tracking-widest opacity-20" style={{ color: accents[index % accents.length] }}>
        B-CHW
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article
      className="reveal group bg-white flex flex-col transition-all duration-300
                 hover:shadow-[0_6px_24px_rgba(0,0,0,0.07)] hover:-translate-y-0.5"
      style={{ transitionDelay: `${(index % 6) * 60}ms` }}
    >
      <div className="overflow-hidden">
        <ProjectCardBg index={index} />
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
            to="/contacto"
            className="font-mono text-[10px] text-cyan hover:underline tracking-[0.12em]"
            aria-label={`Falar sobre projecto similar a ${project.title}`}
          >
            Projecto similar <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

// Underline-style filter button
function FilterBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`font-mono text-[10px] tracking-[0.18em] uppercase pb-1 border-b transition-colors ${
        active
          ? 'border-charcoal text-charcoal'
          : 'border-transparent text-charcoal/40 hover:text-charcoal hover:border-charcoal/30'
      }`}
    >
      {label}
    </button>
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
        className="min-h-[calc(44vh+72px)] flex items-end pb-16"
        style={{
          background: 'linear-gradient(135deg, #1A1A2E 60%, #0d1829 100%)',
          borderBottom: '1px solid rgba(0,174,239,0.2)',
          paddingTop: '72px',
        }}
      >
        <div className="container">
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
            Mais de 50 projectos concluídos em 18 províncias angolanas. Uma selecção representativa do nosso trabalho.
          </p>
          {/* Count indicators */}
          <div className="flex gap-8 mt-10">
            {[['50+', 'Projectos'], ['18', 'Províncias'], ['7', 'Serviços']].map(([n, l]) => (
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
        <div className="container space-y-5">
          {/* Service filter */}
          <div>
            <span className="font-mono text-[10px] text-charcoal/35 tracking-[0.18em] uppercase block mb-3">
              Por Serviço
            </span>
            <div className="flex flex-wrap gap-5">
              {SERVICE_FILTERS.map((opt) => (
                <FilterBtn
                  key={opt}
                  label={opt}
                  active={activeService === opt}
                  onClick={() => setActiveService(opt)}
                />
              ))}
            </div>
          </div>
          {/* Province filter */}
          <div>
            <span className="font-mono text-[10px] text-charcoal/35 tracking-[0.18em] uppercase block mb-3">
              Por Província
            </span>
            <div className="flex flex-wrap gap-5">
              {PROVINCE_FILTERS.map((opt) => (
                <FilterBtn
                  key={opt}
                  label={opt}
                  active={activeProvince === opt}
                  onClick={() => setActiveProvince(opt)}
                />
              ))}
            </div>
          </div>
          {/* Period filter */}
          <div>
            <span className="font-mono text-[10px] text-charcoal/35 tracking-[0.18em] uppercase block mb-3">
              Por Período
            </span>
            <div className="flex flex-wrap gap-5">
              {PERIOD_FILTERS.map((opt) => (
                <FilterBtn
                  key={opt}
                  label={opt}
                  active={activePeriod === opt}
                  onClick={() => setActivePeriod(opt)}
                />
              ))}
            </div>
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
