import { createI18n } from 'vue-i18n';

const messages = {
    en: {
        welcome: 'Welcome',
        hello: 'Hello',
    },
    pl: {
        welcome: 'Witaj',
        hello: 'Cześć',
    },
};

const languages = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
});

export default languages