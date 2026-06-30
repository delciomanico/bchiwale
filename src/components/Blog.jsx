import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/siteData';
import { useLang } from '../contexts/LangContext';
import { BLOG_POSTS_EN } from '../i18n/dataEN';

function ArticleCard({ post, index, readLabel, readPrefix }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="reveal group block bg-white border border-gray-mid overflow-hidden
                 transition-shadow duration-300 hover:shadow-card-hover"
      style={{ transitionDelay: `${index * 80}ms` }}
      aria-label={`${readPrefix}${post.title}`}
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
          {readLabel}
        </span>
      </div>
    </Link>
  );
}

export default function Blog() {
  const { t, loc } = useLang();
  const posts = loc(BLOG_POSTS, BLOG_POSTS_EN);

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
            <p className="eyebrow-muted mb-4">{t('blog.eyebrow')}</p>
            <h2 className="section-title-xl" id="blog-title">
              {t('blog.title_line1')}<br />
              {t('blog.title_line2')} <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>{t('blog.title_em')}</em>
            </h2>
          </div>
          <Link to="/blog" className="hero-link shrink-0 self-start md:self-auto">
            {t('blog.view_all')} <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {/* Article cards grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label={t('blog.grid_label')}
        >
          {posts.map((post, i) => (
            <div key={post.slug} role="listitem">
              <ArticleCard post={post} index={i} readLabel={t('blog.read_article')} readPrefix={t('blog.read_prefix')} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
