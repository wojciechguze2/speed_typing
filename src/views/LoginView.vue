<template>
  <div class="container-fluid px-0 overflow-x-hidden">
    <div class="row gx-0 min-vh-90">
      <div class="col-sm-12 col-md-9 col-lg-6 col-xl-4 px-5 d-flex align-items-center shadow">
        <div class="w-100 py-5">
          <div class="text-center">
            <h2 class="h4 mb-2">
              {{ TITLE }}
            </h2>
            <span style="max-width: 6rem;">
              Logowanie
            </span>
            <Loader v-if="loading" />
          </div>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="email" class="form-label">E-mail</label>
              <input v-model="email" class="form-control" type="email" id="email" placeholder="E-mail" required autofocus>
            </div>
            <div class="mb-4">
              <div class="row">
                <div class="col">
                  <label for="password" class="form-label">Hasło</label>
                </div>
              </div>
              <input type="password" id="password" v-model="password" class="form-control" placeholder="Hasło" required autocomplete="off">
            </div>
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>
            <div class="my-2">
              <vue-recaptcha ref="recaptcha" @verify="onRecaptchaVerify" />
            </div>
            <div class="d-grid mb-5">
              <input type="submit" value="Zaloguj się" class="btn btn-primary btn-xl"  data-dismiss="modal" />
            </div>
          </form>
          <div v-if="REGISTER_ENABLED" class="text-center">
            <router-link to="/register" class="text-dark text-decoration-none">
              Nie posiadasz konta?
              <span class="link-primary">
                Zarejestruj się!
              </span>
            </router-link>
          </div>
          <div v-if="PASSWORD_REMINDER_ENABLED" class="text-center">
            <router-link to="/password-reminder" class="text-dark text-decoration-none">
              Zapomniałeś hasła?
              <span class="link-primary">
                Przypomnij!
              </span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="d-sm-none d-md-none col-lg-6 col-xl-8 d-lg-flex px-5 py-5 d-xl-flex align-items-center text-center m-auto place-content-center">
        <LoginSpecial />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { validateEmail } from '@/plugins/validators'
import {
  DEFAULT_AUTHENTICATED_REDIRECT_URL,
  EMAIL_NOT_VALID_MESSAGE,
  LOGIN_ERROR_MESSAGE,
  LOGIN_SUCCESS_REDIRECT_URL,
  PASSWORD_REMINDER_ENABLED,
  REGISTER_ENABLED,
  TITLE,
  USER_IS_NOT_ACTIVE_MESSAGE
} from '@/plugins/constants'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import LoginSpecial from '@/components/LoginSpecial'
import Loader from '@/components/Loader'

export default {
  name: 'LoginView',
  components: {
    Loader,
    // eslint-disable-next-line vue/no-unused-components
    VueReCaptcha,
    LoginSpecial
  },
  data() {
    return {
      errorMessage: '',
      email: '',
      password: '',
      loading: false,
      TITLE,
      PASSWORD_REMINDER_ENABLED,
      REGISTER_ENABLED,
    }
  },
  beforeCreate() {
    if (this.$store.getters.isAuthenticated) {
      this.$router.push(DEFAULT_AUTHENTICATED_REDIRECT_URL)
    }
  },
  methods: {
    onRecaptchaVerify(recaptchaToken) {
      this.recaptchaToken = recaptchaToken
    },
    async login() {
      this.errorMessage = ''

      if (!validateEmail(this.email)) {
        this.errorMessage = EMAIL_NOT_VALID_MESSAGE

        return
      }

      this.loading = true

      const loginData = {
        email: this.email,
        password: this.password
      }

      try {
        const url = `${process.env.VUE_APP_BACKEND_URL}/api/users/login`,
            response = await axios.post(url, loginData)

        this.$store.commit('setAuthentication', response.data.token)
        localStorage.setItem('vuex-state', JSON.stringify(this.$store.state))
        this.$router.push(LOGIN_SUCCESS_REDIRECT_URL)
      } catch (error) {
        this.errorMessage = error.response && error.response.status === 406
            ? USER_IS_NOT_ACTIVE_MESSAGE
            : LOGIN_ERROR_MESSAGE

        console.error(error)
      }

      this.loading = false
    }
  }
}
</script>