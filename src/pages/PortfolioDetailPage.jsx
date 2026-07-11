import { useParams, Link } from 'react-router-dom';
import { useSiteData } from '../contexts/ContentContext';
import NotFoundPage from './NotFoundPage';

export default function PortfolioDetailPage() {
  const { slug } = useParams();
  const { PORTFOLIO_ITEMS } = useSiteData();
  const item = PORTFOLIO_ITEMS.find((p) => p.slug === slug);

  if (!item) return <NotFoundPage />;

  return (
    <>
      <section
        className="relative flex items-end pb-16"
        style={{ minHeight: '50vh', paddingTop: '72px' }}
        aria-labelledby="project-title"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.image})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(10,14,22,0.78)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 container">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-white/40 tracking-widest">
              <li><Link to="/" className="hover:text-cyan transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li><Link to="/portfolio" className="hover:text-cyan transition-colors">Portfolio</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li className="text-white/60" aria-current="page">{item.title}</li>
            </ol>
          </nav>
          <p className="eyebrow">{item.service} · {item.province}</p>
          <h1
            id="project-title"
            className="font-heading font-semibold text-white text-3xl md:text-4xl lg:text-5xl tracking-tight max-w-3xl mt-2 leading-tight"
          >
            {item.title}
          </h1>
        </div>
      </section>

      <div
        style={{ background: '#F7F7F7', borderBottom: '1px solid rgba(26,26,46,0.10)' }}
        aria-label="Detalhes do projecto"
      >
        <div className="container">
          <dl className="grid grid-cols-2 md:grid-cols-4 divide-x divide-charcoal/10">
            {[
              ['CLIENTE', item.client],
              ['ANO', item.year],
              ['ÁREA', item.area],
              ['DURAÇÃO', item.duration],
            ].map(([label, value]) => (
              <div key={label} className="px-8 py-8 first:pl-0 last:border-r-0">
                <dt className="font-mono text-[10px] tracking-[0.20em] uppercase text-charcoal/40 mb-2">{label}</dt>
                <dd className="font-heading font-semibold text-charcoal text-lg leading-tight">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section className="section-pad bg-white" aria-label="Conteúdo do projecto">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-12">
              {item.challenge && (
                <div>
                  <p className="eyebrow">O DESAFIO</p>
                  <p className="font-body text-charcoal/75 text-base leading-relaxed mt-3">{item.challenge}</p>
                </div>
              )}
              {item.challenge && item.solution && <div className="hairline" aria-hidden="true" />}
              {item.solution && (
                <div>
                  <p className="eyebrow">A NOSSA ABORDAGEM</p>
                  <p className="font-body text-charcoal/75 text-base leading-relaxed mt-3">{item.solution}</p>
                </div>
              )}
              {!item.challenge && !item.solution && (
                <p className="font-body text-charcoal/75 text-base leading-relaxed">{item.description}</p>
              )}
            </div>

            {item.results && item.results.length > 0 && (
              <div>
                <div
                  className="p-8"
                  style={{ background: '#F7F7F7', border: '1px solid rgba(26,26,46,0.10)' }}
                >
                  <p className="eyebrow">RESULTADOS</p>
                  <ul className="mt-4 space-y-4" role="list">
                    {item.results.map((result, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span
                          className="shrink-0 font-mono leading-tight mt-0.5"
                          style={{ color: '#00AEEF', fontSize: '1rem' }}
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                        <span className="font-body text-charcoal/75 text-sm leading-relaxed">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        className="py-20 border-t border-white/5"
        style={{ background: '#1A1A2E' }}
        aria-label="Contacto"
      >
        <div className="container text-center">
          <p className="eyebrow" style={{ color: '#00AEEF' }}>PRÓXIMO PASSO</p>
          <h2 className="font-heading font-semibold text-white text-2xl md:text-3xl tracking-tight mt-2 mb-8">
            Tem um projecto <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>semelhante?</em>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/contacto" className="btn-primary">
              SOLICITAR PROPOSTA →
            </Link>
            <Link
              to="/portfolio"
              className="font-mono text-[11px] text-white/40 hover:text-white transition-colors tracking-[0.15em] uppercase"
            >
              ← Voltar ao portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
