import { useState } from 'react';
import { Link } from 'react-router-dom';

// ── Gallery data — designed placeholders since no photos available yet ──
const GALLERY_ITEMS = [
  { id: 1, cat: 'Campo', title: 'Amostragem Geoquímica — Lunda Norte', province: 'Lunda Norte', accent: '#00AEEF', bg: '#0d1829' },
  { id: 2, cat: 'Equipamentos', title: 'Equipamento ERT em Operação', province: 'Malanje', accent: '#F5C200', bg: '#1a1a0d' },
  { id: 3, cat: 'Campo', title: 'Mapeamento Geológico de Detalhe', province: 'Bié', accent: '#00AEEF', bg: '#0d1a1a' },
  { id: 4, cat: 'Laboratório', title: 'Análise de Amostras de Solo', province: 'Luanda', accent: '#F5C200', bg: '#1a0d0d' },
  { id: 5, cat: 'UAV', title: 'Levantamento Fotogramétrico UAV', province: 'Huambo', accent: '#00AEEF', bg: '#0d1829' },
  { id: 6, cat: 'Furos', title: 'Execução de Furo Tubular — 120m', province: 'Cunene', accent: '#F5C200', bg: '#0d1a0d' },
  { id: 7, cat: 'Campo', title: 'Campanha de Prospecção Diamantífera', province: 'Lunda Sul', accent: '#00AEEF', bg: '#1a1a2e' },
  { id: 8, cat: 'Equipamentos', title: 'Estação Total Robótica em Uso', province: 'Benguela', accent: '#F5C200', bg: '#1a1a0a' },
  { id: 9, cat: 'Campo', title: 'Ensaio SPT em Obra Civil', province: 'Luanda', accent: '#00AEEF', bg: '#0d1520' },
  { id: 10, cat: 'Laboratório', title: 'Ensaio de Granulometria de Solo', province: 'Benguela', accent: '#F5C200', bg: '#1a0d1a' },
  { id: 11, cat: 'UAV', title: 'Ortofotomapa — Zona Industrial', province: 'Huíla', accent: '#00AEEF', bg: '#0a1a15' },
  { id: 12, cat: 'Furos', title: 'Sondagem Geotécnica — 60m', province: 'Cabinda', accent: '#F5C200', bg: '#1a0a0a' },
];

const CATEGORIES = ['Todos', 'Campo', 'Laboratório', 'UAV', 'Equipamentos', 'Furos'];

// Designed placeholder card — replicates a photo grid tile without images
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
      {/* Diagonal accent stripe */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${item.accent}22 0%, transparent 50%, ${item.accent}0a 100%)`,
        }}
        aria-hidden="true"
      />
      {/* Bottom-left accent bar */}
      <div
        className="absolute bottom-0 left-0 w-12 h-0.5 transition-all duration-300 group-hover:w-full"
        style={{ backgroundColor: item.accent }}
        aria-hidden="true"
      />
      {/* Label overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <span className="font-mono text-xs tracking-widest opacity-50" style={{ color: item.accent }}>{item.cat.toUpperCase()}</span>
        <span className="font-mono font-bold text-xs tracking-widest mt-1 opacity-20" style={{ color: item.accent }}>B-CHW</span>
      </div>
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/70 transition-all duration-300 flex items-end p-5">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left">
          <span className="tag-cyan mb-2 inline-block">{item.cat}</span>
          <p className="font-heading font-bold text-white text-sm leading-tight">{item.title}</p>
          <p className="font-mono text-xs text-white/50 mt-1">{item.province}</p>
        </div>
      </div>
    </button>
  );
}

// Simplified lightbox (CSS-only approach, no external lib)
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
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 font-mono text-white/60 hover:text-white transition-colors text-sm"
          aria-label="Fechar lightbox"
        >
          FECHAR ×
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
            style={{ background: `linear-gradient(135deg, ${item.accent}30 0%, transparent 60%)` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="font-mono font-bold text-6xl opacity-10" style={{ color: item.accent }}>B-CHW</div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: item.accent }} />
        </div>
        {/* Caption */}
        <div className="border border-t-0 border-white/10 bg-charcoal p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="tag-cyan">{item.cat}</span>
              <h3 className="font-heading font-bold text-white text-lg mt-2">{item.title}</h3>
              <p className="font-mono text-xs text-white/40 mt-1">{item.province} · B-CHIWALE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      {/* Hero */}
      <section
        className="min-h-[calc(40vh+72px)] flex items-end pb-16"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 60%, #0d1829 100%)', borderBottom: '3px solid #00AEEF', paddingTop: '72px' }}
      >
        <div className="container">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-mono text-xs text-white/40">
              <li><Link to="/" className="hover:text-cyan transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li className="text-white/60" aria-current="page">Galeria</li>
            </ol>
          </nav>
          <div className="section-rule" aria-hidden="true" />
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl tracking-tight mt-4">
            Galeria de <em className="italic" style={{ color: '#00AEEF' }}>Campo</em>
          </h1>
          <p className="font-body text-white/60 text-lg mt-3 max-w-xl">
            Registos fotográficos de campanhas, equipamentos, trabalho laboratorial e operações em curso.
          </p>
        </div>
      </section>

      {/* Category filters */}
      <section className="py-8 bg-gray-light border-b border-gray-mid" aria-label="Filtros de categoria">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-xs tracking-widest px-5 py-2.5 border transition-colors ${
                  activeCategory === cat
                    ? 'bg-cyan text-white border-cyan'
                    : 'bg-white text-charcoal border-gray-mid hover:border-cyan hover:text-cyan'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
            <span className="ml-auto flex items-center font-body text-gray-text text-sm">
              {filtered.length} {filtered.length === 1 ? 'imagem' : 'imagens'}
            </span>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-pad" aria-label="Galeria de imagens">
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
      <div className="py-8 bg-gray-light border-t border-gray-mid">
        <div className="container text-center">
          <p className="font-body text-gray-text text-sm max-w-lg mx-auto">
            As fotografias desta galeria serão actualizadas com material real das nossas campanhas e projectos.
            Para imagens específicas de um projecto, contacte-nos.
          </p>
          <Link to="/contacto" className="btn-link mt-4 inline-block">
            CONTACTAR <span aria-hidden="true">→</span>
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
