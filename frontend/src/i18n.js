import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import viMessages from './locales/vi.json';
import enMessages from './locales/en.json';
import zhMessages from './locales/zh.json';

const resources = {
  vi: { translation: viMessages },
  en: { translation: enMessages },
  zh: { translation: zhMessages },
};

const savedLanguage = localStorage.getItem('language') || 'vi';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'vi',
    defaultNS: 'translation',
    ns: ['translation'],
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
