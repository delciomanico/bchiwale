import { Link } from 'react-router-dom';
import { SERVICES } from '../data/siteData';
import { ServiceIcon } from '../components/ServiceIcons';

const TAG_CLASSES = { cyan: 'tag-cyan', yellow: 'tag-yellow', gray: 'tag-gray' };

function ServiceCard({ service, index }) {
  return (
    <article
      className="reveal group bg-white border border-gray-mid p-9 flex flex-col gap-4
                 transition-all duration-300 hover:border-t-[3px] hover:border-t-cyan hover:shadow-card-hover hover:-translate-y-0.5"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="text-cyan w-12 h-12"><ServiceIcon id={service.iconId} /></div>
        <span className="font-mono text-xs text-gray-mid tracking-widest2">{service.number}</span>
      </div>

      <h2 className="font-heading font-bold text-charcoal text-xl leading-snug tracking-tight">
        {service.title}
      </h2>

      <p className="font-body text-gray-text text-sm leading-relaxed flex-1">{service.description}</p>

      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span key={tag.label} className={TAG_CLASSES[tag.type]}>{tag.label}</span>
        ))}
      </div>

      <ul className="space-y-1.5 py-2 border-t border-gray-mid" aria-label="Subtécnicas">
        {service.subtechniques.map((tech) => (
          <li key={tech} className="flex items-start gap-2 text-xs font-body text-gray-text">
            <span className="text-cyan mt-0.5 shrink-0" aria-hidden="true">—</span>
            {tech}
          </li>
        ))}
      </ul>

      <Link
        to={service.href}
        className="btn-primary self-start mt-2 text-sm py-2.5 px-6"
        aria-label={`Saber mais sobre ${service.title}`}
      >
        Ver serviço <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

export default function ServicosPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="min-h-[calc(44vh+72px)] flex items-end pb-16"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 60%, #0d1829 100%)', borderBottom: '3px solid #00AEEF', paddingTop: '72px' }}
      >
        <div className="container">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-mono text-xs text-white/40 tracking-widest3">
              <li><Link to="/" className="hover:text-cyan transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li className="text-white/60" aria-current="page">Serviços</li>
            </ol>
          </nav>
          <div className="section-rule" aria-hidden="true" />
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl tracking-tight mt-4">
            7 Áreas de <em className="italic" style={{ color: '#00AEEF' }}>Especialização</em>
          </h1>
          <p className="font-body text-white/60 text-lg mt-3 max-w-xl">
            Cobrimos todas as fases do ciclo de exploração e desenvolvimento de recursos naturais em Angola.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-pad" aria-labelledby="servicos-index-title">
        <div className="container">
          <header className="mb-12">
            <div className="section-rule" aria-hidden="true" />
            <p className="eyebrow">O QUE FAZEMOS</p>
            <h2 className="section-title" id="servicos-index-title">
              Todos os nossos <em>serviços</em>
            </h2>
            <p className="section-subtitle mt-3">
              Seleccione uma área para conhecer metodologia, equipamentos e casos de estudo.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.number} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section
        className="py-16 text-center"
        style={{ backgroundColor: '#1A1A2E', borderTop: '4px solid #00AEEF' }}
      >
        <div className="container">
          <h2 className="font-heading font-bold text-white text-2xl md:text-3xl tracking-tight mb-6">
            Pronto para começar o seu <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>projecto?</em>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/contacto" className="btn-primary">SOLICITAR PROPOSTA <span aria-hidden="true">→</span></Link>
            <Link to="/portfolio" className="btn-ghost">VER PORTFOLIO</Link>
          </div>
        </div>
      </section>
    </>
  );
}
