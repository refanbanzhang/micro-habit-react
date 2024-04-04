const defaultLang = 'en';
const LANGUAGE = 'language';

const useLanguage = () => {
  const setLanguage = (lang) => {
    localStorage.setItem(LANGUAGE, lang)
  }

  const getLanguage = () => localStorage.getItem(LANGUAGE) || defaultLang

  return {
    setLanguage,
    getLanguage,
  }
}

export default useLanguage;