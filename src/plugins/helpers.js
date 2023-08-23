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