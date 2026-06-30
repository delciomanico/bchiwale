import { Link } from 'react-router-dom';
import { SERVICES } from '../data/siteData';
import { useLang } from '../contexts/LangContext';
import { SERVICES_EN } from '../i18n/dataEN';

// ── Services — editorial index, no cards, no icons ──
// Each row is a full-width link. Hovering scales in a cyan left-bar
// (handled via .service-row CSS class) and reveals a description.
function ServiceRow({ service, index }) {
  return (
    <Link
      to={service.href}
      className="service-row group reveal"
      style={{ transitionDelay: `${index * 60}ms` }}
      aria-label={`${service.title} — saber mais`}
    >
      {/* Left: number (very faint) + title + description on hover */}
      <div className="flex items-baseline gap-5 md:gap-8 flex-1 min-w-0">
        {/* Number — near invisible, structural only */}
        <span
          className="font-mono text-[10px] text-charcoal/20 shrink-0 w-5 select-none"
          aria-hidden="true"
        >
          {service.number}
        </span>

        <div className="min-w-0">
          {/* Service title */}
          <span
            className="font-heading font-semibold text-charcoal tracking-tight leading-tight
                       group-hover:text-charcoal/70 transition-colors duration-300
                       block"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.625rem)' }}
          >
            {service.title}
          </span>

          {/* Description — slides in on hover */}
          <span
            className="font-body text-gray-text text-sm leading-relaxed mt-1
                       block max-h-0 overflow-hidden opacity-0
                       group-hover:max-h-10 group-hover:opacity-100
                       transition-all duration-300 ease-out"
          >
            {service.description}
          </span>
        </div>
      </div>

      {/* Right: arrow — faint by default, cyan on hover */}
      <span
        className="font-mono text-base text-charcoal/20 group-hover:text-cyan
                   transition-colors duration-300 shrink-0 ml-6"
        aria-hidden="true"
      >
        →
      </span>
    </Link>
  );
}

export default function Services() {
  const { t, loc } = useLang();
  const services = loc(SERVICES, SERVICES_EN);

  return (
    <section
      className="section-tall"
      id="servicos"
      aria-labelledby="services-title"
    >
      <div className="container">
        {/* Header */}
        <header className="mb-10 md:mb-14 max-w-2xl">
          <p className="eyebrow-muted mb-4">{t('services.eyebrow')}</p>
          <h2
            className="section-title-xl"
            id="services-title"
          >
            {t('services.title_line1')}<br />
            {t('services.title_line2')} <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>{t('services.title_em')}</em>
          </h2>
        </header>

        {/* Service rows */}
        <div
          className="border-t border-gray-mid"
          role="list"
          aria-label={t('services.list_label')}
        >
          {services.map((service, i) => (
            <div key={service.number} role="listitem">
              <ServiceRow service={service} index={i} />
            </div>
          ))}
        </div>

        {/* Section link */}
        <div className="mt-12 reveal" style={{ transitionDelay: '480ms' }}>
          <Link to="/servicos" className="hero-link">
            {t('services.view_all')} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
