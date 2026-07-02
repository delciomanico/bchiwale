import { Link } from 'react-router-dom';
import { DOWNLOADS, TOOLS } from '../data/siteData';

export default function RecursosPage() {
  return (
    <>
      {/* Page hero */}
      <section
        className="relative min-h-[calc(40vh+72px)] flex items-end pb-16"
        style={{
          borderBottom: '1px solid rgba(0,174,239,0.2)',
          paddingTop: '72px',
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/gallery4.jpg)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(10,14,22,0.78)' }} aria-hidden="true" />
        <div className="relative z-10 container">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-mono text-xs text-white/40">
              <li><Link to="/" className="hover:text-cyan transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li className="text-white/60" aria-current="page">Recursos</li>
            </ol>
          </nav>
          <h1 className="font-heading font-semibold text-white text-4xl md:text-5xl tracking-tight">
            Centro de <em className="italic" style={{ color: '#00AEEF' }}>Recursos</em>
          </h1>
          <p className="font-body text-white/55 text-lg mt-4 max-w-xl leading-relaxed">
            Ferramentas e downloads técnicos para projectos de geociências.
          </p>
        </div>
      </section>

      {/* Quick links nav — white, hairline border */}
      <nav className="bg-white border-b border-charcoal/8 py-4" aria-label="Secções desta página">
        <div className="container">
          <div className="flex flex-wrap gap-6">
            {[
              ['#downloads', 'Centro de Downloads'],
              ['#ferramentas', 'Ferramentas Técnicas'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="font-mono text-[10px] text-charcoal/45 tracking-[0.18em] uppercase
                           hover:text-charcoal transition-colors pb-0.5 border-b border-transparent
                           hover:border-charcoal/30"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── 1. Downloads ── */}
      <section id="downloads" className="section-pad bg-white border-t border-charcoal/8" aria-labelledby="dl-title">
        <div className="container">
          <header className="mb-10">
            <p className="eyebrow">CENTRO DE DOWNLOADS</p>
            <h2 className="section-title" id="dl-title">Documentos <em>técnicos</em></h2>
            <p className="section-subtitle mt-2">
              Guias, templates e documentação regulatória de utilidade para projectos de geociências.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOWNLOADS.map((doc, i) => (
              <div
                key={doc.id}
                className="reveal bg-white flex flex-col gap-4
                           hover:shadow-[0_6px_24px_rgba(0,0,0,0.07)] transition-all duration-300"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* File type — plain mono, accent color */}
                  <span
                    className="font-mono font-medium text-[10px] tracking-[0.18em] uppercase"
                    style={{ color: doc.accentColor }}
                  >
                    {doc.type}
                  </span>
                  <span className="tag-gray">{doc.cat}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-charcoal text-sm leading-snug mb-1">{doc.title}</h3>
                  <p className="font-body text-gray-text text-xs leading-relaxed">{doc.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-charcoal/8">
                  <span className="font-mono text-[10px] text-charcoal/30 tracking-[0.12em]">{doc.size}</span>
                  <Link
                    to="/contacto"
                    className="font-mono text-[10px] text-cyan hover:underline tracking-[0.12em]"
                    aria-label={`Solicitar ${doc.title}`}
                  >
                    Solicitar <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="font-body text-gray-text text-xs mt-8 text-center leading-relaxed">
            Para aceder aos documentos, contacte a nossa equipa. Alguns ficheiros requerem autenticação.
          </p>
        </div>
      </section>

      {/* ── 2. Technical tools ── */}
      <section id="ferramentas" className="section-pad bg-white border-t border-charcoal/8" aria-labelledby="tools-title">
        <div className="container">
          <header className="mb-10">
            <p className="eyebrow">FERRAMENTAS TÉCNICAS</p>
            <h2 className="section-title" id="tools-title">Referências de <em>campo</em></h2>
            <p className="section-subtitle mt-2">
              Recursos de referência rápida para técnicos e geólogos no terreno.
            </p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
            {TOOLS.map((tool, i) => (
              <div
                key={tool.title}
                className="reveal bg-white flex gap-4 items-start p-7
                           hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="text-charcoal/25 text-xl shrink-0 mt-0.5" aria-hidden="true">{tool.icon}</span>
                <div>
                  <h3 className="font-heading font-semibold text-charcoal text-sm mb-1">{tool.title}</h3>
                  <p className="font-body text-gray-text text-xs leading-relaxed">{tool.desc}</p>
                  <Link
                    to="/contacto"
                    className="font-mono text-[10px] text-cyan hover:underline mt-3 inline-block tracking-[0.12em]"
                  >
                    Solicitar acesso <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="font-body text-gray-text text-xs mt-8 max-w-lg leading-relaxed">
            As ferramentas interactivas estão em desenvolvimento. Para acesso antecipado, contacte-nos.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center bg-charcoal border-t border-white/5">
        <div className="container">
          <h2 className="font-heading font-semibold text-white text-2xl md:text-3xl tracking-tight mb-6">
            Não encontrou o que <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>procurava?</em>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/contacto"
              className="font-body font-medium text-white border-b border-white
                         hover:text-cyan hover:border-cyan transition-colors pb-0.5 text-[15px]"
            >
              Contactar a equipa <span aria-hidden="true">↗</span>
            </Link>
            <Link
              to="/blog"
              className="font-mono text-[13px] text-white/40 hover:text-white transition-colors tracking-wide"
            >
              Ver artigos técnicos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
