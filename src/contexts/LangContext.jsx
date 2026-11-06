import { createContext, useContext, useState, useCallback } from 'react';
import { useSiteData } from './ContentContext';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  // Textos da interface: vêm do Dynamix (componente ui-texts), PT e EN por chave.
  const { UI_STRINGS } = useSiteData();
  const strings = UI_STRINGS || { pt: {}, en: {} };
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
      const find = (tree) => {
        let val = tree;
        for (const k of key.split('.')) {
          if (val == null) return undefined;
          val = val[k];
        }
        return typeof val === 'string' && val !== '' ? val : undefined;
      };
      // EN em falta/vazio cai para PT; chave inexistente devolve a própria chave
      return find(strings[lang]) ?? find(strings.pt) ?? key;
    },
    [lang, strings]
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
