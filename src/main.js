import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faPlay,
    faList,
    faFlag,
    faDatabase,
    faChartPie,
    faRefresh,
    faPause,
    faEraser,
    faEnvelope,
    faPhone,
    faUser,
    faTrashCan,
    faPen,
    faTimes,
    faGamepad,
    faRandom,
    faCircle,
    faBars
} from '@fortawesome/free-solid-svg-icons'
import {
    faLinkedin,
    faGithub,
    faVuejs,
    faBootstrap,
    faPython,
    faFontAwesome,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import getI18n from '@/languages'

library.add(
    faPlay,
    faList,
    faLinkedin,
    faGithub,
    faFlag,
    faDatabase,
    faChartPie,
    faRefresh,
    faPause,
    faEraser,
    faEnvelope,
    faPhone,
    faVuejs,
    faBootstrap,
    faPython,
    faFontAwesome,
    faUser,
    faTrashCan,
    faPen,
    faTimes,
    faGamepad,
    faRandom,
    faCircle,
    faBars
)

const i18n = await getI18n(),
    app = createApp(App)


app.use(router)
app.use(store)

app.component('font-awesome-icon', FontAwesomeIcon)

if (process.env.VUE_RECAPTCHA_KEY) {
    app.use(VueReCaptcha, {siteKey: process.env.VUE_RECAPTCHA_KEY})
} else {
    console.warn('Recaptcha key not provided')
}

app.use(i18n)

app.config.globalProperties.isMobile = window.matchMedia('(max-width: 520px)').matches

app.mount('#app')
