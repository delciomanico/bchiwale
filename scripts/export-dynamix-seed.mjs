// Exporta o conteúdo estático do site (src/data/siteData.js + src/i18n/dataEN.js)
// para o JSON de seed do Dynamix-CMS. Não precisa de base de dados.
//
//   node scripts/export-dynamix-seed.mjs [caminho-de-saída]
//
// Por defeito escreve em ../Dynamix-CMS/apps/api/src/seeds/bchiwale/data.json.
// As chaves de cada linha são os mesmos nomes de coluna que o site já usa
// (title_pt, title_en, …), por isso o adaptador do site não muda de forma.
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as PT from '../src/data/siteData.js';
import * as EN from '../src/i18n/dataEN.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = process.argv[2]
  || path.join(__dirname, '..', '..', 'Dynamix-CMS', 'apps', 'api', 'src', 'seeds', 'bchiwale', 'data.json');

const outAssets = process.argv[3]
  || path.join(__dirname, '..', '..', 'Dynamix-CMS', 'apps', 'api', 'seed-assets', 'bchiwale');
const publicDir = path.join(__dirname, '..', 'public');

const clean = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== null && v !== ''));
const slugFromHref = (href) => href.split('/').filter(Boolean).pop();

const services = PT.SERVICES.map((pt, i) => {
  const en = EN.SERVICES_EN?.[i];
  const slug = slugFromHref(pt.href);
  const d = PT.SERVICE_DETAIL[slug] || {};
  return clean({
    slug, title_pt: pt.title, title_en: en?.title, description_pt: pt.description, description_en: en?.description,
    tags_pt: pt.tags, tags_en: en?.tags, subtechniques_pt: pt.subtechniques, subtechniques_en: en?.subtechniques,
    icon_id: pt.iconId, image: pt.image,
    methodology_pt: d.methodology || [], norms_pt: d.norms || [], faqs_pt: d.faqs || [],
  });
});

const team = PT.TEAM.map((pt, i) => {
  const en = EN.TEAM_EN?.[i];
  return clean({
    initials: pt.initials, photo: pt.photo, linkedin: pt.linkedin, years_exp: pt.yearsExp,
    name_pt: pt.name, name_en: en?.name, role_pt: pt.role, role_en: en?.role, bio_pt: pt.bio, bio_en: en?.bio,
    specialties_pt: pt.specialties, specialties_en: en?.specialties,
    education_pt: pt.education, education_en: en?.education,
    languages_pt: pt.languages, languages_en: en?.languages,
  });
});

const portfolio = [
  ...PT.PORTFOLIO_ITEMS.map((pt, i) => {
    const en = EN.PORTFOLIO_ITEMS_EN?.[i];
    return clean({
      slug: pt.slug, service_pt: pt.service, service_en: en?.service, province: pt.province, year: pt.year, image: pt.image,
      title_pt: pt.title, title_en: en?.title, description_pt: pt.description, description_en: en?.description,
      client_pt: pt.client, client_en: en?.client, area_pt: pt.area, area_en: en?.area,
      duration_pt: pt.duration, duration_en: en?.duration, challenge_pt: pt.challenge, challenge_en: en?.challenge,
      solution_pt: pt.solution, solution_en: en?.solution,
      results_pt: pt.results || [], results_en: en?.results, gallery: pt.gallery || [],
    });
  }),
  ...PT.EXTRA_PORTFOLIO_ITEMS.map((pt) => clean({
    slug: pt.slug, service_pt: pt.service, province: pt.province, year: pt.period,
    title_pt: pt.title, description_pt: pt.description,
  })),
];

const richSlugs = new Set(PT.BLOG_POSTS.map((p) => p.slug));
const blog = [
  ...PT.BLOG_POSTS.map((pt, i) => {
    const en = EN.BLOG_POSTS_EN?.[i];
    const all = PT.ALL_BLOG_POSTS.find((p) => p.slug === pt.slug);
    return clean({
      slug: pt.slug, cat_type: all?.cat_type, featured: !!all?.featured,
      category_pt: pt.category, category_en: en?.category, date_pt: pt.date, date_en: en?.date, date_time: pt.dateTime,
      title_pt: pt.title, title_en: en?.title, excerpt_pt: pt.excerpt, excerpt_en: en?.excerpt, image: pt.image,
      author_pt: pt.author, author_en: en?.author, read_time_pt: pt.readTime, read_time_en: en?.readTime,
      tags_pt: pt.tags || [], tags_en: en?.tags, body_pt: pt.body || [], body_en: en?.body?.length ? en.body : undefined,
    });
  }),
  ...PT.ALL_BLOG_POSTS.filter((p) => !richSlugs.has(p.slug)).map((p) => clean({
    slug: p.slug, cat_type: p.cat_type, featured: !!p.featured, category_pt: p.category, date_pt: p.date,
    date_time: p.dateTime, title_pt: p.title, excerpt_pt: p.excerpt, read_time_pt: p.readTime,
  })),
];

const gallery = PT.GALLERY_ITEMS.map((g) => clean({
  cat: g.cat, province: g.province, accent: g.accent, bg: g.bg, image: g.image, title_pt: g.title,
}));

const testimonials = PT.TESTIMONIALS.map((pt, i) => {
  const en = EN.TESTIMONIALS_EN?.[i];
  return clean({
    initials: pt.initials, text_pt: pt.text, text_en: en?.text, name_pt: pt.name, name_en: en?.name,
    meta_pt: pt.meta, meta_en: en?.meta,
  });
});

const jobs = PT.JOBS.map((j) => clean({
  dept_pt: j.dept, title_pt: j.title, location_pt: j.location, type_pt: j.type, level_pt: j.level,
  posted_pt: j.posted, description_pt: j.description, requirements_pt: j.requirements || [],
}));

const settings = [
  ['nav_items', 'Menu de Navegação', PT.NAV_ITEMS, null],
  ['stats', 'Estatísticas (Faixa de Números)', PT.STATS, EN.STATS_EN],
  ['contact', 'Contacto', PT.CONTACT, null],
  ['hero_slides', 'Slides do Banner Principal', PT.HERO_SLIDES, EN.HERO_SLIDES_EN],
  ['timeline', 'Linha do Tempo / História', PT.TIMELINE, EN.TIMELINE_EN],
  ['footer_services', 'Rodapé — Serviços', PT.FOOTER_SERVICES, EN.FOOTER_SERVICES_EN],
  ['footer_company', 'Rodapé — Empresa', PT.FOOTER_COMPANY, EN.FOOTER_COMPANY_EN],
  ['org_chart', 'Organograma', PT.ORG_CHART, null],
  ['mvv_cards', 'Missão, Visão e Valores', PT.MVV_CARDS, EN.MVV_CARDS_EN],
  ['certifications', 'Certificações', PT.CERTIFICATIONS, null],
  ['cert_badges', 'Selos de Certificação', PT.CERT_BADGES, null],
  ['gallery_categories', 'Galeria — Categorias', PT.GALLERY_CATEGORIES, null],
  ['blog_categories', 'Blog — Categorias', PT.BLOG_CATEGORIES, null],
  ['portfolio_service_filters', 'Portfólio — Filtro de Serviço', PT.PORTFOLIO_SERVICE_FILTERS, null],
  ['portfolio_province_filters', 'Portfólio — Filtro de Província', PT.PORTFOLIO_PROVINCE_FILTERS, null],
  ['portfolio_period_filters', 'Portfólio — Filtro de Período', PT.PORTFOLIO_PERIOD_FILTERS, null],
  ['job_departments', 'Vagas — Departamentos', PT.JOB_DEPARTMENTS, null],
  ['downloads', 'Recursos — Downloads', PT.DOWNLOADS, null],
  ['tools', 'Recursos — Ferramentas', PT.TOOLS, null],
  ['about_video', 'Vídeo da Secção Sobre (Homepage)', '/about-video.mp4', null],
  // Imagens que estavam fixas no código do site (logo, fundos dos cabeçalhos das páginas, retrato do DG, favicon)
  ['site_images', 'Imagens do site (logo, banners das páginas…)', {
    logo: '/logo.png', icon: '/icone-chiwale.png',
    hero_sobre: '/images/project-main.jpg', hero_servicos: '/images/geofisico.jpg', hero_portfolio: '/images/caminion.jpg',
    hero_galeria: '/images/chiwale-section.jpg', hero_blog: '/images/service1.jpg', hero_recursos: '/images/gallery4.jpg',
    hero_carreiras: '/images/gallery7.jpg', hero_contacto: '/images/project2.jpg', hero_default: '/images/mission.jpg',
    director_photo: '/images/team/severino-escritorio.jpg',
  }, null],
].map(([key, label, value_pt, value_en]) => clean({ slug: key, label, value_pt, value_en }));

const data = { services, team, portfolio, blog, gallery, testimonials, jobs, settings };

// slugs únicos por coleção — o Dynamix exige (componente, slug) único
for (const [name, rows] of Object.entries(data)) {
  const seen = new Set();
  for (const r of rows) if (r.slug) {
    if (seen.has(r.slug)) throw new Error(`slug duplicado em ${name}: ${r.slug}`);
    seen.add(r.slug);
  }
}

// Ficheiros referenciados (imagens/vídeo/pdf) → copiados para o seed do Dynamix, que os carrega para a Media Library.
const ASSET = /^\/[^\s?#]+\.(jpe?g|png|svg|webp|gif|avif|mp4|webm|pdf)$/i;
const refs = new Set();
(function walk(v) {
  if (typeof v === 'string') { if (ASSET.test(v)) refs.add(v); }
  else if (Array.isArray(v)) v.forEach(walk);
  else if (v && typeof v === 'object') Object.values(v).forEach(walk);
})(data);
const missing = [...refs].filter((r) => !existsSync(path.join(publicDir, r)));
if (missing.length) throw new Error(`Ficheiros referenciados que não existem em public/: ${missing.join(', ')}`);
for (const r of refs) {
  mkdirSync(path.dirname(path.join(outAssets, r)), { recursive: true });
  copyFileSync(path.join(publicDir, r), path.join(outAssets, r));
}
console.log(`${refs.size} ficheiros copiados para ${outAssets}`);

mkdirSync(path.dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(data, null, 2) + '\n');
console.log(`Escrito ${out}`);
console.table(Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v.length])));
