import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enLangData from './translations/en.json';
import deLangData from './translations/de.json';
import itLangData from './translations/it.json';


const resources = {
  en: { translation: enLangData },
  de: { translation: deLangData },
  it: { translation: itLangData}

};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  })
  .catch(console.log);

export default i18n;
