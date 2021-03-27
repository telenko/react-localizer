export type VocabularyLoader = (lang: string, fallbackLanguage?: string) => Promise<any>;

export const normalizeLocale = (langToNormalize: string) => string;

export declare const useLanguage = (defaultLanguage?: string) => string;

export declare const useLocalization = (vocabularyLoader: VocabularyLoader, defaultLanguage?: string) => [string, {}];

export declare const vocabularyLoaderFactory = (fetcher: Promise<any>) => VocabularyLoader;