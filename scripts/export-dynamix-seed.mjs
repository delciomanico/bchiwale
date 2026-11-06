// Exporta o conteúdo estático do site (src/data/siteData.js + src/i18n/dataEN.js)
// para o JSON de seed do Dynamix-CMS. Não precisa de base de dados.
//
//   node scripts/export-dynamix-seed.mjs [caminho-de-saída]
//
// Por defeito escreve em ../Dynamix-CMS/apps/api/src/seeds/bchiwale/data.json.
// As chaves de cada linha são os mesmos nomes de coluna que o site já usa
// (title_pt, title_en, …), por isso o adaptador do site não muda de forma.
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as PT from '../src/data/siteData.js';
import * as EN from '../src/i18n/dataEN.js';
import { strings } from '../src/i18n/strings.js';

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

const pad = (i) => String(i + 1).padStart(2, '0');
const nz = (v) => (v === null || v === undefined || v === '' ? undefined : v);

// ── Um componente por secção do site (antes: tudo em "settings" como JSON) ─────────────
const heroSlides = PT.HERO_SLIDES.map((pt, i) => {
  const en = EN.HERO_SLIDES_EN?.[i] ?? {};
  return clean({
    slug: `slide-${pad(i)}`, image: pt.src, line1_pt: pt.line1, line1_en: en.line1, line2_pt: pt.line2, line2_en: en.line2,
    alt_pt: pt.alt, alt_en: en.alt,
    primary_label_pt: pt.primary.label, primary_label_en: en.primary?.label, primary_href: pt.primary.href === '/sobre' ? '/sobre-nos' : pt.primary.href, // o PT original apontava para /sobre (rota inexistente)
    secondary_label_pt: pt.secondary.label, secondary_label_en: en.secondary?.label, secondary_href: pt.secondary.href,
  });
});

const stats = PT.STATS.map((pt, i) => {
  const en = EN.STATS_EN?.[i] ?? {};
  return clean({ slug: `numero-${pad(i)}`, value: pt.value, suffix: pt.suffix, label_pt: pt.label, label_en: en.label, detail_pt: pt.detail, detail_en: en.detail });
});

const timeline = PT.TIMELINE.map((pt, i) => {
  const en = EN.TIMELINE_EN?.[i] ?? {};
  return clean({ slug: `marco-${pad(i)}`, year: pt.year, text_pt: pt.text, text_en: en.text, badge_pt: nz(pt.badge), badge_en: nz(en.badge), type: pt.type });
});

const mvv = PT.MVV_CARDS.map((pt, i) => {
  const en = EN.MVV_CARDS_EN?.[i] ?? {};
  return clean({ slug: `mvv-${pad(i)}`, label_pt: pt.label, label_en: en.label, title_pt: pt.title, title_en: en.title, text_pt: pt.text, text_en: en.text, accent: pt.accent });
});

// Organograma: árvore → lista plana em pré-ordem (a ordem de publicação reconstrói a árvore); `parent` = slug do superior.
const orgChart = [];
(function walk(node, parent) {
  const slug = `org-${pad(orgChart.length)}`;
  orgChart.push(clean({ slug, cargo: node.cargo, nome: node.nome, iniciais: node.iniciais, photo: node.photo, parent }));
  (node.subordinados || []).forEach((c) => walk(c, slug));
})(PT.ORG_CHART, undefined);

const certifications = PT.CERTIFICATIONS.map((c, i) => clean({ slug: `cert-${pad(i)}`, code: c.code, label_pt: c.label, year: c.year, logo: c.logo }));
const certBadges = PT.CERT_BADGES.map((name, i) => ({ slug: `selo-${pad(i)}`, name }));

const footerLinks = [
  ...PT.FOOTER_SERVICES.map((pt, i) => clean({ slug: `servico-${pad(i)}`, group: 'servicos', label_pt: pt.label, label_en: EN.FOOTER_SERVICES_EN?.[i]?.label, href: pt.href })),
  ...PT.FOOTER_COMPANY.map((pt, i) => clean({ slug: `empresa-${pad(i)}`, group: 'empresa', label_pt: pt.label, label_en: EN.FOOTER_COMPANY_EN?.[i]?.label, href: pt.href })),
];

const contactInfo = [clean({
  slug: 'contacto', phone: PT.CONTACT.phone, email: PT.CONTACT.email, whatsapp: PT.CONTACT.whatsapp, address: PT.CONTACT.address,
  address_short: PT.CONTACT.addressShort, website: PT.CONTACT.website, hours: PT.CONTACT.hours,
})];

const filters = [
  ['galeria', PT.GALLERY_CATEGORIES], ['blog', PT.BLOG_CATEGORIES], ['portfolio-servico', PT.PORTFOLIO_SERVICE_FILTERS],
  ['portfolio-provincia', PT.PORTFOLIO_PROVINCE_FILTERS], ['portfolio-periodo', PT.PORTFOLIO_PERIOD_FILTERS], ['vagas-departamento', PT.JOB_DEPARTMENTS],
].flatMap(([group, list]) => list.map((label, i) => ({ slug: `${group}-${pad(i)}`, group, label_pt: label })));

const downloads = PT.DOWNLOADS.map((d, i) => clean({ slug: `download-${pad(i)}`, type: d.type, cat_pt: d.cat, title_pt: d.title, desc_pt: d.desc, size: d.size, accent: d.accentColor }));
const tools = PT.TOOLS.map((t, i) => clean({ slug: `ferramenta-${pad(i)}`, title_pt: t.title, desc_pt: t.desc, icon: t.icon, href: t.href }));

// Imagens/vídeo fixos do site (logo, fundos dos cabeçalhos, retrato do DG, favicon, imagens dos menus, vídeo "Sobre")
const siteMedia = [
  ['logo', 'Logótipo', '/logo.png'], ['icon', 'Ícone / favicon', '/icone-chiwale.png'],
  ['hero-sobre', 'Cabeçalho — Sobre Nós', '/images/project-main.jpg'], ['hero-servicos', 'Cabeçalho — Serviços', '/images/geofisico.jpg'],
  ['hero-portfolio', 'Cabeçalho — Portfolio', '/images/caminion.jpg'], ['hero-galeria', 'Cabeçalho — Galeria', '/images/chiwale-section.jpg'],
  ['hero-blog', 'Cabeçalho — Blog', '/images/service1.jpg'], ['hero-recursos', 'Cabeçalho — Recursos', '/images/gallery4.jpg'],
  ['hero-carreiras', 'Cabeçalho — Carreiras', '/images/gallery7.jpg'], ['hero-contacto', 'Cabeçalho — Contacto', '/images/project2.jpg'],
  ['hero-default', 'Cabeçalho — outras páginas', '/images/mission.jpg'], ['director-photo', 'Retrato do Director-Geral', '/images/team/severino-escritorio.jpg'],
  ['mega-servicos', 'Menu — Serviços (imagem)', '/images/chiwale-section.jpg'], ['mega-portfolio-1', 'Menu — Portfolio (imagem 1)', '/images/project1.jpg'],
  ['mega-portfolio-2', 'Menu — Portfolio (imagem 2)', '/images/project2.jpg'], ['mega-blog-1', 'Menu — Blog (imagem 1)', '/images/service1.jpg'],
  ['mega-blog-2', 'Menu — Blog (imagem 2)', '/images/service-baner.jpg'], ['about-video', 'Vídeo da secção Sobre (Home)', PT.ABOUT_VIDEO ?? '/about-video.mp4'],
].map(([slug, name, file]) => ({ slug, name, file }));

// ── Textos da interface (botões, títulos, rótulos, SEO…) ─────────────────────────────
// Base: src/i18n/strings.js (menu, rodapé, secções da home); extras: scripts/ui-extra.json (resto das páginas).
// Cada texto é uma linha {key:'nav.home', value_pt, value_en}; o slug é a chave sem pontuação.
const flat = (obj, prefix = '', acc = {}) => {
  for (const [k, v] of Object.entries(obj)) {
    if (v && typeof v === 'object') flat(v, prefix + k + '.', acc);
    else acc[prefix + k] = v;
  }
  return acc;
};
const flatPt = flat(strings.pt);
const flatEn = flat(strings.en);
const extra = JSON.parse(readFileSync(path.join(__dirname, 'ui-extra.json'), 'utf8'));
const uiMap = new Map();
for (const key of Object.keys(flatPt)) uiMap.set(key, { pt: flatPt[key], en: flatEn[key] });
for (const [key, v] of Object.entries(extra)) uiMap.set(key, v);
const slugify = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
const uiTexts = [...uiMap.entries()].map(([key, v]) => clean({ slug: slugify(key), key, value_pt: v.pt, value_en: v.en }));

const data = {
  'hero-slides': heroSlides, stats, timeline, mvv, 'org-chart': orgChart, certifications, 'cert-badges': certBadges,
  'footer-links': footerLinks, 'contact-info': contactInfo, filters, downloads, tools, 'site-media': siteMedia,
  services, team, portfolio, blog, gallery, testimonials, jobs, 'ui-texts': uiTexts,
};

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
