import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TEAM } from '../data/siteData';
import { useLang } from '../contexts/LangContext';
import { TEAM_EN } from '../i18n/dataEN';

const PER_PAGE = 4; // 2 columns × 2 rows

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px', height: '16px' }}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: '18px', height: '18px' }}>
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: '18px', height: '18px' }}>
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TeamCard({ member }) {
  return (
    <div
      className="flex bg-white overflow-hidden"
      style={{ boxShadow: '0 1px 16px rgba(0,0,0,0.07)', minHeight: '160px' }}
    >
      {/* Photo */}
      <div className="relative shrink-0 overflow-hidden" style={{ width: '38%' }}>
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
        ) : null}
        {/* Initials fallback */}
        <div
          className="absolute inset-0 items-center justify-center bg-charcoal"
          style={{ display: member.photo ? 'none' : 'flex' }}
          aria-hidden="true"
        >
          <span className="font-heading font-extrabold text-cyan text-4xl">{member.initials}</span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5" style={{ gap: 0 }}>

        {/* Name + role */}
        <div className="flex items-baseline justify-between gap-2 mb-3">
          <h3 className="font-heading font-bold text-charcoal leading-tight" style={{ fontSize: '0.95rem' }}>
            {member.name}
          </h3>
          <span className="font-mono text-charcoal/35 shrink-0" style={{ fontSize: '10px', letterSpacing: '0.08em' }}>
            {member.role}
          </span>
        </div>

        {/* Bio */}
        <p className="font-body text-charcoal/55 leading-relaxed flex-1" style={{ fontSize: '0.8rem' }}>
          {member.bio}
        </p>

        {/* Divider + social + link */}
        <div
          className="flex items-center justify-between mt-4 pt-3"
          style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
        >
          <a
            href={member.linkedin}
            aria-label={`LinkedIn de ${member.name}`}
            className="text-charcoal/30 hover:text-cyan transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
          </a>
          <Link
            to="/sobre-nos#equipa"
            className="font-body text-charcoal/40 hover:text-cyan transition-colors duration-200"
            style={{ fontSize: '11px', letterSpacing: '0.06em' }}
          >
            Ver perfil →
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function Team() {
  const { loc } = useLang();
  const team = loc(TEAM, TEAM_EN);
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(team.length / PER_PAGE);
  const visible    = team.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <section
      className="section-tall border-t border-gray-mid bg-white"
      id="equipa"
      aria-labelledby="team-title"
    >
      <div className="container">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow-muted mb-4">AS PESSOAS POR DETRÁS DO RIGOR</p>
            <h2 className="section-title-xl" id="team-title">
              A nossa <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>equipa.</em>
            </h2>
          </div>
          <Link to="/sobre-nos#equipa" className="hero-link shrink-0 self-start md:self-auto">
            Ver equipa completa <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          role="list"
          aria-label="Equipa B-CHIWALE"
        >
          {visible.map((member) => (
            <div key={member.initials} role="listitem">
              <TeamCard member={member} />
            </div>
          ))}
        </div>

        {/* Carousel controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-10">

            {/* Page dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Página ${i + 1}`}
                  style={{
                    width:           i === page ? '24px' : '6px',
                    height:          '6px',
                    borderRadius:    '3px',
                    backgroundColor: i === page ? '#00AEEF' : 'rgba(0,0,0,0.15)',
                    border:          'none',
                    cursor:          'pointer',
                    padding:         0,
                    transition:      'width 0.4s ease, background-color 0.3s ease',
                  }}
                />
              ))}
            </div>

            {/* Prev / Next arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                aria-label="Anterior"
                className="flex items-center justify-center border border-gray-mid text-charcoal
                           disabled:opacity-25 hover:border-cyan hover:text-cyan transition-colors duration-200"
                style={{ width: '38px', height: '38px' }}
              >
                <ChevronLeft />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                aria-label="Seguinte"
                className="flex items-center justify-center border border-gray-mid text-charcoal
                           disabled:opacity-25 hover:border-cyan hover:text-cyan transition-colors duration-200"
                style={{ width: '38px', height: '38px' }}
              >
                <ChevronRight />
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
