import 'bootstrap/dist/js/bootstrap'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { VueReCaptcha } from 'vue-recaptcha-v3'
import getI18n from '@/languages'
import { MOBILE_MAX_WIDTH_PX } from '@/plugins/constants'
import { loadIcons } from '@/plugins/icons'

const i18n = await getI18n(),
    app = createApp(App)

app.use(router)
app.use(store)

app.component('font-awesome-icon', FontAwesomeIcon)

// app.use(VueReCaptcha, {siteKey: process.env.VUE_RECAPTCHA_KEY})

app.use(i18n)

app.config.globalProperties.isMobile = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`).matches

window.addEventListener('resize', () => {
    app.config.globalProperties.isMobile = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`).matches
})

loadIcons().then(() => {
    app.mount('#app')
})