import { createI18n } from 'vue-i18n'
import {
    AVAILABLE_LOCALES,
    DEFAULT_LOCALE_ISO
} from '@/plugins/constants'
import axios from '@/plugins/axios'

function getPreferredLocale() {
    const preferredLocale = navigator.language || navigator.languages[0] || DEFAULT_LOCALE_ISO
    return preferredLocale.split('-')[0]
}

export function getUrlLocale() {
    const urlSegments = window.location.pathname.split('/'),
        urlLocale = urlSegments[1]

    return AVAILABLE_LOCALES.includes(urlLocale) ? urlLocale : null
}

export function getLocale() {
    return window['LOCALE_ISO'] || localStorage.getItem('LOCALE_ISO') || getUrlLocale() || getPreferredLocale()
}

export async function fetchTranslations(localeIso) {
    try {
        let translations = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/translations/${localeIso}`)

        translations = translations.data.reduce((obj, translation) => {
            obj[translation['base__code']] = translation.translation
            return obj
        }, {})

        return translations
    } catch (error) {
        console.error('Error fetching translations:', error)
        return {}
    }
}

async function getI18n() {
    const locale = getLocale(),
        translations = await fetchTranslations(locale)

    if (!window.LOCALE_ISO) {
        window.LOCALE_ISO = locale
    }

    return createI18n({
        locale,
        fallbackLocale: DEFAULT_LOCALE_ISO,
        messages: {
            [locale]: translations,
        },
    })
}


export default getI18n