import { Link } from 'react-router-dom';
import { PORTFOLIO_ITEMS } from '../data/siteData';

const SERVICE_ACCENTS = {
  Geologia:    '#00AEEF',
  Geofísica:   '#00AEEF',
  Geotecnia:   '#F5C200',
  Topografia:  '#F5C200',
  Ambiente:    '#00AEEF',
  Consultoria: '#F5C200',
};

function PortfolioCard({ item, delay = 0 }) {
  const accent = SERVICE_ACCENTS[item.service] || '#00AEEF';

  return (
    <Link
      to={item.href}
      className="reveal group block bg-white border border-gray-mid overflow-hidden
                 transition-shadow duration-300 hover:shadow-card-hover"
      style={{ transitionDelay: `${delay}ms` }}
      role="listitem"
    >
      {/* Project image */}
      <div className="relative overflow-hidden" style={{ height: '190px' }}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Dark overlay on hover */}
        <div
          className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/70
                     transition-all duration-300 flex items-center justify-center"
        >
          <span
            className="font-mono text-xs text-white uppercase tracking-widest3
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Ver projecto →
          </span>
        </div>
        {/* Bottom accent strip */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px]"
          style={{ backgroundColor: accent }}
        />
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="tag-cyan">{item.service}</span>
          <span className="tag-yellow">{item.province}</span>
        </div>
        <h3 className="font-heading font-bold text-charcoal text-sm md:text-base leading-snug tracking-tight">
          {item.title}
        </h3>
        <p className="font-body text-gray-text text-xs md:text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    </Link>
  );
}

export default function Portfolio() {
  return (
    <section
      className="section-tall bg-white"
      id="portfolio"
      aria-labelledby="portfolio-title"
    >
      <div className="container">
        <header className="mb-10 max-w-xl">
          <p className="eyebrow-muted mb-4">TRABALHO DE CAMPO</p>
          <h2 className="section-title-xl" id="portfolio-title">
            Projectos em <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>destaque.</em>
          </h2>
          <p className="font-body text-charcoal/55 text-base leading-relaxed mt-4">
            Uma selecção de casos de estudo representativos do nosso portfólio.
          </p>
        </header>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
          aria-label="Projectos em destaque"
        >
          {PORTFOLIO_ITEMS.map((item, i) => (
            <PortfolioCard key={item.title} item={item} delay={i * 70} />
          ))}
        </div>

        <div className="mt-10 reveal" style={{ transitionDelay: '420ms' }}>
          <Link to="/portfolio" className="hero-link">
            Ver portfolio completo <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
