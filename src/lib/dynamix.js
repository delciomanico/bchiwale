// Cliente da API pública do Dynamix-CMS.
//   GET {API}/public/{project}/content/{component}?page&limit&sort=publishedAt
// Devolve o conteúdo no mesmo formato "linhas" que o adaptador (adaptSiteData) já consome,
// por isso nenhuma página/componente do site precisa de mudar.

// Configuração, por ordem: /config.js (gerado no arranque do container a partir de
// DYNAMIX_API_URL / DYNAMIX_PROJECT) → variáveis VITE_* de build → defeito de dev.
const DEV_DEFAULT = 'http://localhost:3001/api/v1';
const runtime = (typeof window !== 'undefined' && window.__CONFIG__) || {};
export const DYNAMIX_API = (runtime.DYNAMIX_API_URL || import.meta.env.VITE_DYNAMIX_API_URL || (import.meta.env.DEV ? DEV_DEFAULT : '')).replace(/\/+$/, '');
export const WEB3FORMS_KEY = runtime.WEB3FORMS_KEY || import.meta.env.VITE_WEB3FORMS_KEY || '';
export const DYNAMIX_PROJECT = runtime.DYNAMIX_PROJECT || import.meta.env.VITE_DYNAMIX_PROJECT || 'bchiwale';

// Componentes do projeto Dynamix (ver Dynamix-CMS/apps/api/src/seeds/bchiwale).
const COLLECTIONS = [
  // conteúdo
  'services', 'team', 'portfolio', 'blog', 'gallery', 'testimonials', 'jobs',
  // secções do site
  'hero-slides', 'stats', 'timeline', 'mvv', 'org-chart', 'certifications', 'cert-badges', 'footer-links',
  'contact-info', 'filters', 'downloads', 'tools', 'site-media',
  // textos da interface
  'ui-texts',
];
const PAGE_SIZE = 100; // máximo permitido pela API

async function getJson(url) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Dynamix ${res.status} em ${url}`);
  return res.json();
}

// Percorre todas as páginas. `sort=publishedAt` (crescente) mantém a ordem editorial do seed.
async function fetchAll(component) {
  const base = `${DYNAMIX_API}/public/${DYNAMIX_PROJECT}/content/${component}`;
  const rows = [];
  for (let page = 1, pages = 1; page <= pages; page++) {
    const { data, meta } = await getJson(`${base}?sort=publishedAt&limit=${PAGE_SIZE}&page=${page}`);
    rows.push(...data);
    pages = meta.pages;
  }
  // `id` numérico sequencial (o site usa-o como key/aria-id); descarta metadados do Dynamix.
  return rows.map(({ id: _id, publishedAt: _p, ...row }, i) => ({ ...row, id: i + 1 }));
}

export async function loadSiteData() {
  if (!DYNAMIX_API) throw new Error('DYNAMIX_API_URL não está definido');
  const lists = await Promise.all(COLLECTIONS.map(fetchAll));
  const payload = Object.fromEntries(COLLECTIONS.map((name, i) => [name, lists[i]]));
  payload.ui_texts = payload['ui-texts'];
  return payload;
}
