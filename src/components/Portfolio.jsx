import { Link } from 'react-router-dom';
import { PORTFOLIO_ITEMS } from '../data/siteData';

function PortfolioCard({ item, delay = 0 }) {
  return (
    <Link
      to={`/portfolio/${item.slug}`}
      className="reveal group block bg-white overflow-hidden
                 transition-all duration-500 ease-out
                 hover:-translate-y-1.5
                 hover:shadow-[0_24px_64px_-12px_rgba(0,0,0,0.10)]"
      style={{ transitionDelay: `${delay}ms` }}
      role="listitem"
    >
      {/* Image */}
      <div className="overflow-hidden" style={{ height: '224px' }}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div className="px-8 py-7 flex flex-col gap-3">

        {/* Metadata row */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.20em] uppercase text-[#00AEEF]">
            {item.service}
          </span>
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-gray-text/50">
            {item.province}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-charcoal leading-snug tracking-tight"
            style={{ fontSize: '1.05rem' }}>
          {item.title}
        </h3>

        {/* Description */}
        <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(80,88,100,0.80)' }}>
          {item.description}
        </p>

        {/* CTA row */}
        <div className="pt-3 mt-1 flex items-center gap-2 border-t border-gray-mid/60">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-charcoal/35
                           group-hover:text-[#00AEEF] transition-colors duration-300">
            Ver projecto
          </span>
          <span
            className="font-mono text-[10px] text-charcoal/30 group-hover:text-[#00AEEF]
                       group-hover:translate-x-1 transition-all duration-300"
            aria-hidden="true"
          >
            →
          </span>
        </div>

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

        {/* Header */}
        <header className="mb-14 max-w-lg">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#00AEEF] mb-5">
            Trabalho de campo
          </p>
          <h2 className="font-heading font-semibold text-charcoal tracking-tight" id="portfolio-title"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', lineHeight: 1.1 }}>
            Projectos em{' '}
            <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>destaque.</em>
          </h2>
          <p className="font-body text-charcoal/50 text-base leading-relaxed mt-5">
            Uma selecção de casos de estudo representativos do nosso portfólio.
          </p>
        </header>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-mid/30"
          role="list"
          aria-label="Projectos em destaque"
        >
          {PORTFOLIO_ITEMS.map((item, i) => (
            <div key={item.title} className="bg-white">
              <PortfolioCard item={item} delay={i * 60} />
            </div>
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-14 reveal flex items-center gap-3" style={{ transitionDelay: '360ms' }}>
          <Link
            to="/portfolio"
            className="group font-mono text-[11px] tracking-[0.18em] uppercase text-charcoal/50
                       hover:text-charcoal transition-colors duration-300 flex items-center gap-2"
          >
            Ver portfolio completo
            <span className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
