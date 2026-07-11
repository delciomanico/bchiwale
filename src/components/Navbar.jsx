import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import { useSiteData } from '../contexts/ContentContext';

// ─── Icons ────────────────────────────────────────────────────────────────────
function ChevronDown({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function SearchIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function ArrowRight({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// ─── Mega menu structural data (hrefs and images only — text from t()) ────────
const MEGA_STRUCT = {
  sobre: {
    type: 'sobre',
    section1Links: [
      { tLabel: 'mega_sobre_historia', tDesc: 'mega_sobre_historia_desc', href: '/sobre-nos#historia' },
      { tLabel: 'mega_sobre_missao',   tDesc: 'mega_sobre_missao_desc',   href: '/sobre-nos#missao' },
      { tLabel: 'mega_sobre_organograma', tDesc: 'mega_sobre_organograma_desc', href: '/sobre-nos#organograma' },
    ],
    section2Links: [
      { tLabel: 'mega_sobre_equipa',        tDesc: 'mega_sobre_equipa_desc',        href: '/sobre-nos#equipa' },
      { tLabel: 'mega_sobre_certificacoes', tDesc: 'mega_sobre_certificacoes_desc', href: '/sobre-nos#certificacoes' },
      { tLabel: 'mega_sobre_rse',           tDesc: 'mega_sobre_rse_desc',           href: '/sobre-nos#rse' },
    ],
  },
  servicos: {
    type: 'servicos',
    image: 'https://bchiwale.ao/wp-content/uploads/2025/04/chiwale1section.webp',
    imageAlt: 'Geólogos B-CHIWALE em trabalho de campo',
  },
  portfolio: {
    type: 'portfolio',
    filterHrefs: ['/portfolio', '/portfolio?filter=servico', '/portfolio?filter=provincia', '/portfolio?filter=periodo'],
    featured: [
      { image: 'https://bchiwale.ao/wp-content/uploads/2024/06/project-1.jpg', href: '/portfolio', province: 'Luanda' },
      { image: 'https://bchiwale.ao/wp-content/uploads/2024/06/project2.jpg',  href: '/portfolio', province: 'Malanje' },
    ],
  },
  blog: {
    type: 'blog',
    categoryHrefs: ['/blog?cat=tecnico', '/blog?cat=webinars', '/blog?cat=guias', '/blog?cat=noticias'],
    recent: [
      { image: 'https://bchiwale.ao/wp-content/uploads/2024/06/service1.jpg',     href: '/blog' },
      { image: 'https://bchiwale.ao/wp-content/uploads/2024/06/service-baner.jpg', href: '/blog' },
    ],
  },
};

// ─── Mega menu panels ──────────────────────────────────────────────────────────

function MegaSobre({ struct, onClose }) {
  const { t } = useLang();
  const sections = [
    { heading: t('nav.mega_sobre_section_empresa'), links: struct.section1Links },
    { heading: t('nav.mega_sobre_section_pessoas'), links: struct.section2Links },
  ];
  return (
    <div className="grid grid-cols-[220px_1fr_260px] min-h-[300px]">
      {/* Left — dark panel */}
      <div className="bg-charcoal p-8 flex flex-col justify-between">
        <div>
          <p className="font-mono text-[10px] text-cyan/70 tracking-widest3 uppercase mb-3">{t('nav.mega_sobre_badge')}</p>
          <h3 className="font-heading font-bold text-white text-xl leading-snug mb-3">
            {t('nav.mega_sobre_title')}
          </h3>
          <p className="font-body text-white/50 text-sm leading-relaxed">{t('nav.mega_sobre_tagline')}</p>
        </div>
      </div>

      {/* Middle — section links */}
      <div className="p-8 grid grid-cols-2 gap-x-8 gap-y-0 content-start border-r border-gray-mid">
        {sections.map((section) => (
          <div key={section.heading}>
            <p className="font-mono text-[10px] text-charcoal/35 tracking-widest3 uppercase mb-4 pb-2 border-b border-gray-mid">
              {section.heading}
            </p>
            <ul className="space-y-1">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={onClose}
                    className="group flex flex-col py-2.5 px-3 hover:bg-gray-light transition-colors duration-150 border-l-2 border-transparent hover:border-cyan"
                  >
                    <span className="font-body font-semibold text-charcoal text-sm group-hover:text-cyan transition-colors">
                      {t(`nav.${link.tLabel}`)}
                    </span>
                    <span className="font-body text-charcoal/45 text-xs mt-0.5">{t(`nav.${link.tDesc}`)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="col-span-2 mt-4 pt-4 border-t border-gray-mid">
          <Link to="/sobre-nos" onClick={onClose} className="inline-flex items-center gap-2 font-mono text-xs text-cyan tracking-widest3 uppercase hover:gap-3 transition-all duration-200">
            {t('nav.mega_sobre_ver_tudo')} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Right — DG quote card */}
      <div className="p-8 bg-gray-light flex flex-col justify-between">
        <div>
          <span className="font-heading font-extrabold text-cyan/20 leading-none text-6xl select-none block -mb-2" aria-hidden="true">"</span>
          <p className="font-heading font-bold text-charcoal text-sm leading-snug mt-2 mb-4">
            {t('nav.mega_sobre_quote')}
          </p>
          <p className="font-mono text-[10px] text-charcoal/40 tracking-widest3 uppercase">{t('nav.mega_sobre_quote_author')}</p>
        </div>
        <Link
          to="/contacto"
          onClick={onClose}
          className="mt-6 block text-center bg-cyan text-white font-mono text-[11px] tracking-widest3 uppercase py-3 px-4 hover:bg-[#009ed8] transition-colors duration-200"
        >
          {t('nav.mega_sobre_cta')}
        </Link>
      </div>
    </div>
  );
}

function MegaServicos({ struct, onClose }) {
  const { t, loc } = useLang();
  const { SERVICES, SERVICES_EN } = useSiteData();
  const services = loc(SERVICES, SERVICES_EN);
  const megaServices = services.map((s, i) => ({
    num: String(i + 1).padStart(2, '0'),
    label: s.title,
    href: s.href,
    tags: (s.tags || []).map((tag) => tag.label).join(' · '),
  }));

  return (
    <div className="grid grid-cols-[200px_1fr_240px] min-h-[340px]">
      {/* Left — dark panel */}
      <div className="bg-charcoal p-8 flex flex-col justify-between">
        <div>
          <p className="font-mono text-[10px] text-cyan/70 tracking-widest3 uppercase mb-3">{t('nav.mega_servicos_badge')}</p>
          <h3 className="font-heading font-bold text-white text-xl leading-snug mb-3">{t('nav.mega_servicos_title')}</h3>
          <p className="font-body text-white/50 text-sm leading-relaxed">{t('nav.mega_servicos_tagline')}</p>
        </div>
        <Link
          to="/servicos"
          onClick={onClose}
          className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] text-yellow tracking-widest3 uppercase hover:gap-3 transition-all duration-200"
        >
          {t('nav.mega_servicos_ver_todos')} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Middle — service list */}
      <div className="p-6 border-r border-gray-mid">
        <p className="font-mono text-[10px] text-charcoal/35 tracking-widest3 uppercase mb-4 pb-2 border-b border-gray-mid">
          {t('nav.mega_servicos_count')}
        </p>
        <ul className="space-y-0.5">
          {megaServices.map((s) => (
            <li key={s.href}>
              <Link
                to={s.href}
                onClick={onClose}
                className="group flex items-start gap-4 py-2.5 px-3 hover:bg-gray-light transition-colors duration-150 border-l-2 border-transparent hover:border-cyan"
              >
                <span className="font-mono text-[11px] text-charcoal/20 group-hover:text-cyan/50 pt-0.5 w-5 shrink-0 transition-colors">
                  {s.num}
                </span>
                <div className="min-w-0">
                  <span className="font-body font-semibold text-charcoal text-sm group-hover:text-cyan transition-colors block leading-snug">
                    {s.label}
                  </span>
                  <span className="font-mono text-[10px] text-charcoal/35 tracking-wide">{s.tags}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-charcoal/10 group-hover:text-cyan shrink-0 mt-1 transition-colors" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right — field photo + CTA */}
      <div className="flex flex-col">
        <div className="relative overflow-hidden flex-1" style={{ minHeight: '220px' }}>
          <img
            src={struct.image}
            alt={struct.imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <p className="font-mono text-[10px] text-white/50 tracking-widest3 uppercase mb-1">{t('nav.mega_servicos_field_caption')}</p>
            <p className="font-heading font-bold text-white text-sm leading-snug">
              {t('nav.mega_servicos_field_text')}
            </p>
          </div>
        </div>
        <Link
          to="/contacto"
          onClick={onClose}
          className="block text-center bg-yellow text-charcoal font-mono text-[11px] tracking-widest3 uppercase py-4 px-4 hover:bg-[#e0b000] transition-colors duration-200 font-bold"
        >
          {t('nav.mega_servicos_cta')}
        </Link>
      </div>
    </div>
  );
}

function MegaPortfolio({ struct, onClose }) {
  const { t } = useLang();
  const filters = [
    { label: t('nav.mega_portfolio_all'),      desc: t('nav.mega_portfolio_all_desc'),      href: struct.filterHrefs[0] },
    { label: t('nav.mega_portfolio_service'),  desc: t('nav.mega_portfolio_service_desc'),  href: struct.filterHrefs[1] },
    { label: t('nav.mega_portfolio_province'), desc: t('nav.mega_portfolio_province_desc'), href: struct.filterHrefs[2] },
    { label: t('nav.mega_portfolio_period'),   desc: t('nav.mega_portfolio_period_desc'),   href: struct.filterHrefs[3] },
  ];
  const featTitles   = [t('nav.mega_portfolio_feat1_title'),   t('nav.mega_portfolio_feat2_title')];
  const featServices = [t('nav.mega_portfolio_feat1_service'), t('nav.mega_portfolio_feat2_service')];

  return (
    <div className="grid grid-cols-[200px_1fr] min-h-[280px]">
      {/* Left — dark panel */}
      <div className="bg-charcoal p-8 flex flex-col justify-between">
        <div>
          <p className="font-mono text-[10px] text-cyan/70 tracking-widest3 uppercase mb-3">{t('nav.mega_portfolio_badge')}</p>
          <h3 className="font-heading font-bold text-white text-xl leading-snug mb-3">{t('nav.mega_portfolio_title')}</h3>
          <p className="font-body text-white/50 text-sm leading-relaxed">{t('nav.mega_portfolio_tagline')}</p>
        </div>
        <div className="mt-6 space-y-1">
          {filters.map((f) => (
            <Link
              key={f.href}
              to={f.href}
              onClick={onClose}
              className="group flex flex-col py-2 border-b border-white/10 last:border-0 hover:pl-2 transition-all duration-150"
            >
              <span className="font-body text-sm text-white/80 group-hover:text-cyan transition-colors">{f.label}</span>
              <span className="font-mono text-[10px] text-white/30 tracking-wide">{f.desc}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Right — featured projects */}
      <div className="p-8">
        <p className="font-mono text-[10px] text-charcoal/35 tracking-widest3 uppercase mb-5 pb-2 border-b border-gray-mid">
          {t('nav.mega_portfolio_featured')}
        </p>
        <div className="grid grid-cols-2 gap-5">
          {struct.featured.map((p, i) => (
            <Link
              key={p.image}
              to={p.href}
              onClick={onClose}
              className="group block border border-gray-mid overflow-hidden hover:shadow-card-hover transition-shadow duration-200"
            >
              <div className="relative overflow-hidden" style={{ height: '140px' }}>
                <img
                  src={p.image}
                  alt={featTitles[i]}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-all duration-300 flex items-center justify-center">
                  <span className="font-mono text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity tracking-widest3 uppercase">
                    {t('nav.mega_portfolio_ver_projecto')}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan" />
              </div>
              <div className="p-3">
                <div className="flex gap-1.5 mb-1.5">
                  <span className="font-mono text-[9px] bg-cyan/10 text-cyan border border-cyan/30 px-1.5 py-0.5 uppercase tracking-wide">
                    {featServices[i]}
                  </span>
                  <span className="font-mono text-[9px] bg-yellow/10 text-[#a07800] border border-yellow/30 px-1.5 py-0.5 uppercase tracking-wide">
                    {p.province}
                  </span>
                </div>
                <p className="font-body font-semibold text-charcoal text-xs leading-snug group-hover:text-cyan transition-colors">
                  {featTitles[i]}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-gray-mid">
          <Link to="/portfolio" onClick={onClose} className="inline-flex items-center gap-2 font-mono text-xs text-cyan tracking-widest3 uppercase hover:gap-3 transition-all duration-200">
            {t('nav.mega_portfolio_ver_todos')} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MegaBlog({ struct, onClose }) {
  const { t } = useLang();
  const categories = [
    { label: t('nav.mega_blog_tecnico'),  desc: t('nav.mega_blog_tecnico_desc'),  href: struct.categoryHrefs[0] },
    { label: t('nav.mega_blog_webinars'), desc: t('nav.mega_blog_webinars_desc'), href: struct.categoryHrefs[1] },
    { label: t('nav.mega_blog_guias'),    desc: t('nav.mega_blog_guias_desc'),    href: struct.categoryHrefs[2] },
    { label: t('nav.mega_blog_noticias'), desc: t('nav.mega_blog_noticias_desc'), href: struct.categoryHrefs[3] },
  ];
  const recTitles = [t('nav.mega_blog_rec1_title'), t('nav.mega_blog_rec2_title')];
  const recDates  = [t('nav.mega_blog_rec1_date'),  t('nav.mega_blog_rec2_date')];

  return (
    <div className="grid grid-cols-[200px_1fr] min-h-[260px]">
      {/* Left — dark panel */}
      <div className="bg-charcoal p-8 flex flex-col justify-between">
        <div>
          <p className="font-mono text-[10px] text-cyan/70 tracking-widest3 uppercase mb-3">{t('nav.mega_blog_badge')}</p>
          <h3 className="font-heading font-bold text-white text-xl leading-snug mb-3">{t('nav.mega_blog_title')}</h3>
          <p className="font-body text-white/50 text-sm leading-relaxed">{t('nav.mega_blog_tagline')}</p>
        </div>
        <div className="mt-6 space-y-1">
          {categories.map((c) => (
            <Link
              key={c.href}
              to={c.href}
              onClick={onClose}
              className="group flex flex-col py-2 border-b border-white/10 last:border-0 hover:pl-2 transition-all duration-150"
            >
              <span className="font-body text-sm text-white/80 group-hover:text-cyan transition-colors">{c.label}</span>
              <span className="font-mono text-[10px] text-white/30 tracking-wide">{c.desc}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Right — recent articles */}
      <div className="p-8">
        <p className="font-mono text-[10px] text-charcoal/35 tracking-widest3 uppercase mb-5 pb-2 border-b border-gray-mid">
          {t('nav.mega_blog_recent')}
        </p>
        <div className="grid grid-cols-2 gap-5">
          {struct.recent.map((a, i) => (
            <Link
              key={a.image}
              to={a.href}
              onClick={onClose}
              className="group block border border-gray-mid overflow-hidden hover:shadow-card-hover transition-shadow duration-200"
            >
              <div className="relative overflow-hidden" style={{ height: '120px' }}>
                <img
                  src={a.image}
                  alt={recTitles[i]}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan" />
              </div>
              <div className="p-3">
                <p className="font-mono text-[9px] text-cyan/70 tracking-widest3 uppercase mb-1">{recDates[i]}</p>
                <p className="font-body font-semibold text-charcoal text-xs leading-snug group-hover:text-cyan transition-colors">
                  {recTitles[i]}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-gray-mid">
          <Link to="/blog" onClick={onClose} className="inline-flex items-center gap-2 font-mono text-xs text-cyan tracking-widest3 uppercase hover:gap-3 transition-all duration-200">
            {t('nav.mega_blog_ver_todos')} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// Renders the correct mega menu panel based on megaKey
function MegaPanel({ megaKey, onClose }) {
  const struct = MEGA_STRUCT[megaKey];
  if (!struct) return null;
  if (struct.type === 'sobre')    return <MegaSobre    struct={struct} onClose={onClose} />;
  if (struct.type === 'servicos') return <MegaServicos struct={struct} onClose={onClose} />;
  if (struct.type === 'portfolio') return <MegaPortfolio struct={struct} onClose={onClose} />;
  if (struct.type === 'blog')     return <MegaBlog     struct={struct} onClose={onClose} />;
  return null;
}

// Simple dropdown fallback
function SimpleDropdown({ items, isOpen, onClose }) {
  return (
    <ul
      className={`absolute top-full left-0 mt-0 w-64 bg-white border-t-2 border-cyan shadow-nav z-50
                  transition-all duration-200 origin-top
                  ${isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}`}
    >
      {items.map((item) => (
        <li key={item.href}>
          <Link
            to={item.href}
            onClick={onClose}
            className="block px-5 py-3 text-sm text-charcoal font-body border-b border-gray-mid last:border-0
                       hover:text-cyan hover:pl-7 hover:bg-gray-light transition-all duration-200"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// ─── Search index ─────────────────────────────────────────────────────────────
const SEARCH_PAGES = [
  { type: 'Páginas',   label: 'Home',               subtitle: 'Página inicial',                     href: '/' },
  { type: 'Páginas',   label: 'Sobre Nós',           subtitle: 'História, equipa e certificações',   href: '/sobre-nos' },
  { type: 'Páginas',   label: 'Portfolio',            subtitle: 'Mais de 50 projectos concluídos',   href: '/portfolio' },
  { type: 'Páginas',   label: 'Blog & Conhecimento',  subtitle: 'Artigos técnicos e guias',          href: '/blog' },
  { type: 'Páginas',   label: 'Galeria',              subtitle: 'Imagens de campo',                  href: '/galeria' },
  { type: 'Páginas',   label: 'Recursos',             subtitle: 'Downloads e documentos',            href: '/recursos' },
  { type: 'Páginas',   label: 'Contacto',             subtitle: 'Fale connosco',                     href: '/contacto' },
  { type: 'Páginas',   label: 'Carreiras',            subtitle: 'Trabalhe connosco',                 href: '/carreiras' },
];

function buildSearchIndex({ SERVICES, PORTFOLIO_ITEMS, BLOG_POSTS, TEAM }) {
  return [
    ...SEARCH_PAGES,
    ...SERVICES.map((s) => ({
      type: 'Serviços',
      label: s.title,
      subtitle: s.description,
      href: s.href,
      keywords: (s.subtechniques || []).join(' ') + ' ' + (s.tags || []).map((t) => t.label).join(' '),
    })),
    ...PORTFOLIO_ITEMS.map((p) => ({
      type: 'Projectos',
      label: p.title,
      subtitle: `${p.service} · ${p.province}`,
      href: `/portfolio/${p.slug}`,
      keywords: `${p.description} ${p.challenge || ''} ${p.solution || ''}`,
    })),
    ...BLOG_POSTS.map((b) => ({
      type: 'Artigos',
      label: b.title,
      subtitle: `${b.category} · ${b.date}`,
      href: `/blog/${b.slug}`,
      keywords: `${b.excerpt} ${(b.tags || []).join(' ')}`,
    })),
    ...TEAM.map((m) => ({
      type: 'Equipa',
      label: m.name,
      subtitle: m.role,
      href: '/sobre-nos#equipa',
      keywords: `${m.bio} ${(m.specialties || []).join(' ')}`,
    })),
  ];
}

// ─── Nav items (language-independent keys) ────────────────────────────────────
const NAV_ITEMS = [
  { key: 'home',      href: '/' },
  { key: 'sobre',     href: '/sobre-nos',  mega: true },
  { key: 'servicos',  href: '/servicos',   mega: true },
  { key: 'portfolio', href: '/portfolio',  mega: true },
  { key: 'galeria',   href: '/galeria' },
  { key: 'blog',      href: '/blog',       mega: true },
  { key: 'recursos',  href: '/recursos' },
  { key: 'contacto',  href: '/contacto' },
];

// Mobile sub-items keyed by same keys as NAV_ITEMS
const MOBILE_SUBITEMS = {
  sobre: [
    { tKey: 'mega_sobre_historia',    href: '/sobre-nos#historia' },
    { tKey: 'mega_sobre_missao',      href: '/sobre-nos#missao' },
    { tKey: 'mega_sobre_equipa',      href: '/sobre-nos#equipa' },
    { tKey: 'mega_sobre_certificacoes', href: '/sobre-nos#certificacoes' },
    { tKey: 'mega_sobre_rse',         href: '/sobre-nos#rse' },
  ],
  portfolio: [
    { tKey: 'mega_portfolio_all',     href: '/portfolio' },
    { tKey: 'mega_portfolio_service', href: '/portfolio?filter=servico' },
    { tKey: 'mega_portfolio_province', href: '/portfolio?filter=provincia' },
  ],
  blog: [
    { tKey: 'mega_blog_tecnico',   href: '/blog?cat=tecnico' },
    { tKey: 'mega_blog_webinars',  href: '/blog?cat=webinars' },
    { tKey: 'mega_blog_guias',     href: '/blog?cat=guias' },
    { tKey: 'mega_blog_noticias',  href: '/blog?cat=noticias' },
  ],
};

// ─── Highlight helper ─────────────────────────────────────────────────────────
function Highlight({ text, query }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-transparent text-cyan font-semibold not-italic">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function Navbar() {
  const { lang, setLang, t, loc } = useLang();
  const { SERVICES, SERVICES_EN, PORTFOLIO_ITEMS, BLOG_POSTS, TEAM } = useSiteData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMega, setOpenMega] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDrawerSub, setOpenDrawerSub] = useState(null);
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const searchInputRef = useRef(null);
  const closeTimer = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Reactive services list for mobile drawer
  const services = loc(SERVICES, SERVICES_EN);

  // Popular chips (reactive)
  const popular = [
    { label: t('nav.popular_1'), href: '/servicos/geologia-prospeccao' },
    { label: t('nav.popular_2'), href: '/servicos/geofisica-aplicada' },
    { label: t('nav.popular_3'), href: '/servicos/engenharia-geotecnica' },
    { label: t('nav.popular_4'), href: '/portfolio' },
    { label: t('nav.popular_5'), href: '/contacto' },
  ];

  const searchIndex = useMemo(
    () => buildSearchIndex({ SERVICES, PORTFOLIO_ITEMS, BLOG_POSTS, TEAM }),
    [SERVICES, PORTFOLIO_ITEMS, BLOG_POSTS, TEAM]
  );

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchIndex.filter((item) =>
      item.label.toLowerCase().includes(q) ||
      item.subtitle?.toLowerCase().includes(q) ||
      item.keywords?.toLowerCase().includes(q)
    ).slice(0, 20);
  }, [query, searchIndex]);

  const grouped = useMemo(() => {
    return searchResults.reduce((acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    }, {});
  }, [searchResults]);

  const flatResults = searchResults;

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setQuery('');
    setSelectedIdx(-1);
  }, []);

  // Close mega on route change
  useEffect(() => { setOpenMega(null); setDrawerOpen(false); closeSearch(); }, [location]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setDrawerOpen(false); closeSearch(); setOpenMega(null); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeSearch]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const handleSearchKeyDown = (e) => {
    if (!flatResults.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = selectedIdx >= 0 ? flatResults[selectedIdx] : flatResults[0];
      if (target) { navigate(target.href); closeSearch(); }
    }
  };

  const handleMouseEnter = (key) => {
    clearTimeout(closeTimer.current);
    if (MEGA_STRUCT[key]) setOpenMega(key);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMega(null), 120);
  };

  const closeMega = () => setOpenMega(null);

  // Transparent only on the home page, at the top, with no overlay open
  const isTransparent = location.pathname === '/' && !isScrolled && !openMega && !searchOpen;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav
          className={`transition-all duration-500 ${
            isTransparent
              ? 'bg-transparent'
              : `bg-white border-b border-gray-mid ${isScrolled ? 'shadow-nav' : ''}`
          }`}
          role="navigation"
          aria-label="Navegação principal"
        >
          <div className="container">
            <div className="flex items-center justify-between h-[72px]">

              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 shrink-0 z-10" aria-label="B-CHIWALE — Página inicial">
                <img
                  src="/logo.png"
                  alt="B-CHIWALE"
                  className="h-10 w-auto object-contain"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </Link>

              {/* Desktop nav — visible from xl (1280px) up */}
              <ul className="hidden xl:flex items-center gap-0" role="list">
                {NAV_ITEMS.map((item) => (
                  <li
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.mega ? (
                      <button
                        className={`flex items-center gap-1 px-3 py-2 text-[13px] font-body font-medium transition-colors duration-200 whitespace-nowrap
                                    ${openMega === item.key ? 'text-cyan' : isTransparent ? 'text-white/80 hover:text-white' : 'text-charcoal hover:text-cyan'}`}
                        aria-expanded={openMega === item.key}
                        aria-haspopup="true"
                        onClick={() => setOpenMega((v) => v === item.key ? null : item.key)}
                      >
                        {t(`nav.nav_${item.key}`)}
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 shrink-0 ${openMega === item.key ? 'rotate-180 text-cyan' : ''}`}
                        />
                      </button>
                    ) : (
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `flex items-center px-3 py-2 text-[13px] font-body font-medium transition-colors duration-200 whitespace-nowrap
                           ${isActive ? 'text-cyan' : isTransparent ? 'text-white/80 hover:text-white' : 'text-charcoal hover:text-cyan'}`
                        }
                      >
                        {t(`nav.nav_${item.key}`)}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>

              {/* Right actions — desktop */}
              <div className="hidden xl:flex items-center gap-3 shrink-0">
                <button
                  className={`p-2 transition-colors duration-500 ${isTransparent ? 'text-white/70 hover:text-white' : searchOpen ? 'text-cyan' : 'text-charcoal hover:text-cyan'}`}
                  aria-label={t('nav.search_icon_label')}
                  onClick={() => { if (searchOpen) { closeSearch(); } else { setSearchOpen(true); } }}
                >
                  <SearchIcon className="w-[18px] h-[18px]" />
                </button>

                {/* Language switcher */}
                <div className="flex items-center gap-1 font-mono font-medium" style={{ fontSize: '11px' }}>
                  <button
                    onClick={() => setLang('pt')}
                    className={`transition-colors duration-500 ${
                      lang === 'pt'
                        ? isTransparent ? 'text-white font-bold' : 'text-cyan font-bold'
                        : isTransparent ? 'text-white/45 hover:text-white' : 'text-gray-text hover:text-cyan'
                    }`}
                    aria-pressed={lang === 'pt'}
                  >
                    PT
                  </button>
                  <span className={`transition-colors duration-500 ${isTransparent ? 'text-white/20' : 'text-gray-mid'}`} aria-hidden="true">|</span>
                  <button
                    onClick={() => setLang('en')}
                    className={`transition-colors duration-500 ${
                      lang === 'en'
                        ? isTransparent ? 'text-white font-bold' : 'text-cyan font-bold'
                        : isTransparent ? 'text-white/45 hover:text-white' : 'text-gray-text hover:text-cyan'
                    }`}
                    aria-pressed={lang === 'en'}
                  >
                    EN
                  </button>
                </div>

                <Link
                  to="/contacto"
                  className="shrink-0 whitespace-nowrap inline-flex items-center font-body font-semibold
                             bg-cyan text-white border-2 border-cyan hover:bg-[#009ed8] hover:border-[#009ed8]
                             transition-all duration-300 focus:outline-none"
                  style={{ fontSize: '11px', letterSpacing: '0.08em', padding: '8px 18px', textTransform: 'uppercase' }}
                >
                  {t('nav.request_proposal')}
                </Link>
              </div>

              {/* Hamburger — visible below xl */}
              <button
                className={`xl:hidden flex flex-col gap-1.5 p-2 transition-colors duration-500 ${isTransparent ? 'text-white' : 'text-charcoal'}`}
                aria-label={drawerOpen ? t('nav.mobile_close') : t('nav.mobile_open')}
                aria-expanded={drawerOpen}
                onClick={() => setDrawerOpen((v) => !v)}
              >
                <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${drawerOpen ? 'translate-y-2 rotate-45' : ''}`} />
                <span className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${drawerOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${drawerOpen ? '-translate-y-2 -rotate-45' : ''}`} />
              </button>
            </div>
          </div>

          {/* Search panel */}
          {searchOpen && (
            <div className="border-t-[3px] border-cyan bg-white shadow-xl">
              <div className="container py-5">
                {/* Input */}
                <div className="flex items-center gap-3 border-b border-charcoal/15 pb-4 mb-5">
                  <SearchIcon className="w-5 h-5 text-charcoal/30 shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setSelectedIdx(-1); }}
                    onKeyDown={handleSearchKeyDown}
                    className="flex-1 bg-transparent text-charcoal font-body text-lg outline-none placeholder:text-charcoal/25"
                    placeholder={t('nav.search_placeholder')}
                    aria-label={t('nav.search_label')}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    className="font-mono text-[10px] text-charcoal/30 tracking-[0.18em] hover:text-charcoal transition-colors px-2 py-1 border border-charcoal/15 hover:border-charcoal/40"
                    onClick={closeSearch}
                  >
                    ESC
                  </button>
                </div>

                {/* Results */}
                {query.trim() ? (
                  flatResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-1 max-h-[60vh] overflow-y-auto pb-4">
                      {Object.entries(grouped).map(([type, items]) => (
                        <div key={type} className="mb-4">
                          <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-charcoal/30 mb-2 pb-1.5 border-b border-charcoal/8">
                            {type}
                          </p>
                          <ul>
                            {items.slice(0, 4).map((item) => {
                              const globalIdx = flatResults.indexOf(item);
                              const isSelected = globalIdx === selectedIdx;
                              return (
                                <li key={item.href + item.label}>
                                  <Link
                                    to={item.href}
                                    onClick={closeSearch}
                                    onMouseEnter={() => setSelectedIdx(globalIdx)}
                                    className={`flex flex-col py-2 px-3 -mx-3 transition-colors duration-100 ${
                                      isSelected ? 'bg-gray-light' : 'hover:bg-gray-light'
                                    }`}
                                  >
                                    <span className="font-body font-medium text-charcoal text-sm leading-snug">
                                      <Highlight text={item.label} query={query.trim()} />
                                    </span>
                                    <span className="font-mono text-[10px] text-charcoal/35 tracking-wide mt-0.5 truncate">
                                      {item.subtitle}
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="font-body text-charcoal/40 text-sm">
                        {t('nav.search_no_query')} <strong className="text-charcoal/60">"{query}"</strong>
                      </p>
                      <p className="font-mono text-[10px] text-charcoal/25 tracking-wide mt-2 uppercase">
                        {t('nav.search_hint')}
                      </p>
                    </div>
                  )
                ) : (
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-charcoal/30 mb-3">{t('nav.search_popular')}</p>
                    <div className="flex flex-wrap gap-2">
                      {popular.map((p) => (
                        <Link
                          key={p.href}
                          to={p.href}
                          onClick={closeSearch}
                          className="font-mono text-[10px] tracking-[0.14em] text-charcoal/50 border border-charcoal/15
                                     px-3 py-1.5 hover:border-cyan hover:text-cyan transition-colors duration-200"
                        >
                          {p.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>

        {/* ── Mega menu panel ── */}
        {openMega && MEGA_STRUCT[openMega] && (
          <div
            className="absolute left-0 right-0 top-full bg-white border-t-[3px] border-cyan shadow-xl z-40 animate-fade-up"
            style={{ animationDuration: '150ms' }}
            onMouseEnter={() => { clearTimeout(closeTimer.current); }}
            onMouseLeave={handleMouseLeave}
            role="dialog"
            aria-label={`Submenu — ${t(`nav.nav_${openMega}`)}`}
          >
            {/* Constrained width to match container */}
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
              <MegaPanel megaKey={openMega} onClose={closeMega} />
            </div>
          </div>
        )}
      </header>

      {/* Backdrop to close mega on outside click */}
      {openMega && (
        <div
          className="fixed inset-0 z-30"
          aria-hidden="true"
          onClick={closeMega}
        />
      )}

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-charcoal/60 z-40 xl:hidden transition-opacity duration-300
                    ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
        onClick={() => setDrawerOpen(false)}
      />

      {/* Mobile drawer */}
      <nav
        id="mobile-drawer"
        className={`fixed top-0 right-0 bottom-0 w-80 max-w-[90vw] bg-white z-50 overflow-y-auto
                    transform transition-transform duration-300 shadow-xl
                    ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-label="Menu móvel"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-mid bg-charcoal">
          <img src="/logo.png" alt="B-CHIWALE" className="h-8 w-auto object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
          <button className="p-1 text-white/60 hover:text-white" onClick={() => setDrawerOpen(false)} aria-label={t('nav.mobile_close')}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <ul className="py-2" role="list">
          {NAV_ITEMS.map((item) => {
            // Services: use translated services array
            if (item.key === 'servicos') {
              return (
                <li key={item.key} className="border-b border-gray-mid/50">
                  <button
                    className="flex items-center justify-between w-full px-5 py-3.5 text-sm font-body font-medium text-charcoal hover:text-cyan transition-colors"
                    onClick={() => setOpenDrawerSub((v) => v === item.key ? null : item.key)}
                    aria-expanded={openDrawerSub === item.key}
                  >
                    {t(`nav.nav_${item.key}`)}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDrawerSub === item.key ? 'rotate-180 text-cyan' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openDrawerSub === item.key ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="bg-gray-light pb-2">
                      {services.map((s) => (
                        <li key={s.href}>
                          <Link
                            to={s.href}
                            className="block px-8 py-2.5 text-sm text-gray-text hover:text-cyan border-l-2 border-transparent hover:border-cyan ml-5 transition-all duration-150"
                            onClick={() => setDrawerOpen(false)}
                          >
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            }

            const subs = MOBILE_SUBITEMS[item.key];
            return (
              <li key={item.key} className="border-b border-gray-mid/50">
                {subs ? (
                  <>
                    <button
                      className="flex items-center justify-between w-full px-5 py-3.5 text-sm font-body font-medium text-charcoal hover:text-cyan transition-colors"
                      onClick={() => setOpenDrawerSub((v) => v === item.key ? null : item.key)}
                      aria-expanded={openDrawerSub === item.key}
                    >
                      {t(`nav.nav_${item.key}`)}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDrawerSub === item.key ? 'rotate-180 text-cyan' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openDrawerSub === item.key ? 'max-h-96' : 'max-h-0'}`}>
                      <ul className="bg-gray-light pb-2">
                        {subs.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              to={sub.href}
                              className="block px-8 py-2.5 text-sm text-gray-text hover:text-cyan border-l-2 border-transparent hover:border-cyan ml-5 transition-all duration-150"
                              onClick={() => setDrawerOpen(false)}
                            >
                              {t(`nav.${sub.tKey}`)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `block px-5 py-3.5 text-sm font-body font-medium transition-colors
                       ${isActive ? 'text-cyan' : 'text-charcoal hover:text-cyan'}`
                    }
                    onClick={() => setDrawerOpen(false)}
                  >
                    {t(`nav.nav_${item.key}`)}
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>

        <div className="p-5">
          <Link to="/contacto" className="btn-primary block text-center" onClick={() => setDrawerOpen(false)}>
            {t('nav.request_proposal')}
          </Link>
        </div>

        {/* Language switcher — mobile */}
        <div className="px-5 pb-2 pt-0 flex items-center gap-3">
          <span className="font-mono text-[10px] text-charcoal/35 tracking-widest3 uppercase">Lang:</span>
          <button
            onClick={() => setLang('pt')}
            className={`font-mono text-xs font-semibold transition-colors ${lang === 'pt' ? 'text-cyan' : 'text-charcoal/40 hover:text-charcoal'}`}
            aria-pressed={lang === 'pt'}
          >
            PT
          </button>
          <span className="text-charcoal/20" aria-hidden="true">|</span>
          <button
            onClick={() => setLang('en')}
            className={`font-mono text-xs font-semibold transition-colors ${lang === 'en' ? 'text-cyan' : 'text-charcoal/40 hover:text-charcoal'}`}
            aria-pressed={lang === 'en'}
          >
            EN
          </button>
        </div>

        {/* Drawer footer */}
        <div className="px-5 pb-5 pt-2 border-t border-gray-mid mt-2">
          <p className="font-mono text-[10px] text-charcoal/35 tracking-widest3 uppercase mb-1">{t('nav.mobile_contact_label')}</p>
          <a href="tel:+244924073147" className="font-body text-sm text-charcoal hover:text-cyan transition-colors">
            +244 924 073 147
          </a>
        </div>
      </nav>
    </>
  );
}
