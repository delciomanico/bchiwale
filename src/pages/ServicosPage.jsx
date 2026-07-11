import { Link } from 'react-router-dom';
import { useSiteData } from '../contexts/ContentContext';
import { ServiceIcon } from '../components/ServiceIcons';
import { usePageMeta } from '../hooks/usePageMeta';

function ServiceCard({ service, index }) {
  return (
    <article
      className="reveal group bg-white flex flex-col gap-4 p-9
                 transition-all duration-300 hover:shadow-[0_6px_24px_rgba(0,0,0,0.07)] hover:-translate-y-0.5"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Icon + number row */}
      <div className="flex items-start justify-between">
        <div className="text-charcoal/35 w-10 h-10 shrink-0">
          <ServiceIcon id={service.iconId} />
        </div>
        <span className="font-mono text-[10px] text-charcoal/25 tracking-[0.18em]">{service.number}</span>
      </div>

      <h2 className="font-heading font-semibold text-charcoal text-xl leading-snug tracking-tight">
        {service.title}
      </h2>

      <p className="font-body text-gray-text text-sm leading-relaxed flex-1">{service.description}</p>

      {/* Tags — now plain mono text via global .tag-* */}
      {service.tags && service.tags.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {service.tags.map((tag) => (
            <span
              key={tag.label}
              className={
                tag.type === 'cyan' ? 'tag-cyan' :
                tag.type === 'yellow' ? 'tag-yellow' : 'tag-gray'
              }
            >
              {tag.label}
            </span>
          ))}
        </div>
      )}

      {/* Subtechniques */}
      <ul className="space-y-1.5 pt-4 border-t border-charcoal/8" aria-label="Subtécnicas">
        {service.subtechniques.map((tech) => (
          <li key={tech} className="flex items-start gap-2 text-xs font-body text-gray-text">
            <span className="text-charcoal/30 mt-0.5 shrink-0" aria-hidden="true">—</span>
            {tech}
          </li>
        ))}
      </ul>

      <Link
        to={service.href}
        className="font-body font-medium text-charcoal border-b border-charcoal/25
                   hover:text-cyan hover:border-cyan transition-colors pb-0.5 text-[14px]
                   self-start mt-2"
        aria-label={`Saber mais sobre ${service.title}`}
      >
        Ver serviço <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

export default function ServicosPage() {
  const { SERVICES } = useSiteData();
  usePageMeta(
    'Serviços de Geociências em Angola',
    'Sete serviços integrados: Geologia e Prospecção Mineral, Geofísica Aplicada, Engenharia Geotécnica, Topografia, Ambiente, Águas Subterrâneas e Consultoria Mineira.',
    'https://bchiwale.ao/servicos'
  );
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
          style={{ backgroundImage: 'url(/images/geofisico.jpg)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(10,14,22,0.78)' }} aria-hidden="true" />
        <div className="relative z-10 container">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-mono text-xs text-white/40 tracking-widest3">
              <li><Link to="/" className="hover:text-cyan transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li className="text-white/60" aria-current="page">Serviços</li>
            </ol>
          </nav>
          <h1 className="font-heading font-semibold text-white text-4xl md:text-5xl tracking-tight">
            7 Áreas de <em className="italic" style={{ color: '#00AEEF' }}>Especialização</em>
          </h1>
          <p className="font-body text-white/55 text-lg mt-4 max-w-xl leading-relaxed">
            Cobrimos todas as fases do ciclo de exploração e desenvolvimento de recursos naturais em Angola.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-pad bg-white" aria-labelledby="servicos-index-title">
        <div className="container">
          <header className="mb-14">
            <p className="eyebrow">O QUE FAZEMOS</p>
            <h2 className="section-title" id="servicos-index-title">
              Todos os nossos <em>serviços</em>
            </h2>
            <p className="section-subtitle mt-3">
              Seleccione uma área para conhecer metodologia, equipamentos e casos de estudo.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.number} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-16 text-center bg-charcoal border-t border-white/5">
        <div className="container">
          <h2 className="font-heading font-semibold text-white text-2xl md:text-3xl tracking-tight mb-6">
            Pronto para começar o seu <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>projecto?</em>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/contacto"
              className="font-body font-medium text-white border-b border-white
                         hover:text-cyan hover:border-cyan transition-colors pb-0.5 text-[15px]"
            >
              Solicitar proposta <span aria-hidden="true">↗</span>
            </Link>
            <Link
              to="/portfolio"
              className="font-mono text-[13px] text-white/40 hover:text-white transition-colors tracking-wide"
            >
              Ver portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
