// One-time (idempotent) seed: populates the CMS tables from the existing static
// content in src/data/siteData.js + src/i18n/dataEN.js, so the live site's
// content is preserved exactly at cutover. Safe to re-run (upserts by key).
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { config } from 'dotenv';
import pg from 'pg';
import * as PT from '../src/data/siteData.js';
import * as EN from '../src/i18n/dataEN.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, '..', '.env.local') });

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
if (!connectionString) {
  console.error('Missing POSTGRES_URL / DATABASE_URL. Run `vercel env pull .env.local` first.');
  process.exit(1);
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });
const counts = {};

function slugFromHref(href) {
  return href.split('/').filter(Boolean).pop();
}

async function seedServices() {
  let n = 0;
  for (let i = 0; i < PT.SERVICES.length; i++) {
    const pt = PT.SERVICES[i];
    const en = EN.SERVICES_EN?.[i] || null;
    const slug = slugFromHref(pt.href);
    const detail = PT.SERVICE_DETAIL[slug] || {};
    await client.query(
      `INSERT INTO services (slug, order_index, title_pt, title_en, description_pt, description_en,
         tags_pt, tags_en, subtechniques_pt, subtechniques_en, icon_id, image,
         methodology_pt, norms_pt, faqs_pt, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15, now())
       ON CONFLICT (slug) DO UPDATE SET
         order_index=$2, title_pt=$3, title_en=$4, description_pt=$5, description_en=$6,
         tags_pt=$7, tags_en=$8, subtechniques_pt=$9, subtechniques_en=$10, icon_id=$11, image=$12,
         methodology_pt=$13, norms_pt=$14, faqs_pt=$15, updated_at=now()`,
      [
        slug, i, pt.title, en?.title, pt.description, en?.description,
        JSON.stringify(pt.tags), en ? JSON.stringify(en.tags) : null,
        JSON.stringify(pt.subtechniques), en ? JSON.stringify(en.subtechniques) : null,
        pt.iconId, pt.image,
        JSON.stringify(detail.methodology || []), JSON.stringify(detail.norms || []), JSON.stringify(detail.faqs || []),
      ]
    );
    n++;
  }
  counts.services = n;
}

async function seedTeam() {
  let n = 0;
  for (let i = 0; i < PT.TEAM.length; i++) {
    const pt = PT.TEAM[i];
    const en = EN.TEAM_EN?.[i] || null;
    const existing = await client.query('SELECT id FROM team_members WHERE order_index=$1 AND name_pt=$2', [i, pt.name]);
    const params = [
      i, pt.initials, pt.photo, pt.linkedin, pt.yearsExp,
      pt.name, en?.name, pt.role, en?.role, pt.bio, en?.bio,
      JSON.stringify(pt.specialties), en ? JSON.stringify(en.specialties) : null,
      pt.education, en?.education,
      JSON.stringify(pt.languages), en ? JSON.stringify(en.languages) : null,
    ];
    if (existing.rows.length) {
      await client.query(
        `UPDATE team_members SET initials=$2, photo=$3, linkedin=$4, years_exp=$5,
           name_pt=$6, name_en=$7, role_pt=$8, role_en=$9, bio_pt=$10, bio_en=$11,
           specialties_pt=$12, specialties_en=$13, education_pt=$14, education_en=$15,
           languages_pt=$16, languages_en=$17, updated_at=now() WHERE id=$18`,
        [...params, existing.rows[0].id]
      );
    } else {
      await client.query(
        `INSERT INTO team_members (order_index, initials, photo, linkedin, years_exp,
           name_pt, name_en, role_pt, role_en, bio_pt, bio_en,
           specialties_pt, specialties_en, education_pt, education_en, languages_pt, languages_en)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
        params
      );
    }
    n++;
  }
  counts.team_members = n;
}

async function seedPortfolio() {
  let n = 0;
  const slugs = new Set();
  for (let i = 0; i < PT.PORTFOLIO_ITEMS.length; i++) {
    const pt = PT.PORTFOLIO_ITEMS[i];
    const en = EN.PORTFOLIO_ITEMS_EN?.[i] || null;
    if (slugs.has(pt.slug)) throw new Error(`Duplicate portfolio slug: ${pt.slug}`);
    slugs.add(pt.slug);
    await client.query(
      `INSERT INTO portfolio_items (slug, order_index, service_pt, service_en, province, year, image,
         title_pt, title_en, description_pt, description_en, client_pt, client_en, area_pt, area_en,
         duration_pt, duration_en, challenge_pt, challenge_en, solution_pt, solution_en,
         results_pt, results_en, gallery, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24, now())
       ON CONFLICT (slug) DO UPDATE SET
         order_index=$2, service_pt=$3, service_en=$4, province=$5, year=$6, image=$7,
         title_pt=$8, title_en=$9, description_pt=$10, description_en=$11, client_pt=$12, client_en=$13,
         area_pt=$14, area_en=$15, duration_pt=$16, duration_en=$17, challenge_pt=$18, challenge_en=$19,
         solution_pt=$20, solution_en=$21, results_pt=$22, results_en=$23, gallery=$24, updated_at=now()`,
      [
        pt.slug, i, pt.service, en?.service, pt.province, pt.year, pt.image,
        pt.title, en?.title, pt.description, en?.description, pt.client, en?.client,
        pt.area, en?.area, pt.duration, en?.duration, pt.challenge, en?.challenge,
        pt.solution, en?.solution,
        JSON.stringify(pt.results || []), en ? JSON.stringify(en.results || []) : null,
        JSON.stringify(pt.gallery || []),
      ]
    );
    n++;
  }
  for (let i = 0; i < PT.EXTRA_PORTFOLIO_ITEMS.length; i++) {
    const pt = PT.EXTRA_PORTFOLIO_ITEMS[i];
    if (slugs.has(pt.slug)) throw new Error(`Duplicate portfolio slug: ${pt.slug}`);
    slugs.add(pt.slug);
    await client.query(
      `INSERT INTO portfolio_items (slug, order_index, service_pt, province, year, title_pt, description_pt)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT (slug) DO UPDATE SET
         order_index=$2, service_pt=$3, province=$4, year=$5, title_pt=$6, description_pt=$7, updated_at=now()`,
      [pt.slug, PT.PORTFOLIO_ITEMS.length + i, pt.service, pt.province, pt.period, pt.title, pt.description]
    );
    n++;
  }
  counts.portfolio_items = n;
}

async function seedBlog() {
  let n = 0;
  const slugs = new Set();
  for (let i = 0; i < PT.BLOG_POSTS.length; i++) {
    const pt = PT.BLOG_POSTS[i];
    const en = EN.BLOG_POSTS_EN?.[i] || null;
    slugs.add(pt.slug);
    await client.query(
      `INSERT INTO blog_posts (slug, order_index, category_pt, category_en, date_pt, date_en, date_time,
         title_pt, title_en, excerpt_pt, excerpt_en, image, author_pt, author_en, read_time_pt, read_time_en,
         tags_pt, tags_en, body_pt, body_en, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20, now())
       ON CONFLICT (slug) DO UPDATE SET
         order_index=$2, category_pt=$3, category_en=$4, date_pt=$5, date_en=$6, date_time=$7,
         title_pt=$8, title_en=$9, excerpt_pt=$10, excerpt_en=$11, image=$12, author_pt=$13, author_en=$14,
         read_time_pt=$15, read_time_en=$16, tags_pt=$17, tags_en=$18, body_pt=$19, body_en=$20, updated_at=now()`,
      [
        pt.slug, i, pt.category, en?.category, pt.date, en?.date, pt.dateTime,
        pt.title, en?.title, pt.excerpt, en?.excerpt, pt.image, pt.author, en?.author,
        pt.readTime, en?.readTime, JSON.stringify(pt.tags || []), en ? JSON.stringify(en.tags || []) : null,
        JSON.stringify(pt.body || []), en && en.body?.length ? JSON.stringify(en.body) : null,
      ]
    );
  }
  for (let i = 0; i < PT.ALL_BLOG_POSTS.length; i++) {
    const post = PT.ALL_BLOG_POSTS[i];
    if (slugs.has(post.slug)) {
      await client.query(
        `UPDATE blog_posts SET cat_type=$2, featured=$3 WHERE slug=$1`,
        [post.slug, post.cat_type, !!post.featured]
      );
    } else {
      await client.query(
        `INSERT INTO blog_posts (slug, order_index, cat_type, category_pt, date_pt, date_time, title_pt, excerpt_pt, read_time_pt, featured)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
         ON CONFLICT (slug) DO UPDATE SET cat_type=$3, category_pt=$4, date_pt=$5, date_time=$6, title_pt=$7, excerpt_pt=$8, read_time_pt=$9, featured=$10, updated_at=now()`,
        [post.slug, PT.BLOG_POSTS.length + i, post.cat_type, post.category, post.date, post.dateTime, post.title, post.excerpt, post.readTime, !!post.featured]
      );
      n++;
    }
  }
  counts.blog_posts = PT.BLOG_POSTS.length + n;
}

async function seedGallery() {
  let n = 0;
  for (let i = 0; i < PT.GALLERY_ITEMS.length; i++) {
    const item = PT.GALLERY_ITEMS[i];
    const existing = await client.query('SELECT id FROM gallery_items WHERE order_index=$1', [i]);
    const params = [i, item.cat, item.province, item.accent, item.bg, item.image, item.title];
    if (existing.rows.length) {
      await client.query(
        `UPDATE gallery_items SET cat=$2, province=$3, accent=$4, bg=$5, image=$6, title_pt=$7, updated_at=now() WHERE id=$8`,
        [...params, existing.rows[0].id]
      );
    } else {
      await client.query(
        `INSERT INTO gallery_items (order_index, cat, province, accent, bg, image, title_pt) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        params
      );
    }
    n++;
  }
  counts.gallery_items = n;
}

async function seedTestimonials() {
  let n = 0;
  for (let i = 0; i < PT.TESTIMONIALS.length; i++) {
    const pt = PT.TESTIMONIALS[i];
    const en = EN.TESTIMONIALS_EN?.[i] || null;
    const existing = await client.query('SELECT id FROM testimonials WHERE order_index=$1', [i]);
    const params = [i, pt.initials, pt.text, en?.text, pt.name, en?.name, pt.meta, en?.meta];
    if (existing.rows.length) {
      await client.query(
        `UPDATE testimonials SET initials=$2, text_pt=$3, text_en=$4, name_pt=$5, name_en=$6, meta_pt=$7, meta_en=$8, updated_at=now() WHERE id=$9`,
        [...params, existing.rows[0].id]
      );
    } else {
      await client.query(
        `INSERT INTO testimonials (order_index, initials, text_pt, text_en, name_pt, name_en, meta_pt, meta_en) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        params
      );
    }
    n++;
  }
  counts.testimonials = n;
}

async function seedJobs() {
  let n = 0;
  for (let i = 0; i < PT.JOBS.length; i++) {
    const job = PT.JOBS[i];
    const existing = await client.query('SELECT id FROM jobs WHERE order_index=$1', [i]);
    const params = [i, job.dept, job.title, job.location, job.type, job.level, job.posted, job.description, JSON.stringify(job.requirements || [])];
    if (existing.rows.length) {
      await client.query(
        `UPDATE jobs SET dept_pt=$2, title_pt=$3, location_pt=$4, type_pt=$5, level_pt=$6, posted_pt=$7, description_pt=$8, requirements_pt=$9, updated_at=now() WHERE id=$10`,
        [...params, existing.rows[0].id]
      );
    } else {
      await client.query(
        `INSERT INTO jobs (order_index, dept_pt, title_pt, location_pt, type_pt, level_pt, posted_pt, description_pt, requirements_pt) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        params
      );
    }
    n++;
  }
  counts.jobs = n;
}

async function seedSettings() {
  const entries = [
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
  ];
  for (const [key, label, valuePt, valueEn] of entries) {
    await client.query(
      `INSERT INTO site_settings (key, label, value_pt, value_en, updated_at)
       VALUES ($1,$2,$3,$4, now())
       ON CONFLICT (key) DO UPDATE SET label=$2, value_pt=$3, value_en=$4, updated_at=now()`,
      [key, label, JSON.stringify(valuePt), valueEn ? JSON.stringify(valueEn) : null]
    );
  }
  counts.site_settings = entries.length;
}

async function main() {
  await client.connect();
  await seedServices();
  await seedTeam();
  await seedPortfolio();
  await seedBlog();
  await seedGallery();
  await seedTestimonials();
  await seedJobs();
  await seedSettings();
  await client.end();
  console.log('Seed complete. Row counts:');
  console.table(counts);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
