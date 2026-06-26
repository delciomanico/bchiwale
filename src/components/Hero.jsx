import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HERO_SLIDES } from '../data/siteData';

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Carousel — swap slide every 5 seconds, respect reduced motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero — B-CHIWALE"
    >
      {/* Background carousel */}
      <div className="absolute inset-0" aria-hidden="true">
        {HERO_SLIDES.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1200
                        ${i === activeSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url('${src}')` }}
          />
        ))}
        {/* Gradient overlay — left heavy, subtle enough to let photo breathe */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, rgba(10,20,40,0.88) 40%, rgba(10,20,40,0.45) 100%)',
          }}
        />
      </div>

      {/* Hero content — fades up on mount */}
      <div className="container relative z-10 pt-28 pb-20 md:pt-32 md:pb-28 animate-fade-up">
        <div className="max-w-[580px]">

        

          {/* Headline — softer size, bold (not extrabold) */}
          <h1
            className="font-heading font-bold text-white leading-[1.08] tracking-tight mb-5"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
          >
            O subsolo de Angola<br />
            tem muito a{' '}
            <em className="not-italic font-extrabold italic" style={{ color: '#F5C200' }}>
              revelar.
            </em>
          </h1>

          {/* Subheadline */}
          <p className="font-heading font-medium text-white/80 text-lg md:text-xl mb-5 tracking-tight">
            Somos quem o lê.
          </p>

          {/* Description */}
          <p className="font-body text-white/60 text-sm md:text-base leading-relaxed mb-10 max-w-[460px]">
            Desde 2017, a B-CHIWALE combina rigor técnico com conhecimento
            profundo do território angolano — em Geologia, Geofísica,
            Geotecnia, Topografia e Ambiente.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link to="/servicos" className="btn-primary rounded-sm">
              VER SERVIÇOS <span aria-hidden="true">→</span>
            </Link>
            <Link to="/contacto" className="btn-ghost rounded-sm">
              SOLICITAR PROPOSTA
            </Link>
          </div>
        </div>
      </div>

      {/* Coordinates — bottom left */}
      <div className="absolute bottom-10 left-0 right-0 z-10" aria-hidden="true">
        <div className="container">
          <span className="font-mono text-[10px] text-white/35 tracking-widest3">
            8°49′55″S · 13°15′56″E · Luanda, Angola
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        role="presentation"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest2">Scroll</span>
        <div className="w-px h-7 bg-white/15 relative overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-3 bg-white/40 animate-scroll-bounce" />
        </div>
      </div>

      {/* Slide dot indicators */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2" aria-hidden="true">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`w-px rounded-full transition-all duration-500
                        ${i === activeSlide ? 'h-8 bg-cyan' : 'h-3 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
}
