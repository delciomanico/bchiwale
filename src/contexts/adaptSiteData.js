// Turns the raw DB rows returned by GET /api/public/site-data into the exact
// same constant shapes the app used to import from src/data/siteData.js and
// src/i18n/dataEN.js. Keeping the legacy shapes here means every page/component
// only has to swap *where* it reads a constant from (useSiteData() instead of a
// static import) — not how it uses the value.

function settingValue(settings, key, fallback) {
  const entry = settings[key];
  return entry ? entry.value_pt : fallback;
}

function settingValueEn(settings, key, fallback) {
  const entry = settings[key];
  if (!entry) return fallback;
  return entry.value_en ?? entry.value_pt ?? fallback;
}

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

export function adaptSiteData(payload) {
  const settings = payload.settings || {};

  return {
    ...mapServices(payload.services || []),
    ...mapTeam(payload.team || []),
    ...mapPortfolio(payload.portfolio || []),
    ...mapBlog(payload.blog || []),
    ...mapGallery(payload.gallery || []),
    ...mapTestimonials(payload.testimonials || []),
    ...mapJobs(payload.jobs || []),

    NAV_ITEMS: settingValue(settings, 'nav_items', []),

    STATS: settingValue(settings, 'stats', []),
    STATS_EN: settingValueEn(settings, 'stats', []),

    CONTACT: settingValue(settings, 'contact', {}),

    HERO_SLIDES: settingValue(settings, 'hero_slides', []),
    HERO_SLIDES_EN: settingValueEn(settings, 'hero_slides', []),

    TIMELINE: settingValue(settings, 'timeline', []),
    TIMELINE_EN: settingValueEn(settings, 'timeline', []),

    FOOTER_SERVICES: settingValue(settings, 'footer_services', []),
    FOOTER_SERVICES_EN: settingValueEn(settings, 'footer_services', []),

    FOOTER_COMPANY: settingValue(settings, 'footer_company', []),
    FOOTER_COMPANY_EN: settingValueEn(settings, 'footer_company', []),

    ORG_CHART: settingValue(settings, 'org_chart', {}),

    MVV_CARDS: settingValue(settings, 'mvv_cards', []),
    MVV_CARDS_EN: settingValueEn(settings, 'mvv_cards', []),

    CERTIFICATIONS: settingValue(settings, 'certifications', []),
    CERT_BADGES: settingValue(settings, 'cert_badges', []),

    GALLERY_CATEGORIES: settingValue(settings, 'gallery_categories', []),
    BLOG_CATEGORIES: settingValue(settings, 'blog_categories', []),

    PORTFOLIO_SERVICE_FILTERS: settingValue(settings, 'portfolio_service_filters', []),
    PORTFOLIO_PROVINCE_FILTERS: settingValue(settings, 'portfolio_province_filters', []),
    PORTFOLIO_PERIOD_FILTERS: settingValue(settings, 'portfolio_period_filters', []),

    JOB_DEPARTMENTS: settingValue(settings, 'job_departments', []),
    DOWNLOADS: settingValue(settings, 'downloads', []),
    TOOLS: settingValue(settings, 'tools', []),
  };
}

export { slugFromHref };
