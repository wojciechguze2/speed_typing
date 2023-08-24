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
    faCircle
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
    faCircle
)

const i18n = await getI18n(),
    app = createApp(App)


app.use(router)
app.use(store)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueReCaptcha, { siteKey: RECAPTCHA_KEY })

app.use(i18n)

app.mount('#app')
