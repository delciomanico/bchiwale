import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { TEAM, STATS } from '../data/siteData';
import { useStatCounter } from '../hooks/useStatCounter';
import Timeline from '../components/Timeline';
import html2canvas from 'html2canvas';

// ── Internal hero ────────────────────────────────────────────────
function PageHero() {
  return (
    <section
      className="min-h-[calc(44vh+72px)] flex items-end pb-16"
      style={{
        background: 'linear-gradient(135deg, #1A1A2E 60%, #0d1829 100%)',
        borderBottom: '1px solid rgba(0,174,239,0.2)',
        paddingTop: '72px',
      }}
    >
      <div className="container">
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
          {/* DG portrait placeholder */}
          <div
            className="relative flex flex-col items-center justify-center text-center p-12"
            style={{ background: '#0d1829', borderTop: '1px solid rgba(0,174,239,0.25)', minHeight: '380px' }}
            aria-hidden="true"
          >
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 24px, rgba(0,174,239,0.03) 24px, rgba(0,174,239,0.03) 25px)'
            }} />
            <div
              className="relative z-10 w-28 h-28 rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: '#1A1A2E', border: '1px solid rgba(0,174,239,0.2)' }}
            >
              <span className="font-heading font-semibold text-white text-3xl tracking-tight">SC</span>
            </div>
            <div className="relative z-10 font-heading font-semibold text-white text-lg mb-1">Severino Chiwale</div>
            <div className="relative z-10 font-mono text-[10px] text-cyan tracking-[0.18em] uppercase mt-1">
              Director-Geral &amp; Fundador
            </div>
            <div className="relative z-10 font-mono text-[10px] text-white/25 tracking-[0.15em] mt-3">
              B-CHIWALE · EST. 2017
            </div>
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
                contribuído para projectos em todas as 18 províncias angolanas."
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
  const cards = [
    { label: 'Missão', title: 'Excelência Técnica', text: 'Prestar serviços de excelência em geologia e engenharia geotécnica, transformando recursos minerais em progresso sustentável para Angola.', accent: '#00AEEF' },
    { label: 'Visão', title: 'Liderança Africana', text: 'Ser a empresa de referência em consultoria geológica e mineração em África, reconhecida pela excelência técnica e compromisso com a sustentabilidade.', accent: '#F5C200' },
    { label: 'Valores', title: 'Princípios', text: 'Excelência técnica · Inovação contínua · Sustentabilidade · Integridade · Responsabilidade social', accent: '#1A1A2E' },
  ];
  return (
    <section className="section-pad bg-white border-t border-charcoal/8" id="missao" aria-labelledby="mvv-title">
      <div className="container">
        <header className="text-center mb-12">
          <p className="eyebrow">MISSÃO, VISÃO E VALORES</p>
          <h2 className="section-title" id="mvv-title">O que nos <em>define.</em></h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
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
        <header className="text-center pt-16 pb-4">
          <p className="eyebrow" style={{ color: '#00AEEF' }}>EM NÚMEROS</p>
          <h2 className="font-heading font-semibold text-white text-3xl md:text-4xl tracking-tight mt-2">
            Resultados que <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>falam.</em>
          </h2>
        </header>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-white/8 mt-8">
          {STATS.map((stat, i) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              detail={stat.detail}
              delay={i * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Organograma ──────────────────────────────────────────────────

function OrgNode({ member, size = 'sm' }) {
  const dim = size === 'lg' ? 88 : 56;
  return (
    <div className="flex flex-col items-center text-center" style={{ width: size === 'lg' ? 140 : 110 }}>
      <img
        src={member.photo}
        alt={member.name}
        className="rounded-full object-cover mb-2.5"
        style={{ width: dim, height: dim, outline: '1px solid rgba(26,26,46,0.08)', outlineOffset: 2 }}
      />
      <div
        className="font-heading font-semibold text-charcoal leading-tight"
        style={{ fontSize: size === 'lg' ? '0.8rem' : '0.68rem' }}
      >
        {member.name}
      </div>
      <div
        className="font-mono tracking-[0.13em] uppercase mt-0.5"
        style={{ fontSize: '0.58rem', color: '#00AEEF' }}
      >
        {member.role}
      </div>
    </div>
  );
}

function OrgModal({ onClose }) {
  const contentRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  const handleDownload = useCallback(async () => {
    if (!contentRef.current || downloading) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(contentRef.current, {
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

  const dg        = TEAM[0];
  const directors = TEAM.slice(1, 6);
  const staff     = TEAM.slice(6);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto"
      style={{ background: 'rgba(10,14,22,0.80)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={contentRef}
        className="relative bg-white w-full max-w-5xl mx-4 my-10 pb-12 pt-10 px-10"
        role="dialog"
        aria-modal="true"
        aria-label="Organograma completo"
      >
        {/* Actions row */}
        <div className="absolute top-5 right-6 flex items-center gap-4">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase
                       text-charcoal/40 hover:text-cyan transition-colors disabled:opacity-40"
            aria-label="Baixar organigrama como imagem"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 1v7M3.5 5.5 6 8l2.5-2.5M1 10h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {downloading ? 'A guardar…' : 'Baixar PNG'}
          </button>
          <button
            onClick={onClose}
            className="font-mono text-[10px] tracking-[0.18em] uppercase text-charcoal/40 hover:text-charcoal transition-colors"
            aria-label="Fechar organigrama"
          >
            Fechar ×
          </button>
        </div>

        <p className="eyebrow text-center mb-1">ESTRUTURA ORGANIZACIONAL</p>
        <h2 className="section-title text-center mb-12">Organograma <em>Completo</em></h2>

        {/* ── Level 1: DG ── */}
        <div className="flex justify-center mb-0">
          <div className="flex flex-col items-center">
            <img src={dg.photo} alt={dg.name}
              className="rounded-full object-cover mb-3"
              style={{ width: 96, height: 96, outline: '1px solid rgba(26,26,46,0.08)', outlineOffset: 3 }}
            />
            <div className="font-heading font-semibold text-charcoal text-sm text-center leading-snug">{dg.name}</div>
            <div className="font-mono text-[9px] tracking-[0.15em] uppercase mt-0.5 mb-3" style={{ color: '#00AEEF' }}>{dg.role}</div>
            <p className="font-body text-gray-text text-xs leading-relaxed text-center max-w-[200px]">{dg.bio}</p>
          </div>
        </div>

        {/* Stem */}
        <div className="flex justify-center" aria-hidden="true">
          <div className="w-px bg-charcoal/10" style={{ height: 40 }} />
        </div>

        {/* Horizontal bar */}
        <div className="relative" aria-hidden="true" style={{ height: 1 }}>
          <div className="absolute bg-charcoal/10" style={{ height: 1, left: '10%', right: '10%' }} />
        </div>

        {/* Stems down to directors */}
        <div className="relative" aria-hidden="true" style={{ height: 32 }}>
          {directors.map((_, i) => (
            <div key={i} className="absolute w-px bg-charcoal/10"
              style={{ left: `${10 + i * 16}%`, top: 0, bottom: 0 }}
            />
          ))}
        </div>

        {/* ── Level 2: Directors ── */}
        <div className="grid grid-cols-5 gap-4 mb-10">
          {directors.map((m) => (
            <div key={m.initials} className="flex flex-col items-center text-center">
              <img src={m.photo} alt={m.name}
                className="rounded-full object-cover mb-3"
                style={{ width: 72, height: 72, outline: '1px solid rgba(26,26,46,0.08)', outlineOffset: 2 }}
              />
              <div className="font-heading font-semibold text-charcoal leading-tight" style={{ fontSize: '0.72rem' }}>{m.name}</div>
              <div className="font-mono text-[9px] tracking-[0.13em] uppercase mt-0.5 mb-2" style={{ color: '#00AEEF' }}>{m.role}</div>
              <p className="font-body text-gray-text leading-relaxed" style={{ fontSize: '0.65rem' }}>{m.bio}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-charcoal/8 mb-8" aria-hidden="true" />

        {/* ── Level 3: Staff ── */}
        <div className="flex justify-center gap-12">
          {staff.map((m) => (
            <div key={m.initials} className="flex flex-col items-center text-center max-w-[180px]">
              <img src={m.photo} alt={m.name}
                className="rounded-full object-cover mb-3"
                style={{ width: 64, height: 64, outline: '1px solid rgba(26,26,46,0.08)', outlineOffset: 2 }}
              />
              <div className="font-heading font-semibold text-charcoal leading-tight" style={{ fontSize: '0.72rem' }}>{m.name}</div>
              <div className="font-mono text-[9px] tracking-[0.13em] uppercase mt-0.5 mb-2" style={{ color: '#00AEEF' }}>{m.role}</div>
              <p className="font-body text-gray-text leading-relaxed" style={{ fontSize: '0.65rem' }}>{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OrgChart() {
  const [modalOpen, setModalOpen] = useState(false);
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

  const dg        = TEAM[0];
  const directors = TEAM.slice(1, 6);
  const staff     = TEAM.slice(6);

  return (
    <>
      <section ref={sectionRef} className="section-pad bg-white border-t border-charcoal/8" id="organograma" aria-labelledby="org-title">
        <div className="container">
          <header className="text-center mb-14">
            <p className="eyebrow">ESTRUTURA ORGANIZACIONAL</p>
            <h2 className="section-title" id="org-title">Organograma <em>Institucional</em></h2>
          </header>

          {/* ── Level 1: DG ── */}
          <div className="flex flex-col items-center">
            <OrgNode member={dg} size="lg" />
            <div className="w-px bg-charcoal/10 mt-3" style={{ height: 36 }} aria-hidden="true" />
          </div>

          {/* ── Horizontal bar ── */}
          <div className="relative mx-auto" style={{ maxWidth: 820 }} aria-hidden="true">
            <div className="absolute bg-charcoal/10" style={{ height: 1, top: 0, left: '9%', right: '9%' }} />
            {/* Stems down from bar */}
            <div className="relative" style={{ height: 32 }}>
              {directors.map((_, i) => (
                <div key={i} className="absolute w-px bg-charcoal/10"
                  style={{ left: `${9 + i * 18.25}%`, top: 0, bottom: 0 }}
                />
              ))}
            </div>
          </div>

          {/* ── Level 2: Directors ── */}
          <div className="flex justify-center">
            <div className="grid grid-cols-5 gap-4" style={{ maxWidth: 820 }}>
              {directors.map((m) => (
                <div key={m.initials} className="flex justify-center">
                  <OrgNode member={m} />
                </div>
              ))}
            </div>
          </div>

          {/* ── Level 3: Staff (compact indicator) ── */}
          <div className="flex justify-center mt-8 gap-8">
            {staff.map((m) => (
              <div key={m.initials} className="flex items-center gap-2.5 opacity-60">
                <img src={m.photo} alt={m.name}
                  className="rounded-full object-cover"
                  style={{ width: 36, height: 36 }}
                />
                <div>
                  <div className="font-heading font-semibold text-charcoal" style={{ fontSize: '0.65rem' }}>{m.name}</div>
                  <div className="font-mono tracking-[0.12em] uppercase" style={{ fontSize: '0.55rem', color: '#00AEEF' }}>{m.role}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions row */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-charcoal/40
                         hover:text-charcoal transition-colors duration-300 border-b border-charcoal/20 hover:border-charcoal pb-0.5"
            >
              Ver organigrama completo
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 2h8v8M10 2 2 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>

            <span className="w-px h-4 bg-charcoal/15" aria-hidden="true" />

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

      {modalOpen && <OrgModal onClose={() => setModalOpen(false)} />}
    </>
  );
}

// ── Team section ─────────────────────────────────────────────────
function TeamSection() {
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
              {/* Photo / initials */}
              <div className="relative shrink-0 overflow-hidden" style={{ width: '38%' }}>
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full bg-charcoal flex items-center justify-center">
                    <span className="font-heading font-semibold text-cyan text-3xl">{member.initials}</span>
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-baseline justify-between gap-2 mb-3">
                  <h3 className="font-heading font-semibold text-charcoal leading-tight" style={{ fontSize: '0.9rem' }}>
                    {member.name}
                  </h3>
                  <span className="font-mono text-charcoal/30 shrink-0" style={{ fontSize: '10px' }}>{member.role}</span>
                </div>
                <p className="font-body text-charcoal/50 leading-relaxed flex-1" style={{ fontSize: '0.78rem' }}>{member.bio}</p>
                <div className="mt-4 pt-3 border-t border-charcoal/8">
                  <a
                    href={member.linkedin}
                    className="font-mono text-[11px] text-charcoal/35 hover:text-cyan transition-colors"
                  >
                    Ver perfil →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
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
  const certs = [
    { code: 'ISO 9001',   label: 'Gestão da Qualidade',       year: '2019' },
    { code: 'ISO 45001',  label: 'Saúde e Segurança',         year: '2019' },
    { code: 'ABNT',       label: 'Normas Técnicas',           year: '2020' },
    { code: 'JORC',       label: 'Recursos Minerais',         year: '2021' },
    { code: 'NI 43-101',  label: 'Divulgação Mineral',        year: '2021' },
  ];

  // Duplicate 3× for a seamless infinite loop at any screen width
  const track = [...certs, ...certs, ...certs];

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
                <CertBadge />
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
