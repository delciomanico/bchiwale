import { Link } from 'react-router-dom';

export default function About() {
  return (
    <section
      className="section-tall bg-gray-light"
      id="sobre"
      aria-labelledby="about-title"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left — DG quote */}
          <div>
            <p className="eyebrow-muted mb-8">QUEM SOMOS</p>

            <blockquote aria-label="Citação do Director-Geral">
              <span
                className="block font-heading font-extrabold text-cyan leading-none select-none mb-4"
                style={{ fontSize: '4rem', opacity: 0.15 }}
                aria-hidden="true"
              >
                "
              </span>

              <p
                className="font-heading font-bold text-charcoal leading-snug tracking-tight mb-7"
                id="about-title"
                style={{ fontSize: 'clamp(1.125rem, 2.2vw, 1.5rem)' }}
              >
                Angola precisa de empresas de geociências que combinem
                rigor técnico de classe mundial com conhecimento profundo
                do nosso território.
              </p>

              <cite className="font-mono text-[11px] text-charcoal/40 tracking-widest2 not-italic uppercase block">
                Severino Chiwale — Director-Geral & Fundador
              </cite>
            </blockquote>
          </div>

          {/* Right — body text + pillars */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <p className="reveal font-body text-charcoal/65 text-base leading-[1.85]">
                A B-CHIWALE é uma empresa angolana constituída em 2017, com actuação em
                Geologia, Geofísica Aplicada, Engenharia Geotécnica, Topografia e Ambiente.
              </p>
              <p
                className="reveal font-body text-charcoal/65 text-base leading-[1.85]"
                style={{ transitionDelay: '80ms' }}
              >
                Com uma equipa de mais de 100 profissionais qualificados e cobertura em
                18 províncias angolanas, somos referência nacional em soluções de
                exploração e consultoria mineral.
              </p>
            </div>

            {/* Mission / Vision / Values */}
            <div className="flex flex-col gap-6 reveal" style={{ transitionDelay: '160ms' }}>
              {[
                { label: 'Missão', text: 'Transformar recursos minerais angolanos em progresso sustentável, com rigor técnico e responsabilidade ambiental.' },
                { label: 'Visão', text: 'Ser a empresa de referência em geociências e consultoria mineral em África.' },
                { label: 'Valores', text: 'Excelência técnica · Inovação · Sustentabilidade · Integridade · Responsabilidade social' },
              ].map((p) => (
                <div key={p.label} className="flex gap-7">
                  <span className="font-mono text-[10px] text-charcoal/30 tracking-widest2 uppercase pt-0.5 shrink-0 w-14">
                    {p.label}
                  </span>
                  <p className="font-body text-charcoal/60 text-sm leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>

            <div className="reveal" style={{ transitionDelay: '240ms' }}>
              <Link to="/sobre-nos" className="hero-link">
                A nossa história completa <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
