import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

const supportedLocales = ['en', 'ru', 'uz'];

const defaultLocale = (() => {
  if (typeof navigator === 'undefined') return 'en';
  const nav = (navigator.language || 'en').split('-')[0].toLowerCase();
  return supportedLocales.includes(nav) ? nav : 'en';
})();

const I18nContext = createContext({
  locale: 'en',
  t: (key) => key,
  setLocale: () => {},
});

const dictionaries = {
  en: {
    language: 'Language',
    english: 'English',
    russian: 'Russian',
    uzbek: 'Uzbek',
    offline: 'Offline',
    online: 'Online',
    syncing: 'Syncing…',
    lastSync: 'Last sync',
  },
  ru: {
    language: 'Язык',
    english: 'Английский',
    russian: 'Русский',
    uzbek: 'Узбекский',
    offline: 'Не в сети',
    online: 'В сети',
    syncing: 'Синхронизация…',
    lastSync: 'Последняя синхронизация',
  },
  uz: {
    language: 'Til',
    english: 'Ingliz',
    russian: 'Rus',
    uzbek: 'Oʻzbek',
    offline: 'Oflayn',
    online: 'Onlayn',
    syncing: 'Sinxronlanmoqda…',
    lastSync: 'Oxirgi sinxronlash',
  },
};

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('appLocale') : null;
    return saved && supportedLocales.includes(saved) ? saved : defaultLocale;
  });

  useEffect(() => {
    try { localStorage.setItem('appLocale', locale); } catch {}
  }, [locale]);

  const t = useMemo(() => {
    const dict = dictionaries[locale] || dictionaries.en;
    return (key) => dict[key] || key;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

export { supportedLocales };


