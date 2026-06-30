import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';

/* ── Icons ─────────────────────────────────────────────────────────── */

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '26px', height: '26px', marginLeft: '3px' }}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '26px', height: '26px' }}>
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '15px', height: '15px' }}>
      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
    </svg>
  );
}

function CollapseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '15px', height: '15px' }}>
      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
    </svg>
  );
}

/* ── Video player ───────────────────────────────────────────────────── */

function VideoPlayer() {
  const videoRef   = useRef(null);
  const wrapperRef = useRef(null);
  const { t } = useLang();
  const [playing,      setPlaying]      = useState(false);
  const [started,      setStarted]      = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Keep fullscreen state in sync with browser events
  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange',       onChange);
    document.addEventListener('webkitfullscreenchange', onChange);
    return () => {
      document.removeEventListener('fullscreenchange',       onChange);
      document.removeEventListener('webkitfullscreenchange', onChange);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
      setStarted(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }, []);

  const toggleFullscreen = useCallback((e) => {
    e.stopPropagation();
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      const el = wrapperRef.current;
      el?.requestFullscreen?.() ?? el?.webkitRequestFullscreen?.();
    }
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full overflow-hidden bg-charcoal"
      style={{ aspectRatio: '16/9', borderRadius: '2px' }}
    >
      <video
        ref={videoRef}
        src="/about-video.mp4"
        playsInline
        onEnded={() => { setPlaying(false); setStarted(false); }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      {/* Click-to-play overlay */}
      <div
        onClick={togglePlay}
        role="button"
        aria-label={playing ? t('about.pause') : t('about.play')}
        style={{
          position:       'absolute',
          inset:          0,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          cursor:         'pointer',
          background:     started && playing
            ? 'transparent'
            : 'linear-gradient(to bottom, rgba(3,13,28,0.25) 0%, rgba(3,13,28,0.60) 100%)',
          transition: 'background 0.4s ease',
        }}
      >
        <div
          style={{
            width:           '64px',
            height:          '64px',
            borderRadius:    '50%',
            backgroundColor: 'rgba(255,255,255,0.11)',
            backdropFilter:  'blur(6px)',
            border:          '1px solid rgba(255,255,255,0.20)',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            color:           '#fff',
            opacity:         started && playing ? 0 : 1,
            transform:       started && playing ? 'scale(0.8)' : 'scale(1)',
            transition:      'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </div>
      </div>

      {/* Fullscreen toggle — bottom-right */}
      <button
        onClick={toggleFullscreen}
        aria-label={isFullscreen ? t('about.exit_fullscreen') : t('about.fullscreen')}
        style={{
          position:        'absolute',
          bottom:          '10px',
          right:           '10px',
          width:           '32px',
          height:          '32px',
          borderRadius:    '3px',
          backgroundColor: 'rgba(3,13,28,0.55)',
          backdropFilter:  'blur(4px)',
          border:          '1px solid rgba(255,255,255,0.14)',
          color:           'rgba(255,255,255,0.70)',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          cursor:          'pointer',
          zIndex:          2,
          transition:      'background-color 0.2s, color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(3,13,28,0.85)';
          e.currentTarget.style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(3,13,28,0.55)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.70)';
        }}
      >
        {isFullscreen ? <CollapseIcon /> : <ExpandIcon />}
      </button>
    </div>
  );
}

/* ── Section ────────────────────────────────────────────────────────── */

export default function About() {
  const { t } = useLang();
  return (
    <section
      className="section-tall bg-gray-light"
      id="sobre"
      aria-labelledby="about-title"
    >
      <div className="container">

        {/* Eyebrow */}
        <p className="eyebrow-muted mb-12">{t('about.eyebrow')}</p>

        {/* Two-column: video left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-12 lg:gap-16 items-start">

          {/* Left — video */}
          <div className="reveal">
            <VideoPlayer />
          </div>

          {/* Right — quote + body + pillars + CTA */}
          <div className="flex flex-col gap-8">

            <blockquote aria-label={t('about.quote_author')}>
              <span
                className="block font-heading font-extrabold text-cyan leading-none select-none mb-3"
                style={{ fontSize: '3.2rem', opacity: 0.13 }}
                aria-hidden="true"
              >
                "
              </span>
              <p
                className="font-heading font-bold text-charcoal leading-snug tracking-tight mb-6"
                id="about-title"
                style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)' }}
              >
                {t('about.quote')}
              </p>
              <cite className="font-mono text-[10px] text-charcoal/38 tracking-widest2 not-italic uppercase block">
                {t('about.quote_author')}
              </cite>
            </blockquote>

            <div
              className="flex flex-col gap-4 reveal"
              style={{ transitionDelay: '80ms' }}
            >
              <p className="font-body text-charcoal/60 text-sm leading-[1.85]">
                {t('about.body1')}
              </p>
              <p className="font-body text-charcoal/60 text-sm leading-[1.85]">
                {t('about.body2')}
              </p>
            </div>

            <div className="reveal" style={{ transitionDelay: '240ms' }}>
              <Link to="/sobre-nos" className="hero-link">
                {t('about.full_story')} <span aria-hidden="true">↗</span>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
