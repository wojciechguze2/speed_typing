import {
    createRouter,
    createWebHistory
} from 'vue-router'
import {
    TITLE
} from '@/plugins/constants'

const staticPages = [
    {
        path: '/regulations',
        name: 'RegulationsView',
        component: () => import('@/views/StaticPageView'),
        props: {
            staticPageKey: 'regulations'
        },
        meta: {
            title: 'Regulations'  // todo: add translations to meta tags
        }
    },
    {
        path: '/privacy-policy',
        name: 'PrivacyPolicyView',
        component: () => import('@/views/StaticPageView'),
        props: {
            staticPageKey: 'privacy-policy'
        },
        meta: {
            title: 'Privacy policy'
        }
    },
]

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: () => import('@/views/HomeView')
    },
    {
        path: '/pl',
        name: 'ChangeLanguageViewPL',
        component: () => import('@/views/ChangeLanguageView')
    },
    {
        path: '/en',
        name: 'ChangeLanguageViewEN',
        component: () => import('@/views/ChangeLanguageView')
    },
    {
        path: '/de',
        name: 'ChangeLanguageViewDE',
        component: () => import('@/views/ChangeLanguageView')
    },
    {
        path: '/game/:gameMode',
        name: 'GameView',
        component: () => import('@/views/GameView'),
        meta: {
            title: 'Game'
        }
    },
    {
        path: '/game-modes',
        name: 'GameModesView',
        component: () => import('@/views/GameModesView'),
        meta: {
            title: 'Game modes'
        }
    },
    {
        path: '/contact',
        name: 'ContactView',
        component: () => import('@/views/ContactView'),
        meta: {
            title: 'Contact'
        }
    },
    {
        path: '/about',
        name: 'AboutView',
        component: () => import('@/views/AboutView'),
        meta: {
            title: 'About'
        }
    },
    {
        path: '/texts',
        name: 'TextsView',
        component: () => import('@/views/TextsView'),
        meta: {
            title: 'Texts'
        }
    },
    {
        path: '/login',
        name: 'LoginView',
        component: () => import('@/views/LoginView'),
        meta: {
            title: 'Login'
        }
    },
    {
        path: '/logout',
        name: 'LogoutView',
        component: () => import('@/views/LogoutView'),
        meta: {
            title: 'Logout'
        }
    },
    {
        path: '/register',
        name: 'RegisterView',
        component: () => import('@/views/RegisterView'),
        meta: {
            title: 'Register'
        }
    },
    {
        path: '/password-reminder',
        name: 'PasswordReminder',
        component: () => import('@/views/PasswordReminderView'),
        meta: {
            title: 'Password reminder'
        }
    },
    {
        path: '/account',
        name: 'AccountView',
        component: () => import('@/views/AccountView'),
        meta: {
            title: 'My account'
        }
    },
    {
        path: '/account/statistics',
        name: 'AccountStatisticsView',
        component: () => import('@/views/AccountStatisticsView'),
        meta: {
            title: 'Account statistics'
        }
    },
    {
        path: '/account/history',
        name: 'AccountHistoryView',
        component: () => import('@/views/AccountHistoryView'),
        meta: {
            title: 'Account history'
        }
    },
    ...staticPages
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = `${to.meta.title} - ${TITLE}`
    } else {
        document.title = TITLE
    }

    next()
})

export default router