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
              {{ $t('messages.remind_password') }}
            </span>
            <Loader v-if="loading" />
          </div>
          <form @submit.prevent="remindPassword">
            <div class="mb-3">
              <label for="email" class="form-label">
                {{ $t('messages.email') }}
              </label>
              <input
                  v-model="email"
                  class="form-control"
                  type="email"
                  id="email"
                  :placeholder="$t('messages.email')"
                  required
                  autofocus
              >
            </div>
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>
            <div class="my-2">
              <vue-recaptcha ref="recaptcha" @verify="onRecaptchaVerify" />
            </div>
            <div class="d-grid mb-3">
              <input type="submit" :value="$t('messages.remind_password')" class="btn btn-primary btn-xl" data-dismiss="modal" />
            </div>
          </form>
          <div class="text-center">
            <a href="/login" class="text-decoration-none link-primary">
              {{ $t('messages.login') }}
            </a>
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
import {
  DEFAULT_AUTHENTICATED_REDIRECT_URL, LOGIN_SUCCESS_REDIRECT_URL,
  PASSWORD_REMINDER_ENABLED,
  REGISTER_ENABLED,
  TITLE,
} from '@/plugins/constants'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import LoginSpecial from '@/components/LoginSpecial'
import Loader from '@/components/Loader'
import {
  scrollToTop,
} from '@/plugins/helpers'

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
      loading: false,
      TITLE,
      PASSWORD_REMINDER_ENABLED,
      REGISTER_ENABLED,
    }
  },
  beforeCreate() {
    if (this.$store.getters.isAuthenticated) {
      this.$router.push(DEFAULT_AUTHENTICATED_REDIRECT_URL)
    } else if (!PASSWORD_REMINDER_ENABLED) {
      this.$router.push(LOGIN_SUCCESS_REDIRECT_URL)
    }
  },
  created() {
    scrollToTop()
  },
  methods: {
    onRecaptchaVerify(recaptchaToken) {
      this.recaptchaToken = recaptchaToken
    },
    async remindPassword() {
      this.errorMessage = 'Not implemented'
    }
  }
}
</script>