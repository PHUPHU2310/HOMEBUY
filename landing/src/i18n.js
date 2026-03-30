import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import viMessages from './locales/vi.json';
import enMessages from './locales/en.json';
import zhMessages from './locales/zh.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      vi: { translation: viMessages },
      en: { translation: enMessages },
      zh: { translation: zhMessages },
    },
    lng: localStorage.getItem('language') || 'vi',
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
