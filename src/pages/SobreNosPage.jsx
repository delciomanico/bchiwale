import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { TEAM, STATS, MVV_CARDS, CERTIFICATIONS, ORG_CHART } from '../data/siteData';
import { useStatCounter } from '../hooks/useStatCounter';
import Timeline from '../components/Timeline';
import html2canvas from 'html2canvas';
import { usePageMeta } from '../hooks/usePageMeta';

// ── Internal hero ────────────────────────────────────────────────
function PageHero() {
  return (
    <section
      className="relative min-h-[calc(44vh+72px)] flex items-end pb-16"
      style={{
        borderBottom: '1px solid rgba(0,174,239,0.2)',
        paddingTop: '72px',
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/project-main.jpg)' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0" style={{ background: 'rgba(10,14,22,0.78)' }} aria-hidden="true" />
      <div className="relative z-10 container">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 font-mono text-xs text-white/40 tracking-widest3">
            <li><Link to="/" className="hover:text-cyan transition-colors">Home</Link></li>
            <li aria-hidden="true" className="text-white/20">/</li>
            <li className="text-white/60" aria-current="page">Sobre Nós</li>
          </ol>
        </nav>
        <h1 className="font-heading font-semibold text-white text-4xl md:text-5xl tracking-tight">
          Sobre a{' '}
          <em className="italic" style={{ color: '#00AEEF' }}>B-CHIWALE</em>
        </h1>
        <p className="font-body text-white/55 text-lg mt-4 max-w-xl leading-relaxed">
          Oito anos a mapear o subsolo angolano com rigor técnico e compromisso com o progresso sustentável.
        </p>
      </div>
    </section>
  );
}

// ── DG Message ──────────────────────────────────────────────────
function DGMessage() {
  return (
    <section className="section-pad bg-white" id="mensagem-dg" aria-labelledby="dg-title">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* DG portrait */}
          <div
            className="relative overflow-hidden"
            style={{ borderTop: '1px solid rgba(0,174,239,0.25)', minHeight: '380px' }}
          >
            <img
              src="/images/team/severino-escritorio.jpg"
              alt="Severino Chiwale, Director-Geral e Fundador da B-CHIWALE"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Quote */}
          <div>
            <p className="eyebrow">MENSAGEM DO DIRECTOR-GERAL</p>
            <h2 className="section-title mt-2 mb-6" id="dg-title">
              Angola merece <em>excelência.</em>
            </h2>
            <blockquote className="relative">
              <span
                className="font-heading font-semibold text-8xl text-cyan/10 leading-none absolute -top-4 -left-2 select-none"
                aria-hidden="true"
              >"</span>
              <p className="font-body text-charcoal italic text-lg leading-relaxed pt-6 pl-4 mb-4">
                "Quando fundámos a B-CHIWALE em 2017, tínhamos uma convicção firme: Angola precisa de empresas
                de geociências que combinem rigor técnico de classe mundial com conhecimento profundo do nosso
                território. Oito anos depois, continuamos a trabalhar com essa mesma convicção — tendo
                contribuído para projectos em todas as 21 províncias angolanas."
              </p>
              <p className="font-body text-charcoal italic text-lg leading-relaxed pl-4 mb-6">
                "A nossa riqueza mineral é imensa. Falta cartografá-la, quantificá-la e transformá-la em
                progresso sustentável. É isso que a B-CHIWALE faz — todos os dias, em campo."
              </p>
              <cite className="block pl-4 font-mono text-[10px] text-charcoal/35 tracking-[0.15em] not-italic uppercase">
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
  return (
    <section className="section-pad bg-white border-t border-charcoal/8" id="missao" aria-labelledby="mvv-title">
      <div className="container">
        <header className="text-center mb-12">
          <p className="eyebrow">MISSÃO, VISÃO E VALORES</p>
          <h2 className="section-title" id="mvv-title">O que nos <em>define.</em></h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MVV_CARDS.map((card, i) => (
            <div
              key={card.label}
              className="reveal bg-white p-8 border-l-2"
              style={{ borderLeftColor: card.accent, transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="font-mono text-[10px] tracking-[0.18em] uppercase mb-3"
                style={{ color: card.accent === '#F5C200' ? '#B8860B' : card.accent === '#1A1A2E' ? '#6B7280' : card.accent }}
              >
                {card.label}
              </div>
              <h3 className="font-heading font-semibold text-charcoal text-xl mb-4">{card.title}</h3>
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
    <div
      ref={ref}
      className="reveal flex flex-col items-center text-center px-6 py-10"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="font-heading font-light text-cyan text-5xl tracking-tight leading-none mb-3">
        {count}{suffix}
      </span>
      <span className="font-body text-white text-sm mt-2 mb-1">{label}</span>
      <span className="font-mono text-[10px] text-white/35 tracking-[0.15em] uppercase">{detail}</span>
    </div>
  );
}

function Numbers() {
  return (
    <section className="bg-charcoal border-t border-white/5" aria-label="Em números">
      <div className="container">
        <header className="text-center py-32">
          <p className="eyebrow" style={{ color: '#00AEEF' }}>EM NÚMEROS</p>
          <h2 className="font-heading font-semibold text-white text-3xl md:text-4xl tracking-tight mt-2">
            Resultados que <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>falam.</em>
          </h2>
        </header>
      </div>
    </section>
  );
}

// ── Organograma ──────────────────────────────────────────────────
// Cod. B.CH-001 · Revisão 00 · Data 03/07/2024

function OrgCard({ node }) {
  const hasName = Boolean(node.nome);
  return (
    <div
      className={`flex flex-col items-center text-center px-4 py-3 bg-white ${
        hasName ? 'border-t-2 border-t-cyan border-x border-b border-charcoal/10' : 'border border-dashed border-charcoal/20'
      }`}
      style={{ width: 190, minHeight: hasName ? 148 : 74 }}
    >
      {hasName && (
        node.photo ? (
          <img
            src={node.photo}
            alt={node.nome}
            className="rounded-full object-cover mb-2"
            style={{ width: 48, height: 48, outline: '1px solid rgba(26,26,46,0.08)', outlineOffset: 2 }}
          />
        ) : (
          <div
            className="rounded-full flex items-center justify-center mb-2 shrink-0"
            style={{ width: 48, height: 48, background: '#1A1A2E', border: '1px solid rgba(0,174,239,0.2)' }}
            aria-hidden="true"
          >
            <span className="font-heading font-semibold text-cyan text-xs">{node.iniciais}</span>
          </div>
        )
      )}
      {hasName && (
        <div className="font-heading font-semibold text-charcoal leading-tight text-[0.78rem] mb-1">
          {node.nome}
        </div>
      )}
      <div
        className={`font-mono tracking-[0.1em] uppercase leading-snug ${hasName ? '' : 'text-charcoal/45'}`}
        style={{ fontSize: '0.6rem', color: hasName ? '#00AEEF' : undefined }}
      >
        {node.cargo}
      </div>
    </div>
  );
}

function OrgTreeNode({ node }) {
  const children = node.subordinados || [];
  return (
    <li>
      <OrgCard node={node} />
      {children.length > 0 && (
        <ul>
          {children.map((child) => (
            <OrgTreeNode key={child.cargo} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

function OrgChart() {
  const [downloading, setDownloading] = useState(false);
  const sectionRef = useRef(null);

  const handleDownload = useCallback(async () => {
    if (!sectionRef.current || downloading) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(sectionRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });
      const link = document.createElement('a');
      link.download = 'organograma-bchiwale.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setDownloading(false);
    }
  }, [downloading]);

  return (
    <section ref={sectionRef} className="section-pad bg-white border-t border-charcoal/8" id="organograma" aria-labelledby="org-title">
      <div className="container">
        <header className="text-center mb-14">
          <p className="eyebrow">ESTRUTURA ORGANIZACIONAL</p>
          <h2 className="section-title" id="org-title">Organograma <em>Institucional</em></h2>
          <p className="section-subtitle mx-auto">Conselho de Administração B-CHIWALE · Cod. B.CH-001</p>
        </header>

        <div className="overflow-x-auto pb-2">
          <div className="org-tree min-w-fit mx-auto">
            <ul>
              <OrgTreeNode node={ORG_CHART} />
            </ul>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase
                       text-charcoal/40 hover:text-cyan transition-colors duration-300 disabled:opacity-40"
            aria-label="Baixar organigrama como imagem PNG"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 1v7M3.5 5.5 6 8l2.5-2.5M1 10h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {downloading ? 'A guardar…' : 'Baixar PNG'}
          </button>
        </div>
      </div>
    </section>
  );
}

function TeamModal({ member, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(10,14,22,0.80)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Perfil de ${member.name}`}
    >
      <div className="bg-white w-full max-w-lg overflow-y-auto" style={{ maxHeight: '90vh' }}>
        <div
          className="flex items-center gap-6 p-8"
          style={{ background: '#F7F7F7', borderBottom: '1px solid rgba(26,26,46,0.10)' }}
        >
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="rounded-full object-cover shrink-0"
              style={{ width: 120, height: 120, outline: '1px solid rgba(26,26,46,0.08)', outlineOffset: 3 }}
            />
          ) : (
            <div
              className="rounded-full shrink-0 flex items-center justify-center"
              style={{ width: 120, height: 120, background: '#1A1A2E', border: '1px solid rgba(0,174,239,0.2)' }}
            >
              <span className="font-heading font-semibold text-cyan text-3xl">{member.initials}</span>
            </div>
          )}
          <div>
            <h2 className="font-heading font-semibold text-charcoal text-xl leading-tight">{member.name}</h2>
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase mt-1.5 mb-2" style={{ color: '#00AEEF' }}>
              {member.role}
            </div>
            {member.yearsExp && (
              <div className="font-mono text-[10px] text-charcoal/40 tracking-[0.15em]">
                {member.yearsExp} anos de experiência
              </div>
            )}
          </div>
        </div>

        <div className="p-8 space-y-6">
          <p className="font-body text-charcoal/70 text-sm leading-relaxed">{member.bio}</p>

          {member.education && (
            <div>
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-charcoal/40 mb-2">FORMAÇÃO</p>
              <p className="font-body text-charcoal/70 text-sm">{member.education}</p>
            </div>
          )}

          {member.specialties && member.specialties.length > 0 && (
            <div>
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-charcoal/40 mb-3">ESPECIALIDADES</p>
              <ul className="space-y-2">
                {member.specialties.map((spec) => (
                  <li key={spec} className="flex items-center gap-2.5">
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: '#00AEEF' }}
                      aria-hidden="true"
                    />
                    <span className="font-body text-charcoal/70 text-sm">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {member.languages && member.languages.length > 0 && (
            <div>
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-charcoal/40 mb-2">IDIOMAS</p>
              <p className="font-body text-charcoal/70 text-sm">{member.languages.join(' · ')}</p>
            </div>
          )}
        </div>

        <div
          className="px-8 pb-8 flex items-center gap-4"
          style={{ borderTop: '1px solid rgba(26,26,46,0.08)', paddingTop: '1.5rem' }}
        >
          {member.linkedin && member.linkedin !== '#' && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              LinkedIn
            </a>
          )}
          <button
            onClick={onClose}
            className="font-mono text-[11px] tracking-[0.18em] uppercase text-charcoal/40 hover:text-charcoal transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

function TeamSection() {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section className="section-pad bg-white border-t border-charcoal/8" id="equipa" aria-labelledby="team-sobre-title">
      <div className="container">
        <header className="text-center mb-12">
          <p className="eyebrow">AS PESSOAS POR DETRÁS DO RIGOR</p>
          <h2 className="section-title" id="team-sobre-title">A nossa <em>Equipa</em></h2>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {TEAM.map((member, i) => (
            <article
              key={member.initials}
              className="reveal bg-white flex overflow-hidden
                         transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)]"
              style={{ transitionDelay: `${i * 80}ms` }}
              role="listitem"
            >
              <div className="relative shrink-0 overflow-hidden" style={{ width: '38%' }}>
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full bg-charcoal flex items-center justify-center">
                    <span className="font-heading font-semibold text-cyan text-3xl">{member.initials}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-baseline justify-between gap-2 mb-3">
                  <h3 className="font-heading font-semibold text-charcoal leading-tight" style={{ fontSize: '0.9rem' }}>
                    {member.name}
                  </h3>
                  <span className="font-mono text-charcoal/30 shrink-0" style={{ fontSize: '10px' }}>{member.role}</span>
                </div>
                <p className="font-body text-charcoal/50 leading-relaxed flex-1" style={{ fontSize: '0.78rem' }}>{member.bio}</p>
                <div className="mt-4 pt-3 border-t border-charcoal/8">
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="font-mono text-[11px] text-charcoal/35 hover:text-cyan transition-colors"
                  >
                    Ver perfil →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      {selectedMember && (
        <TeamModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </section>
  );
}

// ── Certifications marquee ────────────────────────────────────────
function CertBadge() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 1.5l2.12 4.3 4.74.69-3.43 3.34.81 4.72L10 12.27l-4.24 2.28.81-4.72L3.14 6.49l4.74-.69L10 1.5z"
        stroke="#00AEEF" strokeWidth="1.2" strokeLinejoin="round"
        fill="none"
      />
      <path d="M7.5 10l1.8 1.8 3-3.6" stroke="#00AEEF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Certifications() {
  const track = [...CERTIFICATIONS, ...CERTIFICATIONS, ...CERTIFICATIONS];

  return (
    <section
      className="bg-white border-t border-charcoal/8 border-b border-charcoal/8"
      id="certificacoes"
      aria-labelledby="cert-title"
    >
      {/* Header */}
      <div className="container py-16 text-center">
        <p className="eyebrow">QUALIDADE E CONFORMIDADE</p>
        <h2 className="section-title" id="cert-title">
          As nossas <em>Certificações</em>
        </h2>
      </div>

      {/* Marquee strip */}
      <div
        className="overflow-hidden border-t border-charcoal/6 py-8"
        aria-label="Certificações em marquee"
        onMouseEnter={e => e.currentTarget.querySelector('.cert-track').style.animationPlayState = 'paused'}
        onMouseLeave={e => e.currentTarget.querySelector('.cert-track').style.animationPlayState = 'running'}
      >
        <div
          className="cert-track flex items-center"
          style={{
            width: 'max-content',
            animation: 'certScroll 28s linear infinite',
          }}
        >
          {track.map((cert, i) => (
            <div key={i} className="flex items-center shrink-0">
              {/* Item */}
              <div className="flex items-center gap-4 px-14">
                {cert.logo ? (
                  <img src={cert.logo} alt={`Logótipo ${cert.code}`} className="w-9 h-9 object-contain" />
                ) : (
                  <CertBadge />
                )}
                <div>
                  <div className="font-heading font-semibold text-charcoal tracking-tight" style={{ fontSize: '1rem', lineHeight: 1.2 }}>
                    {cert.code}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.16em] uppercase mt-0.5" style={{ color: 'rgba(26,26,46,0.38)' }}>
                    {cert.label}
                  </div>
                </div>
              </div>
              {/* Hairline separator */}
              <div className="w-px h-6 bg-charcoal/10 shrink-0" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes certScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cert-track { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────
export default function SobreNosPage() {
  usePageMeta(
    'Sobre Nós — História, Equipa e Certificações',
    'Conheça a B-CHIWALE: fundada em 2017, certificada ISO 9001 e ISO 45001, com mais de 100 profissionais em geociências e 21 províncias de actuação em Angola.',
    'https://bchiwale.ao/sobre-nos'
  );
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
      <section className="py-20 text-center bg-charcoal border-t border-white/5">
        <div className="container">
          <p className="eyebrow" style={{ color: '#00AEEF' }}>PRÓXIMO PASSO</p>
          <h2 className="font-heading font-semibold text-white text-3xl md:text-4xl tracking-tight mt-2 mb-6">
            Conheça os nossos <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>serviços.</em>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/servicos"
              className="font-body font-medium text-white border-b border-white
                         hover:text-cyan hover:border-cyan transition-colors pb-0.5 text-[15px]"
            >
              Ver serviços <span aria-hidden="true">↗</span>
            </Link>
            <Link
              to="/contacto"
              className="font-mono text-[13px] text-white/40 hover:text-white transition-colors tracking-wide"
            >
              Contactar-nos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
