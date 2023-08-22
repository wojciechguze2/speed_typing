import {
    createRouter,
    createWebHistory
} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: () => import('@/views/HomeView')
    },
    {
        path: '/fast-game',
        name: 'FastGameView',
        component: () => import('@/views/FastGameView')
    },
    {
        path: '/contact',
        name: 'ContactView',
        component: () => import('@/views/ContactView')
    },
    {
        path: '/about',
        name: 'AboutView',
        component: () => import('@/views/AboutView')
    },
    {
        path: '/regulations',
        name: 'RegulationsView',
        component: () => import('@/views/RegulationsView')
    },
    {
        path: '/privacy-policy',
        name: 'PrivacyPolicyView',
        component: () => import('@/views/PrivacyPolicyView')
    },
    {
        path: '/sitemap',
        name: 'SitemapView',
        component: () => import('@/views/SitemapView')
    },
    {
        path: '/texts',
        name: 'TextsView',
        component: () => import('@/views/TextsView')
    },
    {
        path: '/login',
        name: 'LoginView',
        component: () => import('@/views/LoginView')
    },
    {
        path: '/logout',
        name: 'LogoutView',
        component: () => import('@/views/LogoutView')
    },
    {
        path: '/register',
        name: 'RegisterView',
        component: () => import('@/views/RegisterView')
    },
    {
        path: '/account',
        name: 'AccountView',
        component: () => import('@/views/AccountView')
    },
    {
        path: '/account/statistics',
        name: 'AccountStatisticsView',
        component: () => import('@/views/AccountStatisticsView')
    },
    {
        path: '/account/history',
        name: 'AccountHistoryView',
        component: () => import('@/views/AccountHistoryView')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router