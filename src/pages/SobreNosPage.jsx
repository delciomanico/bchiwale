import { Link } from 'react-router-dom';
import { TEAM, STATS } from '../data/siteData';
import { useStatCounter } from '../hooks/useStatCounter';
import Timeline from '../components/Timeline';

// ── Internal hero ───────────────────────────────────────────────
function PageHero() {
  return (
    <section
      className="min-h-[44vh] flex items-end pb-16"
      style={{ background: 'linear-gradient(135deg, #1A1A2E 60%, #0d1829 100%)', borderBottom: '3px solid #00AEEF' }}
    >
      <div className="container">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 font-mono text-xs text-white/40 tracking-widest3">
            <li><Link to="/" className="hover:text-cyan transition-colors">Home</Link></li>
            <li aria-hidden="true" className="text-white/20">/</li>
            <li className="text-white/60" aria-current="page">Sobre Nós</li>
          </ol>
        </nav>
        <div className="section-rule" aria-hidden="true" />
        <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl tracking-tight mt-4">
          Sobre a{' '}
          <em className="italic" style={{ color: '#00AEEF' }}>B-CHIWALE</em>
        </h1>
        <p className="font-body text-white/60 text-lg mt-3 max-w-xl">
          Oito anos a mapear o subsolo angolano com rigor técnico e compromisso com o progresso sustentável.
        </p>
      </div>
    </section>
  );
}

// ── DG Message ──────────────────────────────────────────────────
function DGMessage() {
  return (
    <section className="section-pad" id="mensagem-dg" aria-labelledby="dg-title">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* DG portrait placeholder */}
          <div
            className="relative flex flex-col items-center justify-center text-center p-12"
            style={{ background: '#0d1829', borderTop: '4px solid #00AEEF', minHeight: '380px' }}
            aria-hidden="true"
          >
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 24px, rgba(0,174,239,0.04) 24px, rgba(0,174,239,0.04) 25px)'
            }} />
            <div
              className="relative z-10 w-28 h-28 rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: '#1A1A2E', boxShadow: '0 0 40px rgba(0,174,239,0.15)', border: '2px solid rgba(0,174,239,0.3)' }}
            >
              <span className="font-heading font-extrabold text-white text-3xl tracking-tight">SC</span>
            </div>
            <div className="relative z-10 font-heading font-bold text-white text-lg mb-1">Severino Chiwale</div>
            <div className="relative z-10 font-mono text-xs text-cyan tracking-widest3 uppercase">Director-Geral &amp; Fundador</div>
            <div className="relative z-10 font-mono text-xs text-white/30 tracking-widest3 mt-3">B-CHIWALE · EST. 2017</div>
          </div>

          {/* Quote */}
          <div>
            <div className="section-rule" aria-hidden="true" />
            <p className="eyebrow">MENSAGEM DO DIRECTOR-GERAL</p>
            <h2 className="section-title mt-2 mb-6" id="dg-title">
              Angola merece <em>excelência.</em>
            </h2>
            <blockquote className="relative">
              <span
                className="font-heading font-extrabold text-8xl text-cyan/15 leading-none absolute -top-4 -left-2 select-none"
                aria-hidden="true"
              >"</span>
              <p className="font-body text-charcoal italic text-lg leading-relaxed pt-6 pl-4 mb-4">
                "Quando fundámos a B-CHIWALE em 2017, tínhamos uma convicção firme: Angola precisa de empresas
                de geociências que combinem rigor técnico de classe mundial com conhecimento profundo do nosso
                território. Oito anos depois, continuamos a trabalhar com essa mesma convicção — tendo
                contribuído para projectos em todas as 18 províncias angolanas."
              </p>
              <p className="font-body text-charcoal italic text-lg leading-relaxed pl-4 mb-6">
                "A nossa riqueza mineral é imensa. Falta cartografá-la, quantificá-la e transformá-la em
                progresso sustentável. É isso que a B-CHIWALE faz — todos os dias, em campo."
              </p>
              <cite className="block pl-4 font-mono text-xs text-gray-text tracking-widest3 not-italic uppercase">
                — Severino Chiwale, Director-Geral &amp; Fundador
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── MVV ─────────────────────────────────────────────────────────
function MVV() {
  const cards = [
    { label: 'Missão', title: 'Excelência Técnica', text: 'Prestar serviços de excelência em geologia e engenharia geotécnica, transformando recursos minerais em progresso sustentável para Angola.', accent: '#00AEEF' },
    { label: 'Visão', title: 'Liderança Africana', text: 'Ser a empresa de referência em consultoria geológica e mineração em África, reconhecida pela excelência técnica e compromisso com a sustentabilidade.', accent: '#F5C200' },
    { label: 'Valores', title: 'Princípios', text: 'Excelência técnica · Inovação contínua · Sustentabilidade · Integridade · Responsabilidade social', accent: '#1A1A2E' },
  ];
  return (
    <section className="section-pad bg-gray-light" id="missao" aria-labelledby="mvv-title">
      <div className="container">
        <header className="text-center mb-12">
          <div className="section-rule mx-auto" aria-hidden="true" />
          <p className="eyebrow">MISSÃO, VISÃO E VALORES</p>
          <h2 className="section-title" id="mvv-title">O que nos <em>define.</em></h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={card.label}
              className="reveal bg-white p-8 border border-gray-mid border-l-4"
              style={{ borderLeftColor: card.accent, transitionDelay: `${i * 100}ms` }}
            >
              <div className="font-mono text-xs tracking-widest2 uppercase mb-3" style={{ color: card.accent === '#F5C200' ? '#B8860B' : card.accent }}>{card.label}</div>
              <h3 className="font-heading font-bold text-charcoal text-xl mb-4">{card.title}</h3>
              <p className="font-body text-gray-text text-sm leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Numbers ──────────────────────────────────────────────────────
function StatItem({ value, suffix, label, detail, delay = 0 }) {
  const { count, ref } = useStatCounter(value);
  return (
    <div ref={ref} className="reveal flex flex-col items-center text-center px-6 py-10" style={{ transitionDelay: `${delay}ms` }}>
      <div className="relative mb-2">
        <span className="font-heading font-extrabold text-5xl text-cyan tracking-tight">{count}{suffix}</span>
        <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-yellow" aria-hidden="true" />
      </div>
      <span className="font-body font-semibold text-white text-sm mt-4 mb-1">{label}</span>
      <span className="font-mono text-xs text-white/40 tracking-widest3">{detail}</span>
    </div>
  );
}

function Numbers() {
  return (
    <section className="bg-charcoal" aria-label="Em números">
      <div className="container">
        <header className="text-center pt-16 pb-4">
          <div className="section-rule mx-auto" aria-hidden="true" />
          <p className="eyebrow text-cyan">EM NÚMEROS</p>
          <h2 className="font-heading font-bold text-white text-3xl md:text-4xl tracking-tight mt-2">
            Resultados que <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>falam.</em>
          </h2>
        </header>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-white/10 mt-8">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} detail={stat.detail} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Organograma ──────────────────────────────────────────────────
function OrgChart() {
  const branches = [
    {
      title: 'Direcção Técnica',
      sub: 'Geologia & Geofísica',
      items: ['Dep. Geologia — Prospecção · Depósitos · Cartografia', 'Dep. Geofísica — Sísmico · Resistividade · Magnetometria'],
      color: '#00AEEF',
    },
    {
      title: 'Direcção Operacional',
      sub: 'Geotecnia & Topografia',
      items: ['Dep. Geotecnia — Fundações · Estabilidade · Instrumentação', 'Dep. Topografia — GNSS · Taqueometria · Batimetria', 'Dep. Ambiente — Monitoramento · Impacto · Recuperação'],
      color: '#F5C200',
    },
    {
      title: 'Direcção Administrativa',
      sub: 'Finanças & Gestão',
      items: ['Apoio Jurídico e Regulatório', 'Consultoria e Tramitação', 'Tecnologia de Informação'],
      color: '#6B7280',
    },
  ];

  return (
    <section className="section-pad bg-gray-light" id="organograma" aria-labelledby="org-title">
      <div className="container">
        <header className="text-center mb-14">
          <div className="section-rule mx-auto" aria-hidden="true" />
          <p className="eyebrow">ESTRUTURA ORGANIZACIONAL</p>
          <h2 className="section-title" id="org-title">Organograma <em>Institucional</em></h2>
        </header>
        <div className="max-w-4xl mx-auto">
          {/* DG box */}
          <div className="flex justify-center mb-6">
            <div className="reveal bg-charcoal text-white border-t-4 border-cyan px-8 py-5 text-center min-w-[220px]">
              <div className="font-mono text-xs text-cyan tracking-widest2 uppercase mb-1">Director-Geral</div>
              <div className="font-heading font-bold text-base">B. Chiwale</div>
            </div>
          </div>
          {/* Connector line */}
          <div className="flex justify-center mb-2" aria-hidden="true"><div className="w-px h-8 bg-gray-mid" /></div>
          <div className="flex justify-center mb-6" aria-hidden="true"><div className="w-2/3 h-px bg-gray-mid" /></div>
          {/* Branches */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {branches.map((branch, i) => (
              <div key={branch.title} className="reveal flex flex-col" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="bg-white border border-gray-mid border-t-4 px-6 py-5 text-center" style={{ borderTopColor: branch.color }}>
                  <div className="font-heading font-bold text-charcoal text-sm">{branch.title}</div>
                  <div className="font-mono text-xs text-gray-text mt-1">{branch.sub}</div>
                </div>
                <ul className="mt-3 space-y-2">
                  {branch.items.map((item) => (
                    <li
                      key={item}
                      className="bg-white border border-gray-mid px-5 py-3 font-body text-xs text-gray-text leading-snug border-l-2"
                      style={{ borderLeftColor: branch.color }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Team section ─────────────────────────────────────────────────
function TeamSection() {
  return (
    <section className="section-pad" id="equipa" aria-labelledby="team-sobre-title">
      <div className="container">
        <header className="text-center mb-12">
          <div className="section-rule mx-auto" aria-hidden="true" />
          <p className="eyebrow">AS PESSOAS POR DETRÁS DO RIGOR</p>
          <h2 className="section-title" id="team-sobre-title">Equipa de <em>Liderança</em></h2>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {TEAM.map((member, i) => (
            <article
              key={member.initials}
              className="reveal bg-white border border-gray-mid p-7 flex flex-col gap-4
                         transition-all duration-300 hover:border-t-[3px] hover:border-t-cyan hover:shadow-card-hover"
              style={{ transitionDelay: `${i * 80}ms` }}
              role="listitem"
            >
              <div className="w-14 h-14 rounded-full bg-cyan flex items-center justify-center" aria-hidden="true">
                <span className="font-heading font-extrabold text-white text-base">{member.initials}</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-charcoal text-base">{member.name}</h3>
                <div className="font-mono text-xs text-cyan uppercase tracking-widest3 mt-1">{member.role}</div>
              </div>
              <p className="font-body text-gray-text text-sm">{member.area}</p>
              <p className="font-mono text-xs text-gray-text">{member.experience}</p>
              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {member.certs.map((c) => <span key={c} className="tag-gray">{c}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Certifications ───────────────────────────────────────────────
function Certifications() {
  const certs = [
    { code: 'ISO 9001', label: 'Sistema de Gestão da Qualidade', year: '2019', desc: 'Certificação internacional de qualidade em processos e serviços. Renovada anualmente.' },
    { code: 'ISO 45001', label: 'Segurança e Saúde Ocupacional', year: '2019', desc: 'Norma de S&ST reconhecida globalmente. Garante segurança nas campanhas de campo.' },
    { code: 'ABNT', label: 'Normas Técnicas Brasileiras', year: '2020', desc: 'Conformidade com normas técnicas aplicadas a ensaios geotécnicos e relatórios.' },
    { code: 'JORC', label: 'Joint Ore Reserves Committee', year: '2021', desc: 'Padrão internacional australiano para reporte de recursos e reservas minerais.' },
    { code: 'NI 43-101', label: 'National Instrument 43-101', year: '2021', desc: 'Norma canadiana para divulgação de informação mineral. Aceite por bolsas internacionais.' },
  ];

  return (
    <section className="section-pad bg-gray-light" id="certificacoes" aria-labelledby="cert-title">
      <div className="container">
        <header className="text-center mb-12">
          <div className="section-rule mx-auto" aria-hidden="true" />
          <p className="eyebrow">QUALIDADE E CONFORMIDADE</p>
          <h2 className="section-title" id="cert-title">As nossas <em>Certificações</em></h2>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <div
              key={cert.code}
              className="reveal bg-white border border-gray-mid border-t-4 border-t-cyan p-7"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="font-heading font-extrabold text-charcoal text-2xl tracking-tight mb-1">{cert.code}</div>
              <div className="font-mono text-xs text-cyan tracking-widest3 uppercase mb-4">{cert.label}</div>
              <p className="font-body text-gray-text text-sm leading-relaxed mb-4">{cert.desc}</p>
              <div className="font-mono text-xs text-gray-mid">Desde {cert.year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────
export default function SobreNosPage() {
  return (
    <>
      <PageHero />
      <DGMessage />
      <MVV />
      <Numbers />
      <Timeline />
      <OrgChart />
      <TeamSection />
      <Certifications />
      {/* CTA */}
      <section className="py-20 text-center" style={{ backgroundColor: '#1A1A2E', borderTop: '4px solid #00AEEF' }}>
        <div className="container">
          <p className="eyebrow text-cyan">PRÓXIMO PASSO</p>
          <h2 className="font-heading font-bold text-white text-3xl md:text-4xl tracking-tight mt-2 mb-6">
            Conheça os nossos <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>serviços.</em>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/servicos" className="btn-primary">VER SERVIÇOS <span aria-hidden="true">→</span></Link>
            <Link to="/contacto" className="btn-ghost">CONTACTAR-NOS</Link>
          </div>
        </div>
      </section>
    </>
  );
}
