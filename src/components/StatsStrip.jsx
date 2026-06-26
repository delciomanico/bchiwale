import { STATS } from '../data/siteData';
import { useStatCounter } from '../hooks/useStatCounter';

function StatItem({ value, suffix, label, detail, delay = 0 }) {
  const { count, ref } = useStatCounter(value);

  return (
    <div
      ref={ref}
      className="reveal flex flex-col gap-1"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="font-mono font-semibold text-charcoal text-2xl md:text-3xl tracking-tight leading-none">
        {count}{suffix}
      </span>
      <span className="font-body font-medium text-charcoal text-xs md:text-sm mt-1">{label}</span>
      <span className="font-mono text-[10px] text-gray-text tracking-widest3">{detail}</span>
    </div>
  );
}

export default function StatsStrip() {
  return (
    <section
      className="bg-white border-b border-gray-mid py-12 md:py-16"
      aria-label="Indicadores de desempenho"
    >
      <div className="container">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10">
          {STATS.map((stat, i) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              detail={stat.detail}
              delay={i * 80}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
