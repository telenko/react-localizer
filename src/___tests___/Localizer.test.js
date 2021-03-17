import React from 'react';
import { render, act, cleanup, screen } from '@testing-library/react';
import { useIntl } from 'react-intl';
import Localizer from '../Localizer';
import { delay } from './utils';
import { FAKE_EN_VOCABULARY, FAKE_UA_VOCABULARY } from './fixtures';

beforeEach(() => {
    window.fetch = jest.fn((url) => Promise.resolve({ json() {
        if (url.includes('en')) {
            return FAKE_EN_VOCABULARY;
        } else if (url.includes('uk')) {
            return FAKE_UA_VOCABULARY;
        } else {
            throw 'no locales';
        }
    } }))
});

let languageGetter;
let applyBrowserLanguage = language => {
    languageGetter.mockReturnValue(language);
    window.dispatchEvent(new Event('languagechange'));
}

beforeEach(() => {
  languageGetter = jest.spyOn(window.navigator, 'language', 'get')
});

afterEach(cleanup);

const TestComponent = () => {
    const intl = useIntl();
    return <div>{intl.messages.localizer}</div>
}

test('<Localizer/>', async () => {
    await act(async () => {
        render(
            <Localizer localesPath='/test'><TestComponent/></Localizer>
        );
        await delay();
        screen.getByText('Localizer');
        applyBrowserLanguage('uk');
        await delay();
        screen.getByText('Локалізатор');
    });
});
