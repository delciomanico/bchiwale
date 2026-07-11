import { useStatCounter } from '../hooks/useStatCounter';
import { useLang } from '../contexts/LangContext';
import { useSiteData } from '../contexts/ContentContext';

function StatItem({ value, suffix, label, detail, delay = 0 }) {
  const { count, ref } = useStatCounter(value);

  return (
    <div
      ref={ref}
      className="reveal flex flex-col gap-1"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="font-heading font-light text-charcoal text-3xl md:text-4xl tracking-tight leading-none">
        {count}{suffix}
      </span>
      <span className="font-body text-charcoal text-xs md:text-sm mt-2 leading-snug">{label}</span>
      <span className="font-mono text-[10px] text-gray-text/60 tracking-[0.15em] uppercase mt-0.5">{detail}</span>
    </div>
  );
}

export default function StatsStrip() {
  const { t, loc } = useLang();
  const { STATS, STATS_EN } = useSiteData();
  const stats = loc(STATS, STATS_EN);

  return (
    <section
      className="bg-white border-b border-gray-mid py-12 md:py-16"
      aria-label={t('stats.section_label')}
    >
      <div className="container">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10">
          {stats.map((stat, i) => (
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
