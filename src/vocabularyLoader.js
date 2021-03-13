const DEFAULT_LANGUAGE = 'en';
export const vocabularyLoader = async (lang, fallbackLang=DEFAULT_LANGUAGE, localesPath) => {
    try {
        return fetch(`${localesPath}/${lang}.json`).then(r=>r.json());
    } catch(e) {
        if (lang === fallbackLang) {
            console.error(`Unable to fetch default ${fallbackLang} vocabulary`);
            throw e;
        }
        console.warn(`Unable to fetch vocabulary ${lang}, fallback to the default ${fallbackLang}`);
        return vocabularyLoader(fallbackLang);
    }
};