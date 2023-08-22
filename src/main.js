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
import {
    RECAPTCHA_KEY
} from '@/plugins/constants'
import languages from '@/languages'

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
    faTimes
)

const app = createApp(App)

app.use(languages)
app.use(router)
app.use(store)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueReCaptcha, { siteKey: RECAPTCHA_KEY })

app.mount('#app')
