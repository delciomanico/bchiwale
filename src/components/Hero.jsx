import { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { MINERALS } from '../data/minerals';

// Lazy-load the heavy Three.js/R3F canvas — splits ~1MB of 3D deps into a separate chunk
const MineralCarousel = lazy(() => import('./MineralCarousel'));

// Cycles through mineral names in sync with the carousel (same 4.5s interval)
function AnimatedMineralName() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % MINERALS.length);
        setVisible(true);
      }, 400);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <span
      className="inline-block transition-all duration-400 font-extrabold italic"
      style={{
        color: MINERALS[index].accentColor,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-8px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease, color 0.6s ease',
      }}
    >
      {MINERALS[index].label}
    </span>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Slight delay so fade-in feels intentional, not a flash
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-screen flex"
      style={{ backgroundColor: '#060d18' }}
      aria-label="Hero — B-CHIWALE"
    >
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,174,239,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,174,239,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow — left centre */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          left: '10%',
          top: '40%',
          width: '500px',
          height: '500px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(0,174,239,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="container flex-1 flex">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_460px] xl:grid-cols-[1fr_520px] gap-0">

          {/* ── LEFT: Content ────────────────────────────────────────────── */}
          <div
            className="flex flex-col justify-center py-32 lg:py-24 xl:py-0 pr-0 lg:pr-12 xl:pr-16 relative z-10"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
            }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-px bg-cyan" />
              <p className="font-mono text-cyan/70 tracking-widest3 uppercase" style={{ fontSize: '11px' }}>
                Geociências · Angola · Desde 2017
              </p>
            </div>

            {/* Headline */}
            <h1
              className="font-heading font-bold text-white leading-[1.05] tracking-[-0.03em] mb-6"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)' }}
            >
              O subsolo de Angola
              <br />
              revela{' '}
              <AnimatedMineralName />
              <span className="text-white">.</span>
            </h1>

            {/* Sub-headline */}
            <p
              className="font-heading font-medium text-white/55 mb-5"
              style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', letterSpacing: '-0.01em' }}
            >
              Somos quem o lê.
            </p>

            {/* Description */}
            <p
              className="font-body text-white/45 leading-[1.85] mb-10 max-w-[420px]"
              style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}
            >
              Combinamos rigor técnico internacional com conhecimento profundo
              do território angolano — em Geologia, Geofísica, Geotecnia,
              Topografia e Ambiente.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-16">
              <Link
                to="/servicos"
                className="inline-flex items-center gap-2 font-body font-semibold text-white
                           border border-white/20 hover:border-cyan hover:text-cyan
                           transition-all duration-300"
                style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '12px 24px' }}
              >
                Ver Serviços <span aria-hidden="true">→</span>
              </Link>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 font-body font-semibold text-charcoal
                           hover:bg-[#009ed8] transition-all duration-300"
                style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '12px 24px', backgroundColor: '#00AEEF' }}
              >
                Solicitar Proposta
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 border-t border-white/8 pt-8">
              {[
                { value: '50+', label: 'Projectos' },
                { value: '100+', label: 'Profissionais' },
                { value: '18', label: 'Províncias' },
                { value: '8+', label: 'Anos' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span
                    className="font-heading font-extrabold text-white"
                    style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', letterSpacing: '-0.02em' }}
                  >
                    {s.value}
                  </span>
                  <span className="font-mono text-white/30 uppercase tracking-widest3" style={{ fontSize: '10px' }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Coordinates */}
            <p
              className="absolute bottom-8 left-0 font-mono text-white/18 tracking-widest3"
              style={{ fontSize: '10px' }}
              aria-hidden="true"
            >
              8°49′55″S · 13°15′56″E · Luanda, Angola
            </p>
          </div>

          {/* ── RIGHT: 3D Mineral Carousel ───────────────────────────────── */}
          <div
            className="relative h-72 lg:h-auto"
            style={{
              minHeight: '320px',
              opacity: mounted ? 1 : 0,
              transition: 'opacity 1.2s ease 0.4s',
            }}
          >
            <Suspense fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 h-12 bg-cyan/20 rounded-full animate-pulse" />
              </div>
            }>
              <MineralCarousel />
            </Suspense>

            {/* Left-edge fade — blends canvas into the dark content area */}
            <div
              className="absolute inset-y-0 left-0 w-12 pointer-events-none hidden lg:block"
              style={{ background: 'linear-gradient(to right, #060d18, transparent)' }}
              aria-hidden="true"
            />
          </div>

        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-white/20 uppercase tracking-widest2" style={{ fontSize: '9px' }}>Scroll</span>
        <div className="w-px h-8 bg-white/10 relative overflow-hidden">
          <span
            className="absolute inset-x-0 top-0 h-4 bg-white/40"
            style={{ animation: 'scrollBounce 2s ease-in-out infinite' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(16px); }
        }
      `}</style>
    </section>
  );
}
