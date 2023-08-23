import { createStore } from 'vuex'

const storedState = sessionStorage.getItem('vuex-state')
const initialState = storedState ? JSON.parse(storedState) : {
    token: null,
    mostPopularGameModes: null,
    newGameModes: null
}

const store = createStore({
    state: initialState,
    getters: {
        isAuthenticated: state => state.token !== null
    },
    mutations: {
        setAuthentication(state, token) {
            state.token = token
        },
        setMostPopularGameModes(state, mostPopularGameModes) {
            state.mostPopularGameModes = mostPopularGameModes
        },
        setNewGameModes(state, newGameModes) {
            state.newGameModes = newGameModes
        }
    },
    actions: {}
})

export default store