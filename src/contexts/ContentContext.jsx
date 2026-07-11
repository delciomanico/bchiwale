import { createContext, useContext, useEffect, useState } from 'react';
import { adaptSiteData } from './adaptSiteData';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    fetch('/api/public/site-data')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load site data');
        return res.json();
      })
      .then((payload) => {
        if (cancelled) return;
        setState({ data: adaptSiteData(payload), loading: false, error: null });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({ data: null, loading: false, error: err });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <ContentContext.Provider value={state}>{children}</ContentContext.Provider>;
}

function useContentState() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useSiteData must be used within a ContentProvider');
  return ctx;
}

// Returns the adapted, legacy-shaped site data. Only call this from components
// that render after the public route tree has confirmed loading is finished
// (see PublicApp in App.jsx) — during loading this returns an empty object.
export function useSiteData() {
  const { data } = useContentState();
  return data || {};
}

export function useContentStatus() {
  const { loading, error } = useContentState();
  return { loading, error };
}
