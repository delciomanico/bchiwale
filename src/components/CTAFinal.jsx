import { Link } from 'react-router-dom';
import { CONTACT } from '../data/siteData';

export default function CTAFinal() {
  return (
    <section className="section-tall bg-charcoal" aria-labelledby="cta-title">
      <div className="container">
        <div className="max-w-[580px]">

          <p className="eyebrow mb-6 md:mb-8">PRÓXIMO PASSO</p>

          <h2
            id="cta-title"
            className="font-heading font-semibold text-white leading-[0.95] tracking-[-0.04em] mb-8 md:mb-10"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            O seu projecto começa com uma{' '}
            <em className="italic" style={{ color: '#00AEEF' }}>conversa.</em>
          </h2>

          <div className="w-full h-px bg-white/10 mb-8 md:mb-10" aria-hidden="true" />

          <p className="font-body text-white/45 text-base leading-[1.8] mb-8 md:mb-10">
            A nossa equipa técnica avalia o seu caso em 24 horas — seja para prospecção
            mineral, estudo geotécnico, levantamento topográfico ou licenciamento mineiro.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-5 sm:gap-8">
            <Link
              to="/contacto"
              className="font-body font-medium text-white border-b border-white
                         hover:text-cyan hover:border-cyan transition-colors pb-0.5 text-[15px]"
            >
              Falar com a nossa equipa <span aria-hidden="true">↗</span>
            </Link>
            <a
              href={`mailto:${CONTACT.email}`}
              className="font-mono text-[14px] text-white/40 hover:text-cyan transition-colors tracking-wide"
            >
              {CONTACT.email}
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
