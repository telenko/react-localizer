import React, { useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { useLocalization, normalizeLocale } from './hooks';

const Localizer = (props) => {
    const fetcher = useMemo(() => lang => fetch(`${props.localesPath}/${lang}.json`).then(r=>r.json()), [props.localesPath]);
    const [language, vocabulary] = useLocalization(fetcher);
    return <IntlProvider locale={normalizeLocale(language)} messages={vocabulary}>{props.children}</IntlProvider>
}

export default Localizer;