import store from "@/store"

export function logout() {
    store.commit('setAuthentication', null)
    sessionStorage.setItem('vuex-state', JSON.stringify(store.state))
}

export function setAuthentication(token) {
    store.commit('setAuthentication', token)
    sessionStorage.setItem('vuex-state', JSON.stringify(store.state))
}

export function setFooterLinks(mostPopularGameModes, newGameModes) {
    store.commit('setMostPopularGameModes', mostPopularGameModes)
    store.commit('setNewGameModes', newGameModes)

    sessionStorage.setItem('vuex-state', JSON.stringify(store.state))
}

export function scrollToTop() {
    window.scrollTo(0, 0)
}

export function generateRandomString(length = 8) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    let randomString = ''

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length)
        randomString += chars.charAt(randomIndex)
    }

    return randomString
}