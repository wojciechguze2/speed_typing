<template>
  <div class="page-holder align-items-center py-4 bg-gray-100 min-vh-90">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 px-lg-4">
          <div class="card">
            <div class="card-header px-lg-5">
              <div class="card-heading text-primary">
                {{ TITLE }}
              </div>
            </div>
            <div class="card-body p-lg-5">
              <h3 class="mb-4">
                {{ TITLE }}
              </h3>
              <Loader v-if="loading" />
              <p v-if="REGISTER_NEED_ADMIN_ACCEPT" class="text-muted text-sm mb-5">
                {{ $t('register.need_admin_accept') }}
              </p>
              <form @submit.prevent="register">
                <div class="form-floating mb-3">
                  <div>
                    <label for="email" class="form-label">
                      {{ $t('messages.email') }}
                    </label>
                    <input
                        type="email"
                        id="email"
                        v-model="email"
                        class="form-control"
                        :placeholder="$t('messages.email')"
                        autofocus
                        required
                    >
                  </div>
                </div>
                <div class="form-floating mb-3">
                  <div>
                    <label for="password" class="form-label">
                      {{ $t('messages.password') }}
                    </label>
                    <input
                        type="password"
                        id="password"
                        v-model="password"
                        class="form-control"
                        :placeholder="$t('messages.password')"
                        autocomplete="off"
                        required
                    >
                  </div>
                </div>
                <div v-if="errorMessage" class="alert alert-danger">
                  {{ errorMessage }}
                </div>
                <div class="mb-3">
                  <vue-recaptcha ref="recaptcha" @verify="onRecaptchaVerify" />
                </div>
                <div class="form-group">
                  <button class="btn btn-primary" id="register" type="submit" name="registerSubmit">
                    {{ $t('messages.register') }}
                  </button>
                </div>
              </form>
            </div>
            <div class="card-footer px-lg-5 py-lg-4">
              <div class="text-sm text-muted">
                <a href="/login" class="text-decoration-none text-dark">
                  {{ $t('register.already_have_an_account') }}
                  <span class="link-primary">
                    {{ $t('messages.login') }}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import {
  EMAIL_NOT_VALID_MESSAGE,
  REGISTER_ERROR_MESSAGE,
  REGISTER_NEED_ADMIN_ACCEPT,
  USER_ALREADY_EXISTS_MESSAGE,
  TITLE,
  REGISTER_SUCCESS_REDIRECT_URL,
  DEFAULT_AUTHENTICATED_REDIRECT_URL,
  ALERT_TYPE_DANGER,
  ALERT_EMAIL_VALIDATION_ERROR_MESSAGE_CODE,
  ALERT_TYPE_SUCCESS,
  ALERT_DEFAULT_SUCCESS_MESSAGE_CODE
} from '@/plugins/constants'
import { validateEmail } from '@/plugins/validators'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import Loader from '@/components/Loader'
import {
  setAuthentication
} from '@/plugins/helpers'

export default {
  name: 'RegisterView',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    VueReCaptcha,
    Loader
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      loading: false,
      REGISTER_NEED_ADMIN_ACCEPT,
      TITLE
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
    async register() {
      this.errorMessage = ''

      if (!validateEmail(this.email)) {
        this.errorMessage = this.$t(EMAIL_NOT_VALID_MESSAGE)
        this.$emit('flash-alert', {
          type: ALERT_TYPE_DANGER,
          message: this.$t(`${ALERT_EMAIL_VALIDATION_ERROR_MESSAGE_CODE}`),
        })

        return
      }

      this.loading = true

      const registerData = {
        email: this.email,
        password: this.password
      }

      try {
        const url = `${process.env.VUE_APP_BACKEND_URL}/api/users/register`,
            response = await axios.post(url, registerData) // todo: confirmation

        this.$emit('flash-alert', {
          type: ALERT_TYPE_SUCCESS,
          message: this.$t(`${ALERT_DEFAULT_SUCCESS_MESSAGE_CODE}`),
        })

        setAuthentication(response.data.token)
        this.$router.push(REGISTER_SUCCESS_REDIRECT_URL)
      } catch (error) {
        this.errorMessage = error.response && error.response.status === 409
            ? this.$t(USER_ALREADY_EXISTS_MESSAGE)
            : this.$t(REGISTER_ERROR_MESSAGE)

        console.error(error)
      }

      this.loading = false
    }
  }
}
</script>