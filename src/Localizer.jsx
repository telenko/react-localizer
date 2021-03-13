import { useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { useLocalization, normalizeLocale } from './hooks';
import { vocabularyLoader } from './vocabularyLoader';

const Localizer = (props) => {
    const loader = useMemo(() => lang => vocabularyLoader(normalizeLocale(lang), props.localesPath), []);
    const [language, vocabulary] = useLocalization(loader);
    return <IntlProvider locale={normalizeLocale(language)} messages={vocabulary}>{props.children}</IntlProvider>
}

export default Localizer;