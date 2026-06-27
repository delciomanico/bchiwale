import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/siteData';

// ── Extended blog data ──
const ALL_POSTS = [
  {
    id: 1,
    category: 'Geologia',
    cat_type: 'tecnico',
    date: 'Junho 2025',
    dateTime: '2025-06',
    title: 'Como funciona a estimativa de recursos minerais segundo o padrão JORC',
    excerpt: 'Uma análise das etapas técnicas e documentais para classificação de recursos segundo o código JORC 2012, o padrão internacional de referência para relatórios de recursos e reservas minerais.',
    readTime: '8 min',
    featured: true,
  },
  {
    id: 2,
    category: 'Legislação',
    cat_type: 'noticias',
    date: 'Maio 2025',
    dateTime: '2025-05',
    title: 'Guia prático: como obter uma Licença de Prospecção Mineira em Angola',
    excerpt: 'O processo junto do MIREMPET passo a passo, com os documentos necessários, prazos esperados e os erros mais comuns a evitar.',
    readTime: '11 min',
    featured: false,
  },
  {
    id: 3,
    category: 'Geofísica',
    cat_type: 'tecnico',
    date: 'Abril 2025',
    dateTime: '2025-04',
    title: 'Tomografia Eléctrica (ERT): aplicações na exploração de aquíferos subterrâneos',
    excerpt: 'A resistividade eléctrica como método principal na localização de recursos hídricos subterrâneos — fundamentos, equipamentos e interpretação de resultados.',
    readTime: '9 min',
    featured: false,
  },
  {
    id: 4,
    category: 'Geotecnia',
    cat_type: 'tecnico',
    date: 'Março 2025',
    dateTime: '2025-03',
    title: 'SPT vs CPT: qual o ensaio geotécnico adequado para o seu projecto?',
    excerpt: 'Comparação técnica entre os dois principais ensaios de investigação do subsolo — quando usar cada um, vantagens e limitações em diferentes tipos de solo.',
    readTime: '7 min',
    featured: false,
  },
  {
    id: 5,
    category: 'Sustentabilidade',
    cat_type: 'guias',
    date: 'Fevereiro 2025',
    dateTime: '2025-02',
    title: 'Recuperação de áreas mineiras degradadas: boas práticas em Angola',
    excerpt: 'Um guia sobre as etapas de recuperação ambiental pós-lavra exigidas pela legislação angolana e padrões IFC, com exemplos práticos de projectos recentes.',
    readTime: '12 min',
    featured: false,
  },
  {
    id: 6,
    category: 'Notícias',
    cat_type: 'noticias',
    date: 'Janeiro 2025',
    dateTime: '2025-01',
    title: 'B-CHIWALE conclui campanha de prospecção de 1.200 km² na Lunda Sul',
    excerpt: 'A nossa equipa concluiu com êxito uma das maiores campanhas de mapeamento geológico da empresa, cobrindo 1.200 km² de área diamantífera no Leste de Angola.',
    readTime: '4 min',
    featured: false,
  },
  {
    id: 7,
    category: 'Topografia',
    cat_type: 'tecnico',
    date: 'Dezembro 2024',
    dateTime: '2024-12',
    title: 'Fotogrametria por drone UAV: da missão ao ortofotomapa em 5 etapas',
    excerpt: 'Processo completo de um levantamento fotogramétrico UAV — planeamento de voo, aquisição de imagens, georreferenciação e processamento em software especializado.',
    readTime: '10 min',
    featured: false,
  },
  {
    id: 8,
    category: 'Legislação',
    cat_type: 'guias',
    date: 'Novembro 2024',
    dateTime: '2024-11',
    title: 'Direitos mineiros em Angola: tipos, prazos e condições segundo a Lei 31/11',
    excerpt: 'Explicação clara dos diferentes títulos mineiros angolanos — Licença de Prospecção, Licença de Exploração, Licença de Lavra — e o que cada um autoriza.',
    readTime: '13 min',
    featured: false,
  },
];

const CATEGORIES = ['Todos', 'Geologia', 'Geofísica', 'Geotecnia', 'Topografia', 'Legislação', 'Sustentabilidade', 'Notícias'];

const CAT_TAG_CLASSES = {
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
      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: accent }} />
      <div className="absolute top-3 right-3 font-mono text-xs opacity-20" style={{ color: accent }}>B-CHW</div>
    </div>
  );
}

function PostCard({ post, index }) {
  return (
    <article
      className="reveal group bg-white border border-gray-mid flex flex-col transition-all duration-300
                 hover:shadow-card-hover hover:-translate-y-0.5"
      style={{ transitionDelay: `${(index % 4) * 60}ms` }}
      aria-labelledby={`post-title-${post.id}`}
    >
      <div className="overflow-hidden">
        <PostBg id={post.id} cat={post.category} />
      </div>
      <div className="p-7 flex flex-col flex-1 gap-3">
        <div className="flex items-center gap-3">
          <span className={CAT_TAG_CLASSES[post.category] || 'tag-gray'}>{post.category}</span>
          <span className="font-mono text-xs text-gray-text">{post.readTime} leitura</span>
        </div>
        <h3
          id={`post-title-${post.id}`}
          className="font-heading font-bold text-charcoal text-base leading-snug tracking-tight group-hover:text-cyan transition-colors"
        >
          {post.title}
        </h3>
        <p className="font-body text-gray-text text-xs leading-relaxed flex-1">{post.excerpt}</p>
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-mid">
          <time dateTime={post.dateTime} className="font-mono text-xs text-gray-text">{post.date}</time>
          <Link to="/contacto" className="font-mono text-xs text-cyan hover:underline">
            LER MAIS <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const featuredPost = ALL_POSTS.find((p) => p.featured);
  const regularPosts = ALL_POSTS.filter((p) => !p.featured);

  const filtered = activeCategory === 'Todos'
    ? regularPosts
    : regularPosts.filter((p) => p.category === activeCategory);

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
              <li className="text-white/60" aria-current="page">Blog & Conhecimento</li>
            </ol>
          </nav>
          <div className="section-rule" aria-hidden="true" />
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl tracking-tight mt-4">
            Conhecimento <em className="italic" style={{ color: '#00AEEF' }}>Técnico</em>
          </h1>
          <p className="font-body text-white/60 text-lg mt-3 max-w-xl">
            Artigos técnicos, guias práticos e notícias do sector geociências e mineração em Angola.
          </p>
        </div>
      </section>

      {/* Featured article */}
      {featuredPost && (
        <section className="section-pad bg-gray-light" aria-labelledby="featured-post-title">
          <div className="container">
            <div className="section-rule" aria-hidden="true" />
            <p className="eyebrow">ARTIGO EM DESTAQUE</p>
            <article className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-0 border border-gray-mid bg-white group
                                hover:shadow-card-hover transition-shadow duration-300">
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
                    <div className="font-mono font-bold text-8xl text-cyan opacity-[0.07] leading-none">JORC</div>
                    <div className="font-mono text-xs text-white/20 tracking-widest mt-2">B-CHIWALE · GEOLOGIA</div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan" />
              </div>
              {/* Content side */}
              <div className="p-10 flex flex-col justify-center gap-4">
                <div className="flex items-center gap-3">
                  <span className={CAT_TAG_CLASSES[featuredPost.category] || 'tag-gray'}>{featuredPost.category}</span>
                  <span className="font-mono text-xs text-gray-text">{featuredPost.readTime} leitura</span>
                </div>
                <h2
                  id="featured-post-title"
                  className="font-heading font-bold text-charcoal text-2xl leading-snug tracking-tight"
                >
                  {featuredPost.title}
                </h2>
                <p className="font-body text-gray-text text-sm leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-mid">
                  <time dateTime={featuredPost.dateTime} className="font-mono text-xs text-gray-text">{featuredPost.date}</time>
                  <Link to="/contacto" className="btn-link text-sm">
                    LER ARTIGO <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Category filters + grid */}
      <section className="section-pad" aria-label="Todos os artigos">
        <div className="container">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filtrar por categoria">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-xs tracking-widest px-4 py-2 border transition-colors ${
                  activeCategory === cat
                    ? 'bg-cyan text-white border-cyan'
                    : 'bg-white text-charcoal border-gray-mid hover:border-cyan hover:text-cyan'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Articles grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-gray-text">Nenhum artigo nesta categoria ainda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter signup strip */}
      <section className="py-16" style={{ backgroundColor: '#1A1A2E', borderTop: '4px solid #00AEEF' }}>
        <div className="container text-center">
          <div className="section-rule mx-auto" aria-hidden="true" />
          <p className="eyebrow text-cyan">MANTENHA-SE ACTUALIZADO</p>
          <h2 className="font-heading font-bold text-white text-2xl md:text-3xl tracking-tight mt-2 mb-3">
            Novos artigos e <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>notícias do sector</em>
          </h2>
          <p className="font-body text-white/50 text-sm mb-8 max-w-md mx-auto">
            Subscreva para receber alertas sobre novos artigos técnicos, guias e actualizações regulatórias sobre mineração e geociências em Angola.
          </p>
          <Link to="/contacto" className="btn-primary">
            FALAR COM A NOSSA EQUIPA <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
