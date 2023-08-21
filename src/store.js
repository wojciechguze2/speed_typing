import { createStore } from 'vuex'

const storedState = localStorage.getItem('vuex-state');
const initialState = storedState ? JSON.parse(storedState) : {
    token: null
}

const store = createStore({
    state: initialState,
    getters: {
        isAuthenticated: state => state.token !== null
    },
    mutations: {
        setAuthentication(state, token) {
            state.token = token
        }
    }
})

export default store