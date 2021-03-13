export type VocabularyLoader = (lang: string, fallbackLanguage?: string) => Promise<any>;

export const normalizeLocale = (langToNormalize: string) => string;

export const useLanguage = (defaultLanguage?: string) => string;

export const useLocalization = (vocabularyLoader: VocabularyLoader, defaultLanguage?: string) => [string, {}];