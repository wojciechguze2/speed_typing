import store from "@/store"

export function logout() {
    store.commit('setAuthentication', null)
    localStorage.setItem('vuex-state', JSON.stringify(store.state))
}

export function setAuthentication(token) {
    store.commit('setAuthentication', token)
    localStorage.setItem('vuex-state', JSON.stringify(store.state))
}