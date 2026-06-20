// src/context/LanguageContext.tsx
//
// Provides a simple EN/AR language toggle across the app.
// Persists the choice in localStorage and flips the document
// direction (ltr/rtl) accordingly.

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, TranslationKey } from '@/lib/translations';

type Lang = 'en' | 'ar';

interface LanguageContextType {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const stored = localStorage.getItem('lsm-lang') as Lang | null;
    if (stored === 'ar' || stored === 'en') {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lsm-lang', lang);
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'ar' : 'en'));

  const t = (key: TranslationKey): string => {
    return translations[lang][key] ?? translations.en[key] ?? key;
  };

  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ lang, dir, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
