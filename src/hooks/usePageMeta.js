import { useEffect } from 'react';

const BASE = 'B-CHIWALE';

export function usePageMeta(title, description, canonical) {
  useEffect(() => {
    // Title
    document.title = title ? `${title} | ${BASE}` : `${BASE} | Geologia, Geofísica e Engenharia Geotécnica em Angola`;

    // Description
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl && description) descEl.setAttribute('content', description);

    // OG title/description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && title) ogTitle.setAttribute('content', `${title} | ${BASE}`);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && description) ogDesc.setAttribute('content', description);

    // Canonical
    const canonEl = document.querySelector('link[rel="canonical"]');
    if (canonEl && canonical) canonEl.setAttribute('href', canonical);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl && canonical) ogUrl.setAttribute('content', canonical);

    // Twitter
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle && title) twTitle.setAttribute('content', `${title} | ${BASE}`);
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc && description) twDesc.setAttribute('content', description);

    return () => {
      document.title = `${BASE} | Geologia, Geofísica e Engenharia Geotécnica em Angola`;
    };
  }, [title, description, canonical]);
}
