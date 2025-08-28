import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import vi from 'locales/vi';
import en from 'locales/en';

const resources = {
  en: {
    translation: en
  },
  vi: {
    translation: vi
  }
};

i18next.use(LanguageDetector).use(initReactI18next).init({
  resources,
  debug: true,
  fallbackLng: 'vi'
});
export default i18next;
