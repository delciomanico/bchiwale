// PlaceholderPage — reusable scaffold for pages not yet fully built.
// Shows a styled page hero + coming-soon message matching the design system.
import { Link } from 'react-router-dom';

export default function PlaceholderPage({ title, subtitle, breadcrumb }) {
  return (
    <>
      {/* Internal page hero */}
      <section
        className="min-h-[calc(40vh+72px)] flex items-end pb-16"
        style={{
          background: 'linear-gradient(135deg, #1A1A2E 60%, #0d1829 100%)',
          borderBottom: '3px solid #00AEEF', paddingTop: '72px',
        }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-mono text-xs text-white/40 tracking-widest3">
              <li>
                <Link to="/" className="hover:text-cyan transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/20">
                /
              </li>
              <li className="text-white/60" aria-current="page">
                {breadcrumb || title}
              </li>
            </ol>
          </nav>

          <div className="section-rule" aria-hidden="true" />
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl tracking-tight mt-4">
            {title}
          </h1>
          {subtitle && (
            <p className="font-body text-white/60 text-lg mt-3 max-w-xl">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Coming soon body */}
      <section className="section-pad">
        <div className="container max-w-2xl text-center">
          <div className="section-rule mx-auto" aria-hidden="true" />
          <p className="eyebrow">EM CONSTRUÇÃO</p>
          <h2 className="section-title mt-2">Esta página está a ser preparada.</h2>
          <p className="section-subtitle mx-auto mt-4">
            O conteúdo completo desta secção será publicado em breve. Entretanto, contacte-nos
            para qualquer questão.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link to="/contacto" className="btn-primary">
              CONTACTAR-NOS
            </Link>
            <Link to="/" className="btn-secondary">
              VOLTAR AO INÍCIO
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
