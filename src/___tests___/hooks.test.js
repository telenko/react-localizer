import { renderHook, act } from '@testing-library/react-hooks/dom';
import { useLocalization, normalizeLocale, useLanguage } from '../../index';
import { delay } from './utils';
import { FAKE_EN_VOCABULARY, FAKE_UA_VOCABULARY } from './fixtures';

const fakeFetcher = lang => {
    const normalizedLang = normalizeLocale(lang);
    switch (normalizedLang) {
        case 'en': {
            return Promise.resolve(FAKE_EN_VOCABULARY);
        }
        case 'uk': {
            return Promise.resolve(FAKE_UA_VOCABULARY);
        }
    }
    throw 'no locale';
};

let languageGetter;
let applyBrowserLanguage = language => {
    languageGetter.mockReturnValue(language);
    window.dispatchEvent(new Event('languagechange'));
}

beforeEach(() => {
  languageGetter = jest.spyOn(window.navigator, 'language', 'get')
});

test('normalization lang key', () => {
    expect(normalizeLocale('en-us')).toBe('en');
    expect(normalizeLocale('uk-ua')).toBe('uk');
    expect(normalizeLocale('fr-Fr-some-invalid-key')).toBe('fr');
});

test('picks right vocabulary', async () => {
    await act(async () => {
        applyBrowserLanguage('en');
        const { result } = renderHook(() => useLocalization(fakeFetcher));
        await delay(100);
        expect(result.current[1]).toEqual(FAKE_EN_VOCABULARY);
        applyBrowserLanguage('uk');
        await delay(100);
        expect(result.current[1]).toEqual(FAKE_UA_VOCABULARY);
        applyBrowserLanguage('fr');
        debugger;
        await delay(100);
        expect(result.current[1]).toEqual(FAKE_EN_VOCABULARY);
    });
});

test('uses custom default/fallback language', async () => {
    await act(async () => {
        applyBrowserLanguage('fr');
        const { result } = renderHook(() => useLocalization(fakeFetcher, 'uk'));
        await delay(100);
        expect(result.current[1]).toEqual(FAKE_UA_VOCABULARY);
    });
});

test('checks useLanguage hook', async () => {
    await act(async () => {
        applyBrowserLanguage('en');
        const { result } = renderHook(() => useLanguage());
        await delay();
        expect(result.current).toEqual('en');
        applyBrowserLanguage('uk');
        expect(result.current).toEqual('uk');
        applyBrowserLanguage('fr');
        expect(result.current).toEqual('fr');
    });
});