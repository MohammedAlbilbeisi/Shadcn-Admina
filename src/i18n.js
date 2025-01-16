// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your translation files
import enTranslation from "./locales/en/translation.json";
import arTranslation from "./locales/ar/translation.json";

// Configure i18n
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    ar: {
      translation: arTranslation,
    },
  },
  lng: "en", // default language
  fallbackLng: "en", // fallback language if current language doesn't have translations
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  detection: {
    order: ["queryString", "cookie"],
    caches: ["cookie"],
  },
});

export default i18n;
