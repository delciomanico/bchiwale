import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSiteData } from '../contexts/ContentContext';
import { ServiceIcon } from '../components/ServiceIcons';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLang } from '../contexts/LangContext';
import Rich from '../components/Rich';

export default function ServicoDetailPage() {
  const { slug } = useParams();
  const { SERVICES: SERVICES_PT, SERVICES_EN, SERVICE_DETAIL, SERVICE_SLUG_MAP } = useSiteData();
  const { t, loc } = useLang();
  const SERVICES = loc(SERVICES_PT, SERVICES_EN);
  const serviceIndex = SERVICE_SLUG_MAP[slug];
  const service = serviceIndex !== undefined ? SERVICES[serviceIndex] : null;
  const detail = SERVICE_DETAIL[slug];

  usePageMeta(
    service ? service.title : t('servico.fallback_title'),
    service ? `${service.description} ${t('servico.meta_suffix')}` : undefined,
    service ? `/servicos/${slug}` : undefined
  );

  // Fallback for unknown slug
  if (!service) {
    return (
      <div className="section-pad text-center container">
        <h1 className="section-title mb-4">{t('servico.not_found')}</h1>
        <Link to="/servicos" className="btn-primary">{t('servico.view_all')}</Link>
      </div>
    );
  }

  const TAG_CLASSES = { cyan: 'tag-cyan', yellow: 'tag-yellow', gray: 'tag-gray' };

  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[calc(44vh+72px)] flex items-end pb-16"
        style={{ borderBottom: '3px solid #00AEEF', paddingTop: '72px' }}
      >
        {service.image && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${service.image})` }}
            aria-hidden="true"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background: service.image
              ? 'rgba(10,14,22,0.78)'
              : 'linear-gradient(135deg, #1A1A2E 60%, #0d1829 100%)',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 container">
          <nav aria-label={t('common.breadcrumb')} className="mb-6">
            <ol className="flex items-center gap-2 font-mono text-xs text-white/40 tracking-widest3">
              <li><Link to="/" className="hover:text-cyan transition-colors">{t('common.home')}</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li><Link to="/servicos" className="hover:text-cyan transition-colors">{t('servicos.breadcrumb')}</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li className="text-white/60" aria-current="page">{service.title}</li>
            </ol>
          </nav>
          <div className="text-cyan text-4xl mb-4" aria-hidden="true">
            <ServiceIcon id={service.iconId} className="w-14 h-14" />
          </div>
          <div className="section-rule" aria-hidden="true" />
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl tracking-tight mt-4 max-w-2xl">
            {service.title}
          </h1>
          <p className="font-body text-white/60 text-lg mt-3 max-w-xl">{service.description}</p>
          <div className="flex flex-wrap gap-2 mt-5">
            {service.tags.map((tag) => (
              <span key={tag.label} className={TAG_CLASSES[tag.type]}>{tag.label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Subtechniques */}
      <section className="section-pad" aria-labelledby="subtec-title">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="section-rule" aria-hidden="true" />
              <p className="eyebrow">{t('servico.scope_eyebrow')}</p>
              <h2 className="section-title mt-1 mb-8" id="subtec-title">
                <Rich text={t('servico.scope_title')} />
              </h2>
              <ul className="space-y-4">
                {service.subtechniques.map((tech) => (
                  <li key={tech} className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-cyan/10 border border-cyan flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                      <span className="text-cyan text-xs font-mono">✓</span>
                    </span>
                    <span className="font-body text-charcoal text-sm leading-relaxed">{tech}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Norms */}
            {detail?.norms && (
              <div className="bg-gray-light border border-gray-mid p-8">
                <div className="section-rule" aria-hidden="true" />
                <p className="eyebrow">{t('servico.norms_eyebrow')}</p>
                <h3 className="font-heading font-bold text-charcoal text-xl mt-1 mb-6">{t('servico.norms_title')}</h3>
                <ul className="space-y-3">
                  {detail.norms.map((norm) => (
                    <li key={norm} className="flex items-center gap-3 font-body text-sm text-charcoal">
                      <span className="w-1.5 h-1.5 bg-cyan rounded-full shrink-0" aria-hidden="true" />
                      {norm}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Methodology */}
      {detail?.methodology && (
        <section className="section-pad bg-gray-light" aria-labelledby="method-title">
          <div className="container">
            <header className="text-center mb-14">
              <div className="section-rule mx-auto" aria-hidden="true" />
              <p className="eyebrow">{t('servico.method_eyebrow')}</p>
              <h2 className="section-title" id="method-title"><Rich text={t('servico.method_title')} /></h2>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {detail.methodology.map((step, i) => (
                <div
                  key={step.step}
                  className="reveal bg-white border border-gray-mid border-t-4 border-t-cyan p-7"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="font-mono font-semibold text-cyan text-2xl tracking-tight mb-4">{step.step}</div>
                  <h3 className="font-heading font-bold text-charcoal text-lg mb-3">{step.title}</h3>
                  <p className="font-body text-gray-text text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {detail?.faqs && (
        <section className="section-pad" aria-labelledby="faq-title">
          <div className="container max-w-3xl">
            <header className="text-center mb-12">
              <div className="section-rule mx-auto" aria-hidden="true" />
              <p className="eyebrow">{t('servico.faq_eyebrow')}</p>
              <h2 className="section-title" id="faq-title"><Rich text={t('servico.faq_title')} /></h2>
            </header>
            <div className="space-y-4">
              {detail.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="reveal group bg-white border border-gray-mid"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <summary className="flex items-start justify-between gap-4 px-7 py-5 cursor-pointer
                                      list-none font-body font-semibold text-charcoal text-sm leading-snug
                                      hover:text-cyan transition-colors">
                    {faq.q}
                    <span className="text-cyan font-mono text-lg shrink-0 mt-0.5 group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <div className="px-7 pb-5">
                    <p className="font-body text-gray-text text-sm leading-relaxed border-t border-gray-mid pt-4">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related portfolio link */}
      <section className="section-pad bg-gray-light">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-mid border-l-4 border-l-cyan p-8">
              <p className="eyebrow">{t('servico.cases_eyebrow')}</p>
              <h3 className="font-heading font-bold text-charcoal text-xl mt-1 mb-3">{t('servico.cases_title')}</h3>
              <p className="font-body text-gray-text text-sm leading-relaxed mb-5">
                {t('servico.cases_body')}
              </p>
              <Link to="/portfolio" className="btn-link">
                {t('servico.cases_cta')} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="bg-charcoal border-t-4 border-cyan p-8">
              <p className="eyebrow text-cyan">{t('servico.request_eyebrow')}</p>
              <h3 className="font-heading font-bold text-white text-xl mt-1 mb-3">{t('servico.request_title')}</h3>
              <p className="font-body text-white/60 text-sm leading-relaxed mb-5">
                {t('servico.request_body')}
              </p>
              <Link to="/contacto" className="btn-primary">
                {t('servico.request_cta')} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
