import { useCallback, useEffect, useState } from "react";

const DEFAULT_LANGUAGE = 'en';

export const normalizeLocale = (langToNormalize) => langToNormalize.split('-')[0];

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

export const useLocalization = (vocabularyLoader, defaultLanguage=DEFAULT_LANGUAGE) => {
    const language = useLanguage(defaultLanguage);
    const [vocabulary, setVocabulary] = useState({});

    useEffect(() => {
        vocabularyLoader(language)
            .then(vocabulary => {
                setVocabulary(vocabulary);
            })
            .catch(() => {
                setVocabulary({});
            });
    }, [language]);

    return [language, vocabulary];
};