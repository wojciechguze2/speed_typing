import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView'
import FastGameView from '@/views/FastGameView'
import ContactView from '@/views/ContactView'
import AboutView from '@/views/AboutView'
import SitemapView from '@/views/SitemapView'
import PrivacyPolicyView from '@/views/PrivacyPolicyView'
import RegulationsView from '@/views/RegulationsView'
import TextsView from '@/views/TextsView'
import LoginView from '@/views/LoginView'
import RegisterView from '@/views/RegisterView'
import AccountView from '@/views/AccountView'
import AccountStatisticsView from '@/views/AccountStatisticsView'
import LogoutView from '@/views/LogoutView'
import AccountHistoryView from '@/views/AccountHistoryView'

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView
    },
    {
        path: '/fast-game',
        name: 'FastGameView',
        component: FastGameView
    },
    {
        path: '/contact',
        name: 'ContactView',
        component: ContactView
    },
    {
        path: '/about',
        name: 'AboutView',
        component: AboutView
    },
    {
        path: '/regulations',
        name: 'RegulationsView',
        component: RegulationsView
    },
    {
        path: '/privacy-policy',
        name: 'PrivacyPolicyView',
        component: PrivacyPolicyView
    },
    {
        path: '/sitemap',
        name: 'SitemapView',
        component: SitemapView
    },
    {
        path: '/texts',
        name: 'TextsView',
        component: TextsView
    },
    {
        path: '/login',
        name: 'LoginView',
        component: LoginView
    },
    {
        path: '/logout',
        name: 'LogoutView',
        component: LogoutView
    },
    {
        path: '/register',
        name: 'RegisterView',
        component: RegisterView
    },
    {
        path: '/account',
        name: 'AccountView',
        component: AccountView
    },
    {
        path: '/account/statistics',
        name: 'AccountStatisticsView',
        component: AccountStatisticsView
    },
    {
        path: '/account/history',
        name: 'AccountHistoryView',
        component: AccountHistoryView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router