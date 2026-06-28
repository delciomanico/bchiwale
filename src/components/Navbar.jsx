import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { SERVICES, PORTFOLIO_ITEMS, BLOG_POSTS, TEAM } from '../data/siteData';

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

// ─── Mega menu data ────────────────────────────────────────────────────────────
const MEGA_DATA = {
  'Sobre Nós': {
    type: 'sobre',
    title: 'Sobre a B-CHIWALE',
    tagline: 'Uma empresa angolana de geociências fundada em 2017, com actuação nacional em 18 províncias.',
    sections: [
      {
        heading: 'A Empresa',
        links: [
          { label: 'História & Marcos', href: '/sobre-nos#historia', desc: 'Oito anos de crescimento contínuo' },
          { label: 'Missão, Visão e Valores', href: '/sobre-nos#missao', desc: 'O que nos define e orienta' },
          { label: 'Organograma', href: '/sobre-nos#organograma', desc: 'Estrutura e direcções técnicas' },
        ],
      },
      {
        heading: 'Pessoas & Certificações',
        links: [
          { label: 'Equipa de Liderança', href: '/sobre-nos#equipa', desc: '6 directores multidisciplinares' },
          { label: 'Certificações', href: '/sobre-nos#certificacoes', desc: 'ISO 9001 · ISO 45001 · ABNT · JORC' },
          { label: 'Responsabilidade Social', href: '/sobre-nos#rse', desc: 'Compromisso com Angola e as comunidades' },
        ],
      },
    ],
    quote: 'Angola precisa de empresas de geociências que combinem rigor técnico de classe mundial com conhecimento profundo do nosso território.',
    quoteAuthor: 'B. Chiwale — Director-Geral & Fundador',
  },

  'Serviços': {
    type: 'servicos',
    title: 'Áreas de Especialização',
    tagline: 'Do subsolo à licença — sete serviços técnicos integrados para a indústria mineira angolana.',
    services: [
      { num: '01', label: 'Geologia e Prospecção Mineral', href: '/servicos/geologia-prospeccao', tags: 'Cartografia · Depósitos · JORC' },
      { num: '02', label: 'Geofísica Aplicada', href: '/servicos/geofisica-aplicada', tags: 'ERT · Sísmica · Magnetometria' },
      { num: '03', label: 'Engenharia Geotécnica', href: '/servicos/engenharia-geotecnica', tags: 'Fundações · Estabilidade · Sondagens' },
      { num: '04', label: 'Topografia e Geodesia', href: '/servicos/topografia-geodesia', tags: 'GNSS · UAV Drone · Batimetria' },
      { num: '05', label: 'Ambiente e Gestão Territorial', href: '/servicos/ambiente-gestao', tags: 'EIA · Monitoramento · Recuperação' },
      { num: '06', label: 'Exploração de Águas Subterrâneas', href: '/servicos/aguas-subterraneas', tags: 'Aquíferos · Furos · Hidrogeologia' },
      { num: '07', label: 'Consultoria e Tramitação Mineira', href: '/servicos/consultoria-tramitacao', tags: 'MIREMPET · Licenciamento · Direitos' },
    ],
    image: 'https://bchiwale.ao/wp-content/uploads/2025/04/chiwale1section.webp',
    imageAlt: 'Geólogos B-CHIWALE em trabalho de campo',
  },

  'Portfolio': {
    type: 'portfolio',
    title: 'Portfolio de Projectos',
    tagline: 'Mais de 50 projectos concluídos em 18 províncias angolanas.',
    filters: [
      { label: 'Todos os Projectos', href: '/portfolio', desc: '50+ projectos documentados' },
      { label: 'Por Serviço', href: '/portfolio?filter=servico', desc: 'Geologia, Geofísica, Geotecnia…' },
      { label: 'Por Região / Província', href: '/portfolio?filter=provincia', desc: 'Luanda, Malanje, Lunda Norte…' },
      { label: 'Por Período', href: '/portfolio?filter=periodo', desc: '2017 – 2025' },
    ],
    featured: [
      {
        title: 'Prospecção Mineral — Bacia Sedimentar Norte',
        service: 'Geologia',
        province: 'Luanda',
        image: 'https://bchiwale.ao/wp-content/uploads/2024/06/project-1.jpg',
        href: '/portfolio',
      },
      {
        title: 'Levantamento ERT — Aquífero Regional',
        service: 'Geofísica',
        province: 'Malanje',
        image: 'https://bchiwale.ao/wp-content/uploads/2024/06/project2.jpg',
        href: '/portfolio',
      },
    ],
  },

  'Blog': {
    type: 'blog',
    title: 'Blog & Conhecimento',
    tagline: 'Artigos técnicos, guias e análises do sector de geociências em Angola.',
    categories: [
      { label: 'Artigos Técnicos', href: '/blog?cat=tecnico', desc: 'Geologia · Geofísica · Geotecnia' },
      { label: 'Webinars & Eventos', href: '/blog?cat=webinars', desc: 'Formação e partilha de conhecimento' },
      { label: 'Guias e Whitepapers', href: '/blog?cat=guias', desc: 'Documentos de referência sectorial' },
      { label: 'Notícias do Sector', href: '/blog?cat=noticias', desc: 'Mineração e ambiente em Angola' },
    ],
    recent: [
      {
        title: 'Como funciona a estimativa de recursos minerais segundo o JORC',
        date: 'Jun 2025',
        image: 'https://bchiwale.ao/wp-content/uploads/2024/06/service1.jpg',
        href: '/blog',
      },
      {
        title: 'Guia prático: Licença de Prospecção Mineira em Angola',
        date: 'Mai 2025',
        image: 'https://bchiwale.ao/wp-content/uploads/2024/06/service-baner.jpg',
        href: '/blog',
      },
    ],
  },
};

// ─── Mega menu panels ──────────────────────────────────────────────────────────

function MegaSobre({ data, onClose }) {
  return (
    <div className="grid grid-cols-[220px_1fr_260px] min-h-[300px]">
      {/* Left — dark panel */}
      <div className="bg-charcoal p-8 flex flex-col justify-between">
        <div>
          <p className="font-mono text-[10px] text-cyan/70 tracking-widest3 uppercase mb-3">B-CHIWALE</p>
          <h3 className="font-heading font-bold text-white text-xl leading-snug mb-3">
            {data.title}
          </h3>
          <p className="font-body text-white/50 text-sm leading-relaxed">{data.tagline}</p>
        </div>
        
      </div>

      {/* Middle — section links */}
      <div className="p-8 grid grid-cols-2 gap-x-8 gap-y-0 content-start border-r border-gray-mid">
        {data.sections.map((section) => (
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
                      {link.label}
                    </span>
                    <span className="font-body text-charcoal/45 text-xs mt-0.5">{link.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="col-span-2 mt-4 pt-4 border-t border-gray-mid">
          <Link to="/sobre-nos" onClick={onClose} className="inline-flex items-center gap-2 font-mono text-xs text-cyan tracking-widest3 uppercase hover:gap-3 transition-all duration-200">
            Ver tudo sobre nós <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Right — DG quote card */}
      <div className="p-8 bg-gray-light flex flex-col justify-between">
        <div>
          <span className="font-heading font-extrabold text-cyan/20 leading-none text-6xl select-none block -mb-2" aria-hidden="true">"</span>
          <p className="font-heading font-bold text-charcoal text-sm leading-snug mt-2 mb-4">
            {data.quote}
          </p>
          <p className="font-mono text-[10px] text-charcoal/40 tracking-widest3 uppercase">{data.quoteAuthor}</p>
        </div>
        <Link
          to="/contacto"
          onClick={onClose}
          className="mt-6 block text-center bg-cyan text-white font-mono text-[11px] tracking-widest3 uppercase py-3 px-4 hover:bg-[#009ed8] transition-colors duration-200"
        >
          Falar com a equipa
        </Link>
      </div>
    </div>
  );
}

function MegaServicos({ data, onClose }) {
  return (
    <div className="grid grid-cols-[200px_1fr_240px] min-h-[340px]">
      {/* Left — dark panel */}
      <div className="bg-charcoal p-8 flex flex-col justify-between">
        <div>
          <p className="font-mono text-[10px] text-cyan/70 tracking-widest3 uppercase mb-3">O QUE FAZEMOS</p>
          <h3 className="font-heading font-bold text-white text-xl leading-snug mb-3">{data.title}</h3>
          <p className="font-body text-white/50 text-sm leading-relaxed">{data.tagline}</p>
        </div>
        <Link
          to="/servicos"
          onClick={onClose}
          className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] text-yellow tracking-widest3 uppercase hover:gap-3 transition-all duration-200"
        >
          Todos os serviços <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Middle — service list */}
      <div className="p-6 border-r border-gray-mid">
        <p className="font-mono text-[10px] text-charcoal/35 tracking-widest3 uppercase mb-4 pb-2 border-b border-gray-mid">
          7 Áreas de Actuação
        </p>
        <ul className="space-y-0.5">
          {data.services.map((s) => (
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
            src={data.image}
            alt={data.imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <p className="font-mono text-[10px] text-white/50 tracking-widest3 uppercase mb-1">B-CHIWALE · Campo</p>
            <p className="font-heading font-bold text-white text-sm leading-snug">
              Trabalho de campo com equipamentos de última geração
            </p>
          </div>
        </div>
        <Link
          to="/contacto"
          onClick={onClose}
          className="block text-center bg-yellow text-charcoal font-mono text-[11px] tracking-widest3 uppercase py-4 px-4 hover:bg-[#e0b000] transition-colors duration-200 font-bold"
        >
          SOLICITAR PROPOSTA
        </Link>
      </div>
    </div>
  );
}

function MegaPortfolio({ data, onClose }) {
  return (
    <div className="grid grid-cols-[200px_1fr] min-h-[280px]">
      {/* Left — dark panel */}
      <div className="bg-charcoal p-8 flex flex-col justify-between">
        <div>
          <p className="font-mono text-[10px] text-cyan/70 tracking-widest3 uppercase mb-3">TRABALHO DE CAMPO</p>
          <h3 className="font-heading font-bold text-white text-xl leading-snug mb-3">{data.title}</h3>
          <p className="font-body text-white/50 text-sm leading-relaxed">{data.tagline}</p>
        </div>
        <div className="mt-6 space-y-1">
          {data.filters.map((f) => (
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
          Projectos em Destaque
        </p>
        <div className="grid grid-cols-2 gap-5">
          {data.featured.map((p) => (
            <Link
              key={p.title}
              to={p.href}
              onClick={onClose}
              className="group block border border-gray-mid overflow-hidden hover:shadow-card-hover transition-shadow duration-200"
            >
              <div className="relative overflow-hidden" style={{ height: '140px' }}>
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-all duration-300 flex items-center justify-center">
                  <span className="font-mono text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity tracking-widest3 uppercase">
                    Ver projecto →
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan" />
              </div>
              <div className="p-3">
                <div className="flex gap-1.5 mb-1.5">
                  <span className="font-mono text-[9px] bg-cyan/10 text-cyan border border-cyan/30 px-1.5 py-0.5 uppercase tracking-wide">
                    {p.service}
                  </span>
                  <span className="font-mono text-[9px] bg-yellow/10 text-[#a07800] border border-yellow/30 px-1.5 py-0.5 uppercase tracking-wide">
                    {p.province}
                  </span>
                </div>
                <p className="font-body font-semibold text-charcoal text-xs leading-snug group-hover:text-cyan transition-colors">
                  {p.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-gray-mid">
          <Link to="/portfolio" onClick={onClose} className="inline-flex items-center gap-2 font-mono text-xs text-cyan tracking-widest3 uppercase hover:gap-3 transition-all duration-200">
            Ver portfolio completo <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MegaBlog({ data, onClose }) {
  return (
    <div className="grid grid-cols-[200px_1fr] min-h-[260px]">
      {/* Left — dark panel */}
      <div className="bg-charcoal p-8 flex flex-col justify-between">
        <div>
          <p className="font-mono text-[10px] text-cyan/70 tracking-widest3 uppercase mb-3">CONHECIMENTO TÉCNICO</p>
          <h3 className="font-heading font-bold text-white text-xl leading-snug mb-3">{data.title}</h3>
          <p className="font-body text-white/50 text-sm leading-relaxed">{data.tagline}</p>
        </div>
        <div className="mt-6 space-y-1">
          {data.categories.map((c) => (
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
          Artigos Recentes
        </p>
        <div className="grid grid-cols-2 gap-5">
          {data.recent.map((a) => (
            <Link
              key={a.title}
              to={a.href}
              onClick={onClose}
              className="group block border border-gray-mid overflow-hidden hover:shadow-card-hover transition-shadow duration-200"
            >
              <div className="relative overflow-hidden" style={{ height: '120px' }}>
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan" />
              </div>
              <div className="p-3">
                <p className="font-mono text-[9px] text-cyan/70 tracking-widest3 uppercase mb-1">{a.date}</p>
                <p className="font-body font-semibold text-charcoal text-xs leading-snug group-hover:text-cyan transition-colors">
                  {a.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-gray-mid">
          <Link to="/blog" onClick={onClose} className="inline-flex items-center gap-2 font-mono text-xs text-cyan tracking-widest3 uppercase hover:gap-3 transition-all duration-200">
            Ver todos os artigos <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// Renders the correct mega menu panel based on label
function MegaPanel({ label, onClose }) {
  const data = MEGA_DATA[label];
  if (!data) return null;
  if (data.type === 'sobre') return <MegaSobre data={data} onClose={onClose} />;
  if (data.type === 'servicos') return <MegaServicos data={data} onClose={onClose} />;
  if (data.type === 'portfolio') return <MegaPortfolio data={data} onClose={onClose} />;
  if (data.type === 'blog') return <MegaBlog data={data} onClose={onClose} />;
  return null;
}

// Simple dropdown for items without mega menu (Portfolio nav label → uses mega, but Blog uses mega too)
// Fallback for any item with dropdown that isn't in MEGA_DATA
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
const SEARCH_INDEX = [
  { type: 'Páginas',   label: 'Home',               subtitle: 'Página inicial',                     href: '/' },
  { type: 'Páginas',   label: 'Sobre Nós',           subtitle: 'História, equipa e certificações',   href: '/sobre-nos' },
  { type: 'Páginas',   label: 'Portfolio',            subtitle: 'Mais de 50 projectos concluídos',   href: '/portfolio' },
  { type: 'Páginas',   label: 'Blog & Conhecimento',  subtitle: 'Artigos técnicos e guias',          href: '/blog' },
  { type: 'Páginas',   label: 'Galeria',              subtitle: 'Imagens de campo',                  href: '/galeria' },
  { type: 'Páginas',   label: 'Recursos',             subtitle: 'Downloads e documentos',            href: '/recursos' },
  { type: 'Páginas',   label: 'Contacto',             subtitle: 'Fale connosco',                     href: '/contacto' },
  { type: 'Páginas',   label: 'Carreiras',            subtitle: 'Trabalhe connosco',                 href: '/carreiras' },
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

const POPULAR = [
  { label: 'Geologia e Prospecção',     href: '/servicos/geologia-prospeccao' },
  { label: 'Geofísica Aplicada',        href: '/servicos/geofisica-aplicada' },
  { label: 'Engenharia Geotécnica',     href: '/servicos/engenharia-geotecnica' },
  { label: 'Portfolio de Projectos',    href: '/portfolio' },
  { label: 'Solicitar Proposta',        href: '/contacto' },
];

// ─── Nav items (local, no longer imported from siteData for labels) ──────────
const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  {
    label: 'Sobre Nós',
    href: '/sobre-nos',
    mega: true,
  },
  {
    label: 'Serviços',
    href: '/servicos',
    mega: true,
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
    mega: true,
  },
  { label: 'Galeria', href: '/galeria' },
  {
    label: 'Blog',
    href: '/blog',
    mega: true,
  },
  { label: 'Recursos', href: '/recursos' },
  { label: 'Contacto', href: '/contacto' },
];

// Mobile sub-items for drawer
const MOBILE_SUBITEMS = {
  'Sobre Nós': [
    { label: 'História & Marcos', href: '/sobre-nos#historia' },
    { label: 'Missão, Visão e Valores', href: '/sobre-nos#missao' },
    { label: 'Equipa de Liderança', href: '/sobre-nos#equipa' },
    { label: 'Certificações', href: '/sobre-nos#certificacoes' },
    { label: 'Responsabilidade Social', href: '/sobre-nos#rse' },
  ],
  'Serviços': [
    { label: 'Geologia e Prospecção Mineral', href: '/servicos/geologia-prospeccao' },
    { label: 'Geofísica Aplicada', href: '/servicos/geofisica-aplicada' },
    { label: 'Engenharia Geotécnica', href: '/servicos/engenharia-geotecnica' },
    { label: 'Topografia e Geodesia', href: '/servicos/topografia-geodesia' },
    { label: 'Ambiente e Gestão Territorial', href: '/servicos/ambiente-gestao' },
    { label: 'Exploração de Águas Subterrâneas', href: '/servicos/aguas-subterraneas' },
    { label: 'Consultoria e Tramitação Mineira', href: '/servicos/consultoria-tramitacao' },
  ],
  'Portfolio': [
    { label: 'Todos os Projectos', href: '/portfolio' },
    { label: 'Por Serviço', href: '/portfolio?filter=servico' },
    { label: 'Por Região / Província', href: '/portfolio?filter=provincia' },
  ],
  'Blog': [
    { label: 'Artigos Técnicos', href: '/blog?cat=tecnico' },
    { label: 'Webinars & Eventos', href: '/blog?cat=webinars' },
    { label: 'Guias e Whitepapers', href: '/blog?cat=guias' },
    { label: 'Notícias do Sector', href: '/blog?cat=noticias' },
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

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter((item) =>
      item.label.toLowerCase().includes(q) ||
      item.subtitle?.toLowerCase().includes(q) ||
      item.keywords?.toLowerCase().includes(q)
    ).slice(0, 20);
  }, [query]);

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

  const handleMouseEnter = (label) => {
    clearTimeout(closeTimer.current);
    if (MEGA_DATA[label]) setOpenMega(label);
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

              {/* Desktop nav — visible from xl (1280px) up to avoid cramping */}
              <ul className="hidden xl:flex items-center gap-0" role="list">
                {NAV_ITEMS.map((item) => (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.mega ? (
                      <button
                        className={`flex items-center gap-1 px-3 py-2 text-[13px] font-body font-medium transition-colors duration-200 whitespace-nowrap
                                    ${openMega === item.label ? 'text-cyan' : isTransparent ? 'text-white/80 hover:text-white' : 'text-charcoal hover:text-cyan'}`}
                        aria-expanded={openMega === item.label}
                        aria-haspopup="true"
                        onClick={() => setOpenMega((v) => v === item.label ? null : item.label)}
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 shrink-0 ${openMega === item.label ? 'rotate-180 text-cyan' : ''}`}
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
                        {item.label}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>

              {/* Right actions — desktop */}
              <div className="hidden xl:flex items-center gap-3 shrink-0">
                <button
                  className={`p-2 transition-colors duration-500 ${isTransparent ? 'text-white/70 hover:text-white' : searchOpen ? 'text-cyan' : 'text-charcoal hover:text-cyan'}`}
                  aria-label="Pesquisar"
                  onClick={() => { if (searchOpen) { closeSearch(); } else { setSearchOpen(true); } }}
                >
                  <SearchIcon className="w-[18px] h-[18px]" />
                </button>
                <div className="flex items-center gap-1 font-mono font-medium" style={{ fontSize: '11px' }}>
                  <button className={`font-semibold transition-colors duration-500 ${isTransparent ? 'text-white/90 hover:text-white' : 'text-charcoal hover:text-cyan'}`}>PT</button>
                  <span className={`transition-colors duration-500 ${isTransparent ? 'text-white/20' : 'text-gray-mid'}`} aria-hidden="true">|</span>
                  <button className={`transition-colors duration-500 ${isTransparent ? 'text-white/45 hover:text-white' : 'text-gray-text hover:text-cyan'}`}>EN</button>
                </div>
                <Link
                  to="/contacto"
                  className="shrink-0 whitespace-nowrap inline-flex items-center font-body font-semibold
                             bg-cyan text-white border-2 border-cyan hover:bg-[#009ed8] hover:border-[#009ed8]
                             transition-all duration-300 focus:outline-none"
                  style={{ fontSize: '11px', letterSpacing: '0.08em', padding: '8px 18px', textTransform: 'uppercase' }}
                >
                  SOLICITAR PROPOSTA
                </Link>
              </div>

              {/* Hamburger — visible below xl */}
              <button
                className={`xl:hidden flex flex-col gap-1.5 p-2 transition-colors duration-500 ${isTransparent ? 'text-white' : 'text-charcoal'}`}
                aria-label={drawerOpen ? 'Fechar menu' : 'Abrir menu'}
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
                    placeholder="Pesquisar serviços, projectos, artigos, equipa…"
                    aria-label="Pesquisa"
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
                        Sem resultados para <strong className="text-charcoal/60">"{query}"</strong>
                      </p>
                      <p className="font-mono text-[10px] text-charcoal/25 tracking-wide mt-2 uppercase">
                        Tente "geologia", "ERT", "Luanda" ou "JORC"
                      </p>
                    </div>
                  )
                ) : (
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-charcoal/30 mb-3">Pesquisas populares</p>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR.map((p) => (
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
        {openMega && MEGA_DATA[openMega] && (
          <div
            className="absolute left-0 right-0 top-full bg-white border-t-[3px] border-cyan shadow-xl z-40 animate-fade-up"
            style={{ animationDuration: '150ms' }}
            onMouseEnter={() => { clearTimeout(closeTimer.current); }}
            onMouseLeave={handleMouseLeave}
            role="dialog"
            aria-label={`Submenu — ${openMega}`}
          >
            {/* Constrained width to match container */}
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
              <MegaPanel label={openMega} onClose={closeMega} />
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
          <button className="p-1 text-white/60 hover:text-white" onClick={() => setDrawerOpen(false)} aria-label="Fechar menu">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <ul className="py-2" role="list">
          {NAV_ITEMS.map((item) => {
            const subs = MOBILE_SUBITEMS[item.label];
            return (
              <li key={item.label} className="border-b border-gray-mid/50">
                {subs ? (
                  <>
                    <button
                      className="flex items-center justify-between w-full px-5 py-3.5 text-sm font-body font-medium text-charcoal hover:text-cyan transition-colors"
                      onClick={() => setOpenDrawerSub((v) => v === item.label ? null : item.label)}
                      aria-expanded={openDrawerSub === item.label}
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDrawerSub === item.label ? 'rotate-180 text-cyan' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openDrawerSub === item.label ? 'max-h-96' : 'max-h-0'}`}>
                      <ul className="bg-gray-light pb-2">
                        {subs.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              to={sub.href}
                              className="block px-8 py-2.5 text-sm text-gray-text hover:text-cyan border-l-2 border-transparent hover:border-cyan ml-5 transition-all duration-150"
                              onClick={() => setDrawerOpen(false)}
                            >
                              {sub.label}
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
                    {item.label}
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>

        <div className="p-5">
          <Link to="/contacto" className="btn-primary block text-center" onClick={() => setDrawerOpen(false)}>
            SOLICITAR PROPOSTA
          </Link>
        </div>

        {/* Drawer footer */}
        <div className="px-5 pb-5 pt-2 border-t border-gray-mid mt-2">
          <p className="font-mono text-[10px] text-charcoal/35 tracking-widest3 uppercase mb-1">Contacto Directo</p>
          <a href="tel:+244924073147" className="font-body text-sm text-charcoal hover:text-cyan transition-colors">
            +244 924 073 147
          </a>
        </div>
      </nav>
    </>
  );
}
