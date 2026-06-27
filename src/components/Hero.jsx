import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    id: 1,
    src: 'https://bchiwale.ao/wp-content/uploads/2025/04/bannerchiwale1.webp',
    alt: 'Paisagem geológica angolana',
    line1: 'A terra fala.',
    line2: 'Nós lemos.',
    primary:   { label: 'Os Nossos Serviços', href: '/servicos' },
    secondary: { label: 'Contacto',           href: '/contacto' },
  },
  {
    id: 2,
    src: 'https://bchiwale.ao/wp-content/uploads/2025/04/bannerchiwale2.webp',
    alt: 'Formação rochosa — Angola',
    line1: 'Do subsolo à',
    line2: 'superfície.',
    primary:   { label: 'Geologia & Geofísica', href: '/servicos' },
    secondary: { label: 'Ver Portfólio',         href: '/portfolio' },
  },
  {
    id: 3,
    src: 'https://bchiwale.ao/wp-content/uploads/2025/04/bannerchiwale3.webp',
    alt: 'Vista aérea — terreno angolano',
    line1: 'Angola vista',
    line2: 'de perto.',
    primary:   { label: 'Topografia & Geotecnia', href: '/servicos' },
    secondary: { label: 'Ver Portfólio',           href: '/portfolio' },
  },
  {
    id: 4,
    src: 'https://bchiwale.ao/wp-content/uploads/2025/04/bannerchiwale1.webp',
    alt: 'Território angolano',
    line1: 'Rigor técnico.',
    line2: 'Raízes locais.',
    primary:   { label: 'Sobre Nós', href: '/sobre' },
    secondary: { label: 'Contacto',  href: '/contacto' },
  },
  {
    id: 5,
    src: 'https://bchiwale.ao/wp-content/uploads/2025/04/bannerchiwale3.webp',
    alt: 'Levantamento de campo — Angola',
    line1: '50+ projectos.',
    line2: '18 províncias.',
    primary:   { label: 'Ver Portfólio',      href: '/portfolio' },
    secondary: { label: 'Solicitar Proposta', href: '/contacto' },
  },
];

const SLIDE_INTERVAL = 9500;
const FADE_MS        = 2200;
const CONTENT_OUT_MS = 320;
const CHAR_MS        = 78;
const LINE_PAUSE_MS  = 260;
const CTA_DELAY_MS   = 320;

function Cursor() {
  return (
    <span
      aria-hidden="true"
      style={{
        display:         'inline-block',
        width:           '2px',
        height:          '0.82em',
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginLeft:      '4px',
        verticalAlign:   'text-bottom',
        animation:       'cursorBlink 1s step-end infinite',
      }}
    />
  );
}

export default function Hero() {
  const [current,        setCurrent]        = useState(0);
  const [contentVisible, setContentVisible] = useState(true);
  const [typed,          setTyped]          = useState({ line1: '', line2: '' });
  const [typingDone,     setTypingDone]     = useState(false);
  const [showCtas,       setShowCtas]       = useState(false);

  // Start typing sequence whenever the active slide changes
  useEffect(() => {
    const s = SLIDES[current];
    setTyped({ line1: '', line2: '' });
    setTypingDone(false);
    setShowCtas(false);

    const ids = [];
    const later = (fn, ms) => { const id = setTimeout(fn, ms); ids.push(id); return id; };

    // Type line1 char by char
    s.line1.split('').forEach((_, i) => {
      later(() => setTyped({ line1: s.line1.slice(0, i + 1), line2: '' }), i * CHAR_MS);
    });

    const line2Start = s.line1.length * CHAR_MS + LINE_PAUSE_MS;

    // Type line2 char by char
    s.line2.split('').forEach((_, i) => {
      later(
        () => setTyped({ line1: s.line1, line2: s.line2.slice(0, i + 1) }),
        line2Start + i * CHAR_MS,
      );
    });

    const doneAt = line2Start + s.line2.length * CHAR_MS;
    later(() => setTypingDone(true), doneAt);
    later(() => setShowCtas(true),   doneAt + CTA_DELAY_MS);

    return () => ids.forEach(clearTimeout);
  }, [current]);

  const goTo = useCallback((index) => {
    setContentVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setContentVisible(true);
    }, CONTENT_OUT_MS);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setContentVisible(false);
      setTimeout(() => {
        setCurrent((i) => (i + 1) % SLIDES.length);
        setContentVisible(true);
      }, CONTENT_OUT_MS);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <section
      className="relative h-screen min-h-[600px] overflow-hidden flex flex-col"
      style={{ backgroundColor: '#030d1c' }}
      aria-label="Hero — B-CHIWALE Geociências"
    >

      {/* ── Photo slideshow ──────────────────────────────────────────── */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0"
          style={{
            opacity:    i === current ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
            zIndex:     i === current ? 1 : 0,
          }}
          aria-hidden={i !== current}
        >
          <img
            src={s.src}
            alt={s.alt}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* ── Gradient overlay ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            'linear-gradient(to bottom, rgba(3, 13, 28, 0.76) 0%, rgba(3,13,28,0.32) 35%, rgba(3,13,28,0.62) 62%, rgba(3,13,28,0.93) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Content anchored to the bottom ───────────────────────────── */}
      <div
        className="relative flex-1 flex flex-col justify-end"
        style={{ zIndex: 3, paddingBottom: '2.5rem' }}
      >
        <div className="container">

          <div
            className="max-w-2xl mb-8"
            style={{
              opacity:    contentVisible ? 1 : 0,
              transition: `opacity ${CONTENT_OUT_MS}ms ease`,
            }}
          >
            {/* Headline — typed character by character */}
            <h1
              className="font-heading text-white"
              style={{
                fontSize:      'clamp(2.4rem, 5vw, 4.6rem)',
                fontWeight:    300,
                letterSpacing: '-0.035em',
                lineHeight:    1.07,
                marginBottom:  '2rem',
                minHeight:     '2.2em', // prevents layout shift while typing
              }}
            >
              {typed.line1}
              {!typingDone && !typed.line2 && <Cursor />}
              {typed.line1 && <br />}
              {typed.line2}
              {!typingDone && typed.line2 && <Cursor />}
            </h1>

            {/* Divider + CTAs — appear after typing finishes */}
            <div
              style={{
                opacity:    showCtas ? 1 : 0,
                transform:  showCtas ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}
            >
              <div
                style={{ width: '36px', height: '1px', backgroundColor: 'rgba(255,255,255,0.18)', marginBottom: '2rem' }}
              />

              <div className="flex flex-wrap items-center gap-8">
                <Link
                  to={slide.primary.href}
                  className="font-body text-yellow"
                  style={{
                    fontSize:      '12px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    borderBottom:  '1px solid rgba(255,255,255,0.30)',
                    paddingBottom: '2px',
                    transition:    'border-color 0.4s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.80)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.30)')}
                >
                  {slide.primary.label}
                </Link>
                <Link
                  to={slide.secondary.href}
                  className="font-body"
                  style={{
                    fontSize:      '12px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color:         'rgba(255,255,255,0.35)',
                    transition:    'color 0.4s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                >
                  {slide.secondary.label}
                </Link>
              </div>
            </div>
          </div>

          {/* ── Slide dots ───────────────────────────────────────────── */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '16px' }}>
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Foto actual">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Foto ${i + 1}`}
                  onClick={() => goTo(i)}
                  style={{
                    width:           i === current ? '22px' : '4px',
                    height:          '2px',
                    backgroundColor: i === current ? 'rgba(255,255,255,0.58)' : 'rgba(255,255,255,0.16)',
                    borderRadius:    '1px',
                    border:          'none',
                    cursor:          'pointer',
                    padding:         0,
                    transition:      'width 0.5s ease, background-color 0.5s ease',
                  }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Scroll indicator — right edge ────────────────────────────── */}
      <div
        className="absolute right-8 hidden lg:flex flex-col items-center gap-3"
        style={{ zIndex: 3, top: '35%', transform: 'translateY(-50%)' }}
        aria-hidden="true"
      >
        <p
          className="font-mono text-white/18 uppercase"
          style={{ fontSize: '8px', letterSpacing: '0.2em', writingMode: 'vertical-lr' }}
        >
          Scroll
        </p>
        <div
          className="relative overflow-hidden"
          style={{ width: '1px', height: '60px', backgroundColor: 'rgba(255,255,255,0.08)' }}
        >
          <span
            style={{
              position:        'absolute',
              left:            0,
              right:           0,
              top:             0,
              height:          '22px',
              backgroundColor: 'rgba(255,255,255,0.28)',
              animation:       'scrollBar 2.8s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollBar {
          0%   { transform: translateY(-100%); opacity: 0; }
          18%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translateY(380%); opacity: 0; }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
      `}</style>

    </section>
  );
}
