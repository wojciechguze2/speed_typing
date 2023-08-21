import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView'
import FastGameView from '@/views/FastGameView'
import ContactView from '@/views/ContactView'
import AboutView from '@/views/AboutView'
import SitemapView from '@/views/SitemapView'
import PrivacyPolicyView from '@/views/PrivacyPolicyView'
import RegulationsView from '@/views/RegulationsView'
import TextsView from '@/views/TextsView'

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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router