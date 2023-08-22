import axios from 'axios'
import store from '@/store'
import { logout } from '@/plugins/helpers'
import { DEFAULT_NOT_AUTHENTICATED_REDIRECT_URL } from '@/plugins/constants'

axios.interceptors.request.use(config => {
    const token = store.state.token

    if (token) {
        config.headers.Authorization = `JWT ${token}`
    }

    return config
})

axios.interceptors.response.use(
    response => response,
    error => {
        // todo (optional): attach sentry here

        if (error.response && error.response.status === 403) {
            if (store.getters.isAuthenticated) {
                logout()
            }

            window.location.href = DEFAULT_NOT_AUTHENTICATED_REDIRECT_URL
        }

        return Promise.reject(error)
    }
)

export default axios