import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS, ALL_BLOG_POSTS, BLOG_BLOG_CATEGORIES } from '../data/siteData';

const CAT_TAG_CLASS = {
  Geologia: 'tag-cyan',
  Geofísica: 'tag-cyan',
  Geotecnia: 'tag-cyan',
  Topografia: 'tag-cyan',
  Legislação: 'tag-yellow',
  Sustentabilidade: 'tag-gray',
  Notícias: 'tag-yellow',
};

// Designed placeholder for blog card images
function PostBg({ id, cat }) {
  const bgs = {
    Geologia: { bg: '#0d1829', accent: '#00AEEF' },
    Geofísica: { bg: '#0d1a1a', accent: '#00AEEF' },
    Geotecnia: { bg: '#1a1a2e', accent: '#F5C200' },
    Topografia: { bg: '#0a1520', accent: '#00AEEF' },
    Legislação: { bg: '#1a140a', accent: '#F5C200' },
    Sustentabilidade: { bg: '#0a1a0a', accent: '#00AEEF' },
    Notícias: { bg: '#1a1a0d', accent: '#F5C200' },
  };
  const { bg, accent } = bgs[cat] || { bg: '#1A1A2E', accent: '#00AEEF' };
  return (
    <div className="w-full h-40 relative overflow-hidden" style={{ backgroundColor: bg }} aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 24px, ${accent}18 24px, ${accent}18 25px)`,
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ backgroundColor: accent, opacity: 0.35 }} />
      <div className="absolute top-3 right-3 font-mono text-xs opacity-15" style={{ color: accent }}>B-CHW</div>
    </div>
  );
}

// Borderless post card
function PostCard({ post, index }) {
  return (
    <article
      className="reveal group bg-white flex flex-col transition-all duration-300
                 hover:shadow-[0_6px_24px_rgba(0,0,0,0.07)] hover:-translate-y-0.5"
      style={{ transitionDelay: `${(index % 4) * 60}ms` }}
      aria-labelledby={`post-title-${post.id}`}
    >
      <div className="overflow-hidden">
        <PostBg id={post.id} cat={post.category} />
      </div>
      <div className="p-7 flex flex-col flex-1 gap-3">
        <div className="flex items-center gap-4">
          <span className={CAT_TAG_CLASS[post.category] || 'tag-gray'}>{post.category}</span>
          <span className="font-mono text-[10px] text-charcoal/35 tracking-[0.12em]">{post.readTime} leitura</span>
        </div>
        <h3
          id={`post-title-${post.id}`}
          className="font-heading font-semibold text-charcoal text-base leading-snug tracking-tight
                     group-hover:text-cyan transition-colors"
        >
          {post.title}
        </h3>
        <p className="font-body text-gray-text text-xs leading-relaxed flex-1">{post.excerpt}</p>
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-charcoal/8">
          <time dateTime={post.dateTime} className="font-mono text-[10px] text-charcoal/35 tracking-[0.12em]">
            {post.date}
          </time>
          <Link
            to={`/blog/${post.slug}`}
            className="font-mono text-[10px] text-cyan hover:underline tracking-[0.12em]"
          >
            Ler mais <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
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

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const featuredPost = ALL_BLOG_POSTS.find((p) => p.featured);
  const regularPosts = ALL_BLOG_POSTS.filter((p) => !p.featured);

  const filtered = activeCategory === 'Todos'
    ? regularPosts
    : regularPosts.filter((p) => p.category === activeCategory);

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
              <li className="text-white/60" aria-current="page">Blog & Conhecimento</li>
            </ol>
          </nav>
          <h1 className="font-heading font-semibold text-white text-4xl md:text-5xl tracking-tight">
            Conhecimento <em className="italic" style={{ color: '#00AEEF' }}>Técnico</em>
          </h1>
          <p className="font-body text-white/55 text-lg mt-4 max-w-xl leading-relaxed">
            Artigos técnicos, guias práticos e notícias do sector geociências e mineração em Angola.
          </p>
        </div>
      </section>

      {/* Featured article — white background, editorial side-by-side */}
      {featuredPost && (
        <section className="section-pad bg-white border-b border-charcoal/8" aria-labelledby="featured-post-title">
          <div className="container">
            <p className="eyebrow">ARTIGO EM DESTAQUE</p>
            <article
              className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white
                         hover:shadow-[0_6px_24px_rgba(0,0,0,0.07)] transition-shadow duration-300 group"
            >
              {/* Visual side */}
              <div className="min-h-[280px] relative overflow-hidden" style={{ backgroundColor: '#0d1829' }} aria-hidden="true">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 34px, #00AEEF14 34px, #00AEEF14 35px)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-mono font-bold text-8xl text-cyan opacity-[0.06] leading-none">JORC</div>
                    <div className="font-mono text-xs text-white/15 tracking-widest mt-2">B-CHIWALE · GEOLOGIA</div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-cyan opacity-30" />
              </div>
              {/* Content side */}
              <div className="p-10 flex flex-col justify-center gap-4">
                <div className="flex items-center gap-4">
                  <span className={CAT_TAG_CLASS[featuredPost.category] || 'tag-gray'}>
                    {featuredPost.category}
                  </span>
                  <span className="font-mono text-[10px] text-charcoal/35 tracking-[0.12em]">
                    {featuredPost.readTime} leitura
                  </span>
                </div>
                <h2
                  id="featured-post-title"
                  className="font-heading font-semibold text-charcoal text-2xl leading-snug tracking-tight"
                >
                  {featuredPost.title}
                </h2>
                <p className="font-body text-gray-text text-sm leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-charcoal/8">
                  <time dateTime={featuredPost.dateTime} className="font-mono text-[10px] text-charcoal/35 tracking-[0.12em]">
                    {featuredPost.date}
                  </time>
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="font-body font-medium text-charcoal border-b border-charcoal/25
                               hover:text-cyan hover:border-cyan transition-colors pb-0.5 text-[14px]"
                  >
                    Ler artigo <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Category filters + grid */}
      <section className="section-pad bg-white" aria-label="Todos os artigos">
        <div className="container">
          {/* Underline filter tabs */}
          <div className="flex flex-wrap gap-6 mb-12" role="group" aria-label="Filtrar por categoria">
            {BLOG_CATEGORIES.map((cat) => (
              <FilterBtn
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>

          {/* Articles grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-gray-text">Nenhum artigo nesta categoria ainda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter / CTA strip */}
      <section className="py-16 bg-charcoal border-t border-white/5">
        <div className="container text-center">
          <p className="eyebrow" style={{ color: '#00AEEF' }}>MANTENHA-SE ACTUALIZADO</p>
          <h2 className="font-heading font-semibold text-white text-2xl md:text-3xl tracking-tight mt-2 mb-3">
            Novos artigos e <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>notícias do sector</em>
          </h2>
          <p className="font-body text-white/45 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Subscreva para receber alertas sobre novos artigos técnicos, guias e actualizações regulatórias
            sobre mineração e geociências em Angola.
          </p>
          <Link
            to="/contacto"
            className="font-body font-medium text-white border-b border-white
                       hover:text-cyan hover:border-cyan transition-colors pb-0.5 text-[15px]"
          >
            Falar com a nossa equipa <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
