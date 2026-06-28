import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/siteData';

function ArticleCard({ post, index }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="reveal group block bg-white border border-gray-mid overflow-hidden
                 transition-shadow duration-300 hover:shadow-card-hover"
      style={{ transitionDelay: `${index * 80}ms` }}
      aria-label={`Ler artigo: ${post.title}`}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ height: '200px' }}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Category badge over image */}
        <div className="absolute top-4 left-4">
          <span className="font-mono text-[10px] tracking-widest3 uppercase px-2.5 py-1
                           bg-cyan text-white">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3">
        <time
          className="font-mono text-[11px] text-charcoal/35 tracking-widest3 uppercase"
          dateTime={post.dateTime}
        >
          {post.date}
        </time>
        <h3
          className="font-heading font-bold text-charcoal leading-snug tracking-tight
                     group-hover:text-cyan transition-colors duration-300"
          style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)' }}
        >
          {post.title}
        </h3>
        <p className="font-body text-charcoal/55 text-sm leading-relaxed">
          {post.excerpt}
        </p>
        <span className="font-mono text-xs text-cyan tracking-widest3 uppercase mt-1
                         group-hover:underline transition-all duration-200">
          Ler artigo →
        </span>
      </div>
    </Link>
  );
}

export default function Blog() {
  return (
    <section
      className="section-tall border-t border-gray-mid bg-gray-light"
      id="blog"
      aria-labelledby="blog-title"
    >
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
          <div>
            <p className="eyebrow-muted mb-4">CONHECIMENTO TÉCNICO</p>
            <h2 className="section-title-xl" id="blog-title">
              Artigos da<br />
              nossa <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>equipa.</em>
            </h2>
          </div>
          <Link to="/blog" className="hero-link shrink-0 self-start md:self-auto">
            Ver todos os artigos <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {/* Article cards grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Artigos recentes"
        >
          {BLOG_POSTS.map((post, i) => (
            <div key={post.title} role="listitem">
              <ArticleCard post={post} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
