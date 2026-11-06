// Turns the raw DB rows returned by GET /api/public/site-data into the exact
// same constant shapes the app used to import from src/data/siteData.js and
// src/i18n/dataEN.js. Keeping the legacy shapes here means every page/component
// only has to swap *where* it reads a constant from (useSiteData() instead of a
// static import) — not how it uses the value.

function slugFromHref(href) {
  return href ? href.split('/').filter(Boolean).pop() : '';
}

function mapServices(rows) {
  const SERVICES = rows.map((r, i) => ({
    number: String(i + 1).padStart(2, '0'),
    title: r.title_pt,
    href: `/servicos/${r.slug}`,
    description: r.description_pt,
    tags: r.tags_pt || [],
    subtechniques: r.subtechniques_pt || [],
    iconId: r.icon_id,
    image: r.image,
  }));
  const SERVICES_EN = rows.map((r, i) => ({
    number: String(i + 1).padStart(2, '0'),
    title: r.title_en ?? r.title_pt,
    href: `/servicos/${r.slug}`,
    description: r.description_en ?? r.description_pt,
    tags: r.tags_en ?? r.tags_pt ?? [],
    subtechniques: r.subtechniques_en ?? r.subtechniques_pt ?? [],
    iconId: r.icon_id,
    image: r.image,
  }));
  const SERVICE_DETAIL = {};
  const SERVICE_SLUG_MAP = {};
  rows.forEach((r, i) => {
    SERVICE_SLUG_MAP[r.slug] = i;
    SERVICE_DETAIL[r.slug] = {
      methodology: r.methodology_pt || [],
      norms: r.norms_pt || [],
      faqs: r.faqs_pt || [],
    };
  });
  return { SERVICES, SERVICES_EN, SERVICE_DETAIL, SERVICE_SLUG_MAP };
}

function mapTeam(rows) {
  const TEAM = rows.map((r) => ({
    initials: r.initials,
    photo: r.photo,
    name: r.name_pt,
    role: r.role_pt,
    bio: r.bio_pt,
    linkedin: r.linkedin,
    specialties: r.specialties_pt || [],
    education: r.education_pt,
    yearsExp: r.years_exp,
    languages: r.languages_pt || [],
  }));
  const TEAM_EN = rows.map((r) => ({
    initials: r.initials,
    photo: r.photo,
    name: r.name_en ?? r.name_pt,
    role: r.role_en ?? r.role_pt,
    bio: r.bio_en ?? r.bio_pt,
    linkedin: r.linkedin,
    specialties: r.specialties_en ?? r.specialties_pt ?? [],
    education: r.education_en ?? r.education_pt,
    yearsExp: r.years_exp,
    languages: r.languages_en ?? r.languages_pt ?? [],
  }));
  return { TEAM, TEAM_EN };
}

function mapPortfolio(rows) {
  const PORTFOLIO_ITEMS = rows.map((r) => ({
    slug: r.slug,
    service: r.service_pt,
    province: r.province,
    year: r.year,
    image: r.image,
    title: r.title_pt,
    description: r.description_pt,
    client: r.client_pt,
    area: r.area_pt,
    duration: r.duration_pt,
    challenge: r.challenge_pt,
    solution: r.solution_pt,
    results: r.results_pt || undefined,
    gallery: r.gallery || [],
  }));
  const PORTFOLIO_ITEMS_EN = rows.map((r) => ({
    slug: r.slug,
    service: r.service_en ?? r.service_pt,
    province: r.province,
    year: r.year,
    image: r.image,
    title: r.title_en ?? r.title_pt,
    description: r.description_en ?? r.description_pt,
    client: r.client_en ?? r.client_pt,
    area: r.area_en ?? r.area_pt,
    duration: r.duration_en ?? r.duration_pt,
    challenge: r.challenge_en ?? r.challenge_pt,
    solution: r.solution_en ?? r.solution_pt,
    results: r.results_en ?? r.results_pt ?? undefined,
    gallery: r.gallery || [],
  }));
  return { PORTFOLIO_ITEMS, PORTFOLIO_ITEMS_EN };
}

function mapBlog(rows) {
  const toPt = (r, i) => ({
    id: i + 1,
    slug: r.slug,
    category: r.category_pt,
    cat_type: r.cat_type,
    date: r.date_pt,
    dateTime: r.date_time,
    title: r.title_pt,
    excerpt: r.excerpt_pt,
    image: r.image,
    author: r.author_pt,
    readTime: r.read_time_pt,
    tags: r.tags_pt || [],
    featured: !!r.featured,
    body: r.body_pt || [],
  });
  const toEn = (r, i) => ({
    id: i + 1,
    slug: r.slug,
    category: r.category_en ?? r.category_pt,
    cat_type: r.cat_type,
    date: r.date_en ?? r.date_pt,
    dateTime: r.date_time,
    title: r.title_en ?? r.title_pt,
    excerpt: r.excerpt_en ?? r.excerpt_pt,
    image: r.image,
    author: r.author_en ?? r.author_pt,
    readTime: r.read_time_en ?? r.read_time_pt,
    tags: r.tags_en ?? r.tags_pt ?? [],
    featured: !!r.featured,
    body: (r.body_en && r.body_en.length ? r.body_en : r.body_pt) || [],
  });

  const ALL_BLOG_POSTS = rows.map(toPt);
  const ALL_BLOG_POSTS_EN = rows.map(toEn);
  const richIndexes = rows
    .map((r, i) => (r.body_pt && r.body_pt.length ? i : -1))
    .filter((i) => i !== -1);
  const BLOG_POSTS = richIndexes.map((i) => ALL_BLOG_POSTS[i]);
  const BLOG_POSTS_EN = richIndexes.map((i) => ALL_BLOG_POSTS_EN[i]);

  return { BLOG_POSTS, BLOG_POSTS_EN, ALL_BLOG_POSTS, ALL_BLOG_POSTS_EN };
}

function mapGallery(rows) {
  const GALLERY_ITEMS = rows.map((r) => ({
    id: r.id,
    cat: r.cat,
    title: r.title_pt,
    province: r.province,
    accent: r.accent,
    bg: r.bg,
    image: r.image,
  }));
  return { GALLERY_ITEMS };
}

function mapTestimonials(rows) {
  const TESTIMONIALS = rows.map((r) => ({
    text: r.text_pt,
    initials: r.initials,
    name: r.name_pt,
    meta: r.meta_pt,
  }));
  const TESTIMONIALS_EN = rows.map((r) => ({
    text: r.text_en ?? r.text_pt,
    initials: r.initials,
    name: r.name_en ?? r.name_pt,
    meta: r.meta_en ?? r.meta_pt,
  }));
  return { TESTIMONIALS, TESTIMONIALS_EN };
}

function mapJobs(rows) {
  const JOBS = rows.map((r) => ({
    id: r.id,
    title: r.title_pt,
    dept: r.dept_pt,
    location: r.location_pt,
    type: r.type_pt,
    level: r.level_pt,
    posted: r.posted_pt,
    description: r.description_pt,
    requirements: r.requirements_pt || [],
  }));
  return { JOBS };
}

// Textos da interface: linhas {key:'nav.home', value_pt, value_en} → { pt:{nav:{home}}, en:{…} }
function mapUiTexts(rows) {
  const ui = { pt: {}, en: {} };
  for (const r of rows) {
    for (const lang of ['pt', 'en']) {
      const v = r[`value_${lang}`];
      if (v == null || v === '' || !r.key) continue;
      const parts = r.key.split('.');
      let node = ui[lang];
      parts.slice(0, -1).forEach((p) => { node = node[p] = node[p] || {}; });
      node[parts[parts.length - 1]] = v;
    }
  }
  return ui;
}

const pick = (r, k, lang) => (lang === 'en' ? r[`${k}_en`] ?? r[`${k}_pt`] : r[`${k}_pt`]);
const byGroup = (rows, g) => rows.filter((r) => r.group === g);
const labelsOf = (rows, g) => byGroup(rows, g).map((r) => r.label_pt);

// Cada secção do site é um componente do Dynamix; aqui voltam à forma "legada" que as páginas consomem.
function mapSections(p) {
  const L = (rows, fn) => ({ pt: (rows || []).map((r, i) => fn(r, i, 'pt')), en: (rows || []).map((r, i) => fn(r, i, 'en')) });

  const hero = L(p['hero-slides'], (r, i, l) => ({
    id: i + 1, src: r.image, alt: pick(r, 'alt', l), line1: pick(r, 'line1', l), line2: pick(r, 'line2', l),
    primary: { label: pick(r, 'primary_label', l), href: r.primary_href },
    secondary: { label: pick(r, 'secondary_label', l), href: r.secondary_href },
  }));
  const stats = L(p.stats, (r, _i, l) => ({ value: r.value, suffix: r.suffix ?? '', label: pick(r, 'label', l), detail: pick(r, 'detail', l) }));
  const timeline = L(p.timeline, (r, _i, l) => ({ year: r.year, text: pick(r, 'text', l), badge: pick(r, 'badge', l) ?? null, type: r.type || 'normal' }));
  const mvv = L(p.mvv, (r, _i, l) => ({ label: pick(r, 'label', l), title: pick(r, 'title', l), text: pick(r, 'text', l), accent: r.accent }));
  const fl = (g) => L(byGroup(p['footer-links'] || [], g), (r, _i, l) => ({ label: pick(r, 'label', l), href: r.href }));
  const fServ = fl('servicos');
  const fComp = fl('empresa');
  const downloads = L(p.downloads, (r, i, l) => ({ id: i + 1, type: r.type, cat: pick(r, 'cat', l), title: pick(r, 'title', l), desc: pick(r, 'desc', l), size: r.size, accentColor: r.accent }));
  const tools = L(p.tools, (r, _i, l) => ({ title: pick(r, 'title', l), desc: pick(r, 'desc', l), icon: r.icon, href: r.href }));

  // Organograma: lista plana (pré-ordem) com `parent` → árvore
  const nodes = new Map((p['org-chart'] || []).map((r) => [r.slug, { cargo: r.cargo, nome: r.nome, iniciais: r.iniciais, photo: r.photo, subordinados: [] }]));
  let root = {};
  for (const r of p['org-chart'] || []) {
    const n = nodes.get(r.slug);
    if (r.parent && nodes.has(r.parent)) nodes.get(r.parent).subordinados.push(n);
    else if (!r.parent && !Object.keys(root).length) root = n;
  }

  const c = (p['contact-info'] || [])[0] || {};
  const filters = p.filters || [];
  // slugs são kebab-case; as chaves usadas no site têm underscores (hero-sobre → hero_sobre)
  const media = Object.fromEntries((p['site-media'] || []).map((r) => [r.slug.replace(/-/g, '_'), r.file || '']));

  return {
    HERO_SLIDES: hero.pt, HERO_SLIDES_EN: hero.en,
    STATS: stats.pt, STATS_EN: stats.en,
    TIMELINE: timeline.pt, TIMELINE_EN: timeline.en,
    MVV_CARDS: mvv.pt, MVV_CARDS_EN: mvv.en,
    FOOTER_SERVICES: fServ.pt, FOOTER_SERVICES_EN: fServ.en,
    FOOTER_COMPANY: fComp.pt, FOOTER_COMPANY_EN: fComp.en,
    DOWNLOADS: downloads.pt, DOWNLOADS_EN: downloads.en,
    TOOLS: tools.pt, TOOLS_EN: tools.en,
    ORG_CHART: root,
    CERTIFICATIONS: (p.certifications || []).map((r) => ({ code: r.code, label: r.label_pt, year: r.year, logo: r.logo || null })),
    CERT_BADGES: (p['cert-badges'] || []).map((r) => r.name),
    CONTACT: { phone: c.phone || '', email: c.email || '', whatsapp: c.whatsapp || '', address: c.address || '', addressShort: c.address_short || '', website: c.website || '', hours: c.hours || '' },
    GALLERY_CATEGORIES: labelsOf(filters, 'galeria'),
    BLOG_CATEGORIES: labelsOf(filters, 'blog'),
    PORTFOLIO_SERVICE_FILTERS: labelsOf(filters, 'portfolio-servico'),
    PORTFOLIO_PROVINCE_FILTERS: labelsOf(filters, 'portfolio-provincia'),
    PORTFOLIO_PERIOD_FILTERS: labelsOf(filters, 'portfolio-periodo'),
    JOB_DEPARTMENTS: labelsOf(filters, 'vagas-departamento'),
    ABOUT_VIDEO: media.about_video || '',
    SITE_IMAGES: media,
  };
}

export function adaptSiteData(payload) {
  return {
    UI_STRINGS: mapUiTexts(payload.ui_texts || []),
    ...mapServices(payload.services || []),
    ...mapTeam(payload.team || []),
    ...mapPortfolio(payload.portfolio || []),
    ...mapBlog(payload.blog || []),
    ...mapGallery(payload.gallery || []),
    ...mapTestimonials(payload.testimonials || []),
    ...mapJobs(payload.jobs || []),
    ...mapSections(payload),
  };
}

export { slugFromHref };
