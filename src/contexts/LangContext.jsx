import { createContext, useContext, useState, useCallback } from 'react';
import { strings } from '../i18n/strings';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(
    () => localStorage.getItem('bchiwale-lang') || 'pt'
  );

  const setLang = useCallback((l) => {
    setLangState(l);
    localStorage.setItem('bchiwale-lang', l);
  }, []);

  // Dot-path lookup: t('nav.request_proposal') → string
  const t = useCallback(
    (key) => {
      const keys = key.split('.');
      let val = strings[lang];
      for (const k of keys) {
        if (val == null) return key;
        val = val[k];
      }
      return val ?? key;
    },
    [lang]
  );

  // Return enData when lang==='en', else ptData (falls back if enData is null/undefined)
  const loc = useCallback(
    (ptData, enData) => (lang === 'en' && enData ? enData : ptData),
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, setLang, t, loc }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
