import { useCallback, useEffect, useMemo, useState } from "react";

const DEFAULT_LANGUAGE = 'en';

export const normalizeLocale = (langToNormalize) => langToNormalize.split('-')[0];

const vocabularyLoaderFactory = fetcher => async (lang, fallbackLang=DEFAULT_LANGUAGE) => {
    try {
        return fetcher(lang);
    } catch(e) {
        if (lang === fallbackLang) {
            console.error(`Unable to fetch default ${fallbackLang} vocabulary`);
            throw e;
        }
        console.warn(`Unable to fetch vocabulary ${lang}, fallback to the default ${fallbackLang}`);
        return fetcher(fallbackLang);
    }
};

export const useLanguage = (defaultLanguage=DEFAULT_LANGUAGE) => {
    const [language, setLanguage] = useState(navigator.language || defaultLanguage);

    const localizationCallback = useCallback(() => {
        setLanguage(navigator.language);
    }, []);
    useEffect(() => {
        window.addEventListener('languagechange', localizationCallback);
        return () => {
            window.removeEventListener('languagechange', localizationCallback);
        };
    }, []);
    return language;
}

export const useLocalization = (vocabularyFetcher, defaultLanguage=DEFAULT_LANGUAGE) => {
    const language = useLanguage(defaultLanguage);
    const [vocabulary, setVocabulary] = useState({});
    const vocabularyLoader = useMemo(() => vocabularyLoaderFactory(vocabularyFetcher), [vocabularyFetcher]);

    useEffect(() => {
        vocabularyLoader(language, defaultLanguage)
            .then(vocabulary => {
                setVocabulary(vocabulary);
            })
            .catch(() => {
                setVocabulary({});
            });
    }, [language]);

    return [language, vocabulary];
};