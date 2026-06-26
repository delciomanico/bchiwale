// ServiceIcons — SVG icons for each service, keyed by iconId
// All strokes use currentColor so Tailwind text-cyan applies directly

export function ServiceIcon({ id, className = 'w-12 h-12' }) {
  const icons = {
    geology: (
      <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="21" cy="21" r="12"/>
        <line x1="30" y1="30" x2="42" y2="42"/>
        <path d="M15 21 h12 M21 15 v12"/>
        <path d="M10 38 Q12 34 16 36" strokeWidth="1.4"/>
        <path d="M6 32 Q10 28 14 30" strokeWidth="1.2" opacity="0.5"/>
      </svg>
    ),
    geophysics: (
      <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <path d="M4 24 Q8 16 12 24 Q16 32 20 24 Q24 16 28 24 Q32 32 36 24 Q40 16 44 24"/>
        <line x1="4" y1="36" x2="44" y2="36" strokeWidth="1" opacity="0.4"/>
        <line x1="4" y1="12" x2="44" y2="12" strokeWidth="1" opacity="0.4"/>
      </svg>
    ),
    geotechnics: (
      <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="38" width="40" height="4"/>
        <rect x="8" y="20" width="8" height="18"/>
        <rect x="20" y="14" width="8" height="24"/>
        <rect x="32" y="22" width="8" height="16"/>
        <line x1="4" y1="12" x2="44" y2="12" strokeDasharray="3,3" opacity="0.5"/>
      </svg>
    ),
    topography: (
      <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="24,6 6,40 42,40"/>
        <line x1="24" y1="6" x2="24" y2="40"/>
        <circle cx="24" cy="6" r="2.5" fill="currentColor"/>
        <circle cx="6" cy="40" r="2.5" fill="currentColor"/>
        <circle cx="42" cy="40" r="2.5" fill="currentColor"/>
        <line x1="14" y1="28" x2="34" y2="28" strokeDasharray="2,2" opacity="0.5"/>
      </svg>
    ),
    environment: (
      <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M24 42 C24 42 6 30 6 18 A18 18 0 0 1 42 18 C42 30 24 42 24 42Z"/>
        <line x1="24" y1="42" x2="24" y2="22"/>
        <path d="M24 32 Q18 28 16 22"/>
        <path d="M24 28 Q30 24 32 18"/>
      </svg>
    ),
    water: (
      <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M24 6 Q36 18 36 28 A12 12 0 0 1 12 28 Q12 18 24 6Z"/>
        <path d="M18 32 Q24 26 30 32" strokeWidth="1.4" opacity="0.6"/>
        <path d="M16 36 Q24 30 32 36" strokeWidth="1.2" opacity="0.4"/>
      </svg>
    ),
    consultancy: (
      <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="8" y="6" width="28" height="36"/>
        <line x1="14" y1="16" x2="30" y2="16"/>
        <line x1="14" y1="22" x2="30" y2="22"/>
        <line x1="14" y1="28" x2="24" y2="28"/>
        <circle cx="34" cy="36" r="7" strokeWidth="1.5"/>
        <polyline points="30,36 33,39 38,33" strokeWidth="1.8"/>
      </svg>
    ),
  };

  return icons[id] || null;
}
