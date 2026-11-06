import { useEffect } from 'react';
import { useLang } from '../contexts/LangContext';

// Título, descrição e canonical da página (vêm do CMS: textos `meta.*`).
// `path` é o caminho do site ('/servicos'); o domínio vem de `meta.site_url`.
export function usePageMeta(title, description, path) {
  const { t } = useLang();
  const BASE = t('common.brand');
  const defaultTitle = `${BASE} | ${t('meta.default_title')}`;
  const canonical = path != null ? `${t('meta.site_url').replace(/\/+$/, '')}${path}` : undefined;

  useEffect(() => {
    document.title = title ? `${title} | ${BASE}` : defaultTitle;

    const setContent = (sel, value) => {
      const el = document.querySelector(sel);
      if (el && value) el.setAttribute('content', value);
    };
    setContent('meta[name="description"]', description);
    setContent('meta[property="og:title"]', title && `${title} | ${BASE}`);
    setContent('meta[property="og:description"]', description);
    setContent('meta[property="og:url"]', canonical);
    setContent('meta[name="twitter:title"]', title && `${title} | ${BASE}`);
    setContent('meta[name="twitter:description"]', description);
    const canonEl = document.querySelector('link[rel="canonical"]');
    if (canonEl && canonical) canonEl.setAttribute('href', canonical);

    return () => {
      document.title = defaultTitle;
    };
  }, [title, description, canonical, BASE, defaultTitle]);
}
