<script>
import {
  fetchTranslations,
  getUrlLocale
} from '@/languages'
import {
  LANGUAGE_CHANGE_REDIRECT_URL
} from '@/plugins/constants'

export default {
  name: 'ChangeLanguageView',
  beforeCreate() {
    window.LOCALE_ISO = getUrlLocale()
    localStorage.setItem('LOCALE_ISO', window.LOCALE_ISO)
    this.$i18n.locale = window.LOCALE_ISO

    fetchTranslations(window.LOCALE_ISO).then(translations => {
      this.$i18n.setLocaleMessage(window.LOCALE_ISO, translations)

      this.$router.push(LANGUAGE_CHANGE_REDIRECT_URL) // todo: change url (the same as before - referrer?)
    })
  }
}
</script>