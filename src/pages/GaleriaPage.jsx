import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GALLERY_ITEMS, GALLERY_GALLERY_CATEGORIES } from '../data/siteData';

// Designed placeholder tile
function GalleryTile({ item, onClick }) {
  return (
    <button
      onClick={() => onClick(item)}
      className="group relative w-full aspect-square overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2"
      aria-label={`Ver detalhe: ${item.title}`}
    >
      {/* Background */}
      <div
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundColor: item.bg }}
      />
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 29px, ${item.accent}18 29px, ${item.accent}18 30px),
                            repeating-linear-gradient(90deg, transparent, transparent 29px, ${item.accent}18 29px, ${item.accent}18 30px)`,
        }}
        aria-hidden="true"
      />
      {/* Diagonal accent */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(135deg, ${item.accent}1a 0%, transparent 50%, ${item.accent}08 100%)` }}
        aria-hidden="true"
      />
      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 w-8 h-px transition-all duration-300 group-hover:w-full"
        style={{ backgroundColor: item.accent, opacity: 0.6 }}
        aria-hidden="true"
      />
      {/* Subtle category label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <span className="font-mono text-[9px] tracking-[0.2em] opacity-40" style={{ color: item.accent }}>
          {item.cat.toUpperCase()}
        </span>
      </div>
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/75 transition-all duration-300 flex items-end p-5">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left">
          <span className="font-mono text-[9px] tracking-[0.18em] uppercase mb-2 block" style={{ color: item.accent }}>
            {item.cat}
          </span>
          <p className="font-heading font-semibold text-white text-sm leading-tight">{item.title}</p>
          <p className="font-mono text-[10px] text-white/45 mt-1 tracking-[0.12em]">{item.province}</p>
        </div>
      </div>
    </button>
  );
}

// Lightbox
function Lightbox({ item, onClose }) {
  if (!item) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(10,10,20,0.96)' }}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 font-mono text-white/50 hover:text-white transition-colors text-[11px] tracking-[0.15em] uppercase"
          aria-label="Fechar lightbox"
        >
          Fechar ×
        </button>
        {/* Enlarged placeholder */}
        <div
          className="w-full"
          style={{ aspectRatio: '16/9', backgroundColor: item.bg, position: 'relative', overflow: 'hidden' }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, ${item.accent}22 39px, ${item.accent}22 40px),
                                repeating-linear-gradient(90deg, transparent, transparent 39px, ${item.accent}22 39px, ${item.accent}22 40px)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${item.accent}28 0%, transparent 60%)` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-mono font-bold text-6xl opacity-[0.07]" style={{ color: item.accent }}>B-CHW</div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ backgroundColor: item.accent, opacity: 0.4 }} />
        </div>
        {/* Caption */}
        <div className="border-t-0 bg-charcoal p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-mono text-[9px] tracking-[0.18em] uppercase mb-2 block" style={{ color: item.accent }}>
                {item.cat}
              </span>
              <h3 className="font-heading font-semibold text-white text-lg">{item.title}</h3>
              <p className="font-mono text-[10px] text-white/35 mt-1 tracking-[0.12em]">{item.province} · B-CHIWALE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Underline-style filter button
function FilterBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`font-mono text-[10px] tracking-[0.18em] uppercase pb-1 border-b transition-colors ${
        active
          ? 'border-charcoal text-charcoal'
          : 'border-transparent text-charcoal/40 hover:text-charcoal hover:border-charcoal/30'
      }`}
    >
      {label}
    </button>
  );
}

export default function GaleriaPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [lightboxItem, setLightboxItem] = useState(null);

  const filtered = activeCategory === 'Todos'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.cat === activeCategory);

  return (
    <>
      {/* Page hero */}
      <section
        className="min-h-[calc(40vh+72px)] flex items-end pb-16"
        style={{
          background: 'linear-gradient(135deg, #1A1A2E 60%, #0d1829 100%)',
          borderBottom: '1px solid rgba(0,174,239,0.2)',
          paddingTop: '72px',
        }}
      >
        <div className="container">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-mono text-xs text-white/40">
              <li><Link to="/" className="hover:text-cyan transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li className="text-white/60" aria-current="page">Galeria</li>
            </ol>
          </nav>
          <h1 className="font-heading font-semibold text-white text-4xl md:text-5xl tracking-tight">
            Galeria de <em className="italic" style={{ color: '#00AEEF' }}>Campo</em>
          </h1>
          <p className="font-body text-white/55 text-lg mt-4 max-w-xl leading-relaxed">
            Registos fotográficos de campanhas, equipamentos, trabalho laboratorial e operações em curso.
          </p>
        </div>
      </section>

      {/* Category filters — white background, hairline border */}
      <section className="py-6 bg-white border-b border-charcoal/8" aria-label="Filtros de categoria">
        <div className="container">
          <div className="flex flex-wrap items-center gap-6">
            {GALLERY_CATEGORIES.map((cat) => (
              <FilterBtn
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
            <span className="ml-auto font-mono text-[10px] text-charcoal/35 tracking-[0.12em]">
              {filtered.length} {filtered.length === 1 ? 'imagem' : 'imagens'}
            </span>
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="section-pad bg-white" aria-label="Galeria de imagens">
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {filtered.map((item) => (
              <GalleryTile key={item.id} item={item} onClick={setLightboxItem} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="font-body text-gray-text">Nenhuma imagem nesta categoria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Note on photos */}
      <div className="py-8 bg-white border-t border-charcoal/8">
        <div className="container text-center">
          <p className="font-body text-gray-text text-sm max-w-lg mx-auto leading-relaxed">
            As fotografias desta galeria serão actualizadas com material real das nossas campanhas e projectos.
            Para imagens específicas de um projecto, contacte-nos.
          </p>
          <Link
            to="/contacto"
            className="font-body font-medium text-charcoal border-b border-charcoal/25
                       hover:text-cyan hover:border-cyan transition-colors pb-0.5 text-[14px]
                       mt-5 inline-block"
          >
            Contactar <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </>
  );
}
