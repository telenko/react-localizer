# react-localizer
Useful component and hooks to build lazy loading based localization

# how it works?
Uses 'languagechange' API to detect browser language, then passes browser language into a loader.

# example with react-intl
```Typescript
    import { useLocalization, normalizeLocale, VocabularyLoader } from '@telenko/react-localizer';
    //you can use any other 3pp for rich declarative/imperative localization API
    import { IntlProvider } from "react-intl";

    
    const customLoader: VocabularyLoader = (lang: string) => {
        return import(`../../../translations/${normalizeLocale(lang)}.json`);
    };

    const CustomLocalizer: React.FC = ({ children }) => {
        const [language, vocabulary] = useLocalization(customLoader);

        return <IntlProvider locale={normalizeLocale(language)} messages={vocabulary}>
                {children}
            </IntlProvider>
    }

    export default CustomLoader;
```

```TSX
    import CustomLocalizer from '../somewhere/in/your/project/Localizer';
    import SomeGuiPage from '../somewhere/in/your/project/SomeGuiPage';

    //Some GUI page will be localized :)
    const App: React.FC = () => (
        <CustomLocalizer>
            <SomeGuiPage/>
        </CustomLocalizer>
    )
```

# using out-of-the-box component
```Typescript
    import Localizer from '@telenko/react-localizer/src/Localizer';
    import SomeGuiPage from '../somewhere/in/your/project/SomeGuiPage';

    //Some GUI page will be localized :)
    const App: React.FC = () => (
        <Localizer localesPath='/translations'>
            <SomeGuiPage/>
        </Localizer>
    )
```
!Note, **Localizer** component will try to fetch locales from 'localesPath' url. Resulting url will be built as following:
    ```Javascript
    `${props.localesPath}/${langCode}.json`
    ```
If you want custom behavior (f.e. webpack import), use hook + own component instead (example above)