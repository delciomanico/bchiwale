import { Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/siteData';
import NotFoundPage from './NotFoundPage';
import { usePageMeta } from '../hooks/usePageMeta';

function BodyBlock({ block }) {
  if (block.type === 'paragraph') {
    return (
      <p className="font-body text-charcoal/80 text-base leading-relaxed mb-6">
        {block.content}
      </p>
    );
  }
  if (block.type === 'heading') {
    return (
      <h2 className="font-heading font-semibold text-charcoal text-xl mb-4 mt-10 tracking-tight">
        {block.content}
      </h2>
    );
  }
  if (block.type === 'list') {
    return (
      <ul className="mb-6 space-y-2.5" role="list">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span className="shrink-0 font-mono text-cyan leading-relaxed" aria-hidden="true">·</span>
            <span className="font-body text-sm text-charcoal/75 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return null;
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  usePageMeta(
    post?.title,
    post?.excerpt,
    post ? `https://bchiwale.ao/blog/${slug}` : undefined
  );

  if (!post) return <NotFoundPage />;

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <section
        className="min-h-[calc(40vh+72px)] flex items-end pb-16"
        style={{
          background: 'linear-gradient(135deg, #1A1A2E 60%, #0d1829 100%)',
          borderBottom: '1px solid rgba(0,174,239,0.2)',
          paddingTop: '72px',
        }}
        aria-labelledby="article-title"
      >
        <div className="container">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-mono text-xs text-white/40">
              <li><Link to="/" className="hover:text-cyan transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li><Link to="/blog" className="hover:text-cyan transition-colors">Blog</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li className="text-white/60" aria-current="page">{post.category}</li>
            </ol>
          </nav>
          <p className="eyebrow">{post.category}</p>
          <h1
            id="article-title"
            className="font-heading font-semibold text-white text-3xl md:text-4xl lg:text-[2.625rem] tracking-tight max-w-3xl mt-2 leading-tight"
          >
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-6 font-mono text-[10px] text-white/40 tracking-[0.15em]">
            <span>{post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.dateTime}>{post.date}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readTime} leitura</span>
            {post.tags && post.tags.map((tag) => (
              <Fragment key={tag}>
                <span aria-hidden="true">·</span>
                <span style={{ color: 'rgba(0,174,239,0.6)' }}>{tag}</span>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <article className="section-pad bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {post.body && post.body.map((block, i) => (
              <BodyBlock key={i} block={block} />
            ))}
          </div>
        </div>
      </article>

      <div
        className="py-12"
        style={{ background: '#ffffff', borderTop: '1px solid rgba(26,26,46,0.10)' }}
        aria-label="Sobre o autor"
      >
        <div className="container">
          <div className="max-w-3xl mx-auto flex items-center gap-6">
            <div
              className="shrink-0 w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: '#1A1A2E', border: '1px solid rgba(0,174,239,0.2)' }}
              aria-hidden="true"
            >
              <span className="font-heading font-semibold text-sm tracking-tight" style={{ color: '#00AEEF' }}>BC</span>
            </div>
            <div>
              <div className="font-heading font-semibold text-charcoal text-base">{post.author}</div>
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase mt-0.5 mb-2" style={{ color: '#00AEEF' }}>
                Equipa B-CHIWALE
              </div>
              <p className="font-body text-charcoal/55 text-sm leading-relaxed">
                Produzido pela equipa técnica da B-CHIWALE — especialistas em geociências e engenharia mineral em Angola.
              </p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section
          className="section-pad bg-white"
          style={{ borderTop: '1px solid rgba(26,26,46,0.08)' }}
          aria-labelledby="related-title"
        >
          <div className="container">
            <p className="eyebrow" id="related-title">LEITURA RECOMENDADA</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/blog/${rel.slug}`}
                  className="group flex gap-4 items-start transition-colors"
                  style={{ border: '1px solid rgba(26,26,46,0.10)', padding: '1rem' }}
                  aria-label={`Ler: ${rel.title}`}
                >
                  <div
                    className="shrink-0 overflow-hidden"
                    style={{ width: '100px', height: '100px', background: '#0d1829' }}
                    aria-hidden="true"
                  >
                    {rel.image && (
                      <img
                        src={rel.image}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <span className="tag-cyan">{rel.category}</span>
                    <h3 className="font-heading font-semibold text-charcoal text-sm leading-snug tracking-tight group-hover:text-cyan transition-colors">
                      {rel.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        className="py-20 border-t border-white/5"
        style={{ background: '#1A1A2E' }}
        aria-label="Contacto"
      >
        <div className="container text-center">
          <p className="eyebrow" style={{ color: '#00AEEF' }}>CONSULTORIA TÉCNICA</p>
          <h2 className="font-heading font-semibold text-white text-2xl md:text-3xl tracking-tight mt-2 mb-8">
            Precisa de consultoria <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>técnica?</em>
          </h2>
          <Link to="/contacto" className="btn-primary">
            FALE CONNOSCO →
          </Link>
        </div>
      </section>
    </>
  );
}
