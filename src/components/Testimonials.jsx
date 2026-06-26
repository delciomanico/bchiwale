import { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../data/siteData';

// ── Testimonials — single centered quote, rotates every 6s ──
export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % TESTIMONIALS.length);
        setFading(false);
      }, 400);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const item = TESTIMONIALS[active];

  return (
    <section
      className="section-tall border-t border-gray-mid bg-white"
      id="testemunhos"
      aria-labelledby="testimonials-title"
      aria-live="polite"
    >
      <div className="container">
        <p className="eyebrow-muted mb-16 md:mb-20 text-center">O QUE DIZEM OS CLIENTES</p>

        {/* Single quote — centered, display scale */}
        <div className="max-w-3xl mx-auto text-center">
          {/* Opening quotation mark */}
          <span
            className="block font-heading font-extrabold text-cyan leading-none select-none mb-6"
            style={{ fontSize: '5rem', opacity: 0.12 }}
            aria-hidden="true"
          >
            "
          </span>

          {/* Quote text */}
          <blockquote
            className="transition-opacity duration-400"
            style={{ opacity: fading ? 0 : 1 }}
          >
            <p
              className="font-heading font-bold text-charcoal leading-snug
                         tracking-[-0.02em] mb-10"
              style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)' }}
              id="testimonials-title"
            >
              {/* Strip outer quotes from the data string */}
              {item.text.replace(/^"|"$/g, '')}
            </p>

            {/* Thin cyan accent line */}
            <div
              className="w-10 h-px bg-cyan mx-auto mb-8"
              aria-hidden="true"
            />

            <cite className="not-italic">
              <span className="block font-body font-semibold text-charcoal text-sm mb-1">
                {item.name}
              </span>
              <span className="block font-mono text-[11px] text-charcoal/40 tracking-widest3 uppercase">
                {item.meta}
              </span>
            </cite>
          </blockquote>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-3 mt-12" aria-label="Testemunhos — indicadores">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setFading(true);
                  setTimeout(() => { setActive(i); setFading(false); }, 400);
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? 'w-5 h-1.5 bg-cyan'
                    : 'w-1.5 h-1.5 bg-charcoal/20 hover:bg-charcoal/40'
                }`}
                aria-label={`Ver testemunho ${i + 1}`}
                aria-current={i === active ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
