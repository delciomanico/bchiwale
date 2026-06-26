import { Link } from 'react-router-dom';
import { TEAM } from '../data/siteData';

function TeamCard({ member, index }) {
  return (
    <div
      className="reveal group bg-white border border-gray-mid overflow-hidden
                 transition-all duration-300 hover:shadow-card-hover hover:border-t-2 hover:border-t-cyan"
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      {/* Photo */}
      <div className="relative overflow-hidden" style={{ height: '220px' }}>
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
        ) : null}
        {/* Fallback avatar with initials */}
        <div
          className="absolute inset-0 items-center justify-center bg-charcoal"
          style={{ display: member.photo ? 'none' : 'flex' }}
          aria-hidden="true"
        >
          <span className="font-heading font-extrabold text-cyan text-5xl">
            {member.initials}
          </span>
        </div>
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-charcoal/60 to-transparent" />
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-2">
        <h3 className="font-heading font-bold text-charcoal text-base leading-snug">
          {member.name}
        </h3>
        <p className="font-mono text-[11px] text-cyan tracking-widest3 uppercase">
          {member.role}
        </p>
        <p className="font-body text-charcoal/50 text-sm leading-snug">
          {member.area}
        </p>
        <p className="font-mono text-[11px] text-charcoal/30 tracking-widest3 mt-1">
          {member.experience}
        </p>
        {/* Cert badges */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {member.certs.map((cert) => (
            <span
              key={cert}
              className="font-mono text-[10px] text-charcoal/50 border border-gray-mid px-2 py-0.5"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section
      className="section-tall border-t border-gray-mid bg-white"
      id="equipa"
      aria-labelledby="team-title"
    >
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <p className="eyebrow-muted mb-4">AS PESSOAS POR DETRÁS DO RIGOR</p>
            <h2 className="section-title-xl" id="team-title">
              Equipa de <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>liderança.</em>
            </h2>
          </div>
          <Link to="/sobre-nos#equipa" className="hero-link shrink-0 self-start md:self-auto">
            Ver equipa completa <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {/* Team cards grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Equipa de liderança"
        >
          {TEAM.map((member, i) => (
            <div key={member.initials} role="listitem">
              <TeamCard member={member} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
