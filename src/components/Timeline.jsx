import { TIMELINE } from '../data/siteData';

function TimelineDot({ type }) {
  if (type === 'active') {
    return (
      <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
        {/* Pulsing ring */}
        <span
          className="absolute inset-0 rounded-full animate-pulse-dot"
          style={{ backgroundColor: 'rgba(245,194,0,0.25)' }}
          aria-hidden="true"
        />
        <span className="w-4 h-4 rounded-full" style={{ backgroundColor: '#F5C200' }} />
      </div>
    );
  }

  if (type === 'milestone') {
    return (
      <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
        <span
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: 'rgba(0,174,239,0.2)' }}
          aria-hidden="true"
        />
        <span className="w-3.5 h-3.5 rounded-full bg-cyan" />
      </div>
    );
  }

  return (
    <div className="w-3 h-3 rounded-full bg-cyan shrink-0" />
  );
}

function TimelineItem({ item, delay = 0 }) {
  const isLeft = (TIMELINE.indexOf(item) % 2 === 0);

  return (
    <div
      className="reveal relative flex items-start gap-0"
      style={{ transitionDelay: `${delay}ms` }}
      role="listitem"
    >
      {/* Left spacer — only visible on md+ for alternating layout */}
      <div className={`hidden md:flex flex-col items-end flex-1 ${!isLeft ? 'order-last' : ''}`}>
        <div className={`max-w-xs text-right pr-8 ${!isLeft ? 'text-left pl-8 pr-0 order-last' : ''}`}>
          {isLeft && <TimelineContent item={item} />}
          {!isLeft && null}
        </div>
      </div>

      {/* Center dot + line */}
      <div className="flex flex-col items-center">
        <TimelineDot type={item.type} />
        <div className="w-px flex-1 bg-gray-mid min-h-[2.5rem]" aria-hidden="true" />
      </div>

      {/* Right side */}
      <div className={`flex-1 ${isLeft ? 'pl-6 md:hidden' : 'pl-6'}`}>
        <TimelineContent item={item} />
      </div>
    </div>
  );
}

function TimelineContent({ item }) {
  const badgeStyle = item.type === 'active'
    ? { background: 'rgba(245,194,0,0.15)', color: '#F5C200', borderColor: '#F5C200' }
    : { background: 'rgba(0,174,239,0.1)', color: '#00AEEF', borderColor: '#00AEEF' };

  return (
    <div className="pb-10">
      <div className="font-mono font-semibold text-cyan text-sm tracking-widest3 mb-1">
        {item.year}
      </div>
      <p className="font-body text-charcoal text-sm leading-relaxed max-w-xs">
        {item.text}
      </p>
      {item.badge && (
        <span
          className="inline-block mt-2 text-xs font-mono font-semibold px-3 py-1
                     border rounded-sm tracking-widest3"
          style={badgeStyle}
        >
          {item.badge}
        </span>
      )}
    </div>
  );
}

export default function Timeline() {
  return (
    <section className="section-pad" id="historia" aria-labelledby="timeline-title">
      <div className="container max-w-3xl">
        <header className="text-center mb-14">
          <div className="section-rule mx-auto" aria-hidden="true" />
          <p className="eyebrow">A NOSSA HISTÓRIA</p>
          <h2 className="section-title" id="timeline-title">
            Oito anos de camadas a <em>sedimentar.</em>
          </h2>
        </header>

        <div
          className="relative"
          role="list"
          aria-label="Marcos históricos"
        >
          {/* Vertical centre line */}
          <div
            className="absolute left-[9px] top-0 bottom-0 w-px bg-gray-mid"
            aria-hidden="true"
          />

          <div className="pl-0 space-y-0">
            {TIMELINE.map((item, i) => (
              <div
                key={item.year}
                className="reveal relative flex items-start gap-6"
                style={{ transitionDelay: `${i * 80}ms` }}
                role="listitem"
              >
                {/* Dot */}
                <div className="mt-0.5 shrink-0 z-10">
                  <TimelineDot type={item.type} />
                </div>

                {/* Content */}
                <div className="pb-10 flex-1">
                  <div className="font-mono font-semibold text-cyan text-sm tracking-widest3 mb-1">
                    {item.year}
                  </div>
                  <p className="font-body text-charcoal text-sm leading-relaxed">
                    {item.text}
                  </p>
                  {item.badge && (
                    <span
                      className="inline-block mt-2 text-xs font-mono font-semibold px-3 py-1
                                 border rounded-sm tracking-widest3"
                      style={
                        item.type === 'active'
                          ? { background: 'rgba(245,194,0,0.15)', color: '#F5C200', borderColor: '#F5C200' }
                          : { background: 'rgba(0,174,239,0.1)', color: '#00AEEF', borderColor: '#00AEEF' }
                      }
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
