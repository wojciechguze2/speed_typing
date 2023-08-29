<template>
  <div class="container py-5 contact">
    <h1 class="display-4 text-center">
      {{ $t('contact.contact_form') }}
    </h1>
    <form @submit.prevent="submitForm" class="m-auto" :class="{'w-50': !isMobile}">
      <div class="mb-3">
        <label for="firstname" class="form-label">{{ $t('contact.firstname') }}</label>
        <input v-model="firstname" type="text" class="form-control" id="firstname" />
      </div>
      <div class="mb-3">
        <label for="lastname" class="form-label">{{ $t('contact.lastname') }}</label>
        <input v-model="lastname" type="text" class="form-control" id="lastname" />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">{{ $t('messages.email') }}</label>
        <input v-model="email" type="email" class="form-control" id="email" required />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">{{ $t('contact.phone_number') }}</label>
        <input v-model="phone" type="tel" class="form-control" id="phone" />
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">{{ $t('messages.message') }}</label>
        <textarea v-model="message" class="form-control" id="message" rows="4" required />
      </div>
      <div v-if="formMessage">
        {{ formMessage }}
      </div>
      <div class="mb-3">
        <vue-recaptcha ref="recaptcha" @verify="onRecaptchaVerify" />
      </div>
      <button type="submit" class="btn btn-primary" :class="{'disabled': !isContactAvailable}">{{ $t('messages.send') }}</button>
      <Loader v-if="loading" />
    </form>
  </div>
</template>

<script>
import { VueReCaptcha } from 'vue-recaptcha-v3'
import { validateEmail } from '@/plugins/validators'
import {
  ALERT_DEFAULT_ERROR_MESSAGE_CODE,
  ALERT_DEFAULT_SUCCESS_MESSAGE_CODE,
  ALERT_EMAIL_VALIDATION_ERROR_MESSAGE_CODE,
  ALERT_TYPE_DANGER,
  ALERT_TYPE_SUCCESS,
  EMAIL_NOT_VALID_MESSAGE
} from '@/plugins/constants'
import { scrollToTop } from '@/plugins/helpers'
import axios from '@/plugins/axios'
import Loader from '@/components/Loader'

export default {
  name: 'ContactView',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    VueReCaptcha,
    Loader,
  },
  data() {
    return {
      loading: false,
      formMessage: null,
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      message: '',
      recaptchaToken: null,
      errorMessage: '',
      isContactAvailable: true
    }
  },
  created() {
    scrollToTop()
    this.getLoggedUserEmail()
  },
  methods: {
    getLoggedUserEmail() {
      if (this.$store.getters.isAuthenticated) {
        const url = `${process.env.VUE_APP_BACKEND_URL}/api/user`

        axios.get(url)
            .then(response => {
              this.email = response.data.email
            })
            .catch(() => {
              console.log('User is not logged in.')
            })
      }
    },
    onRecaptchaVerify(recaptchaToken) {
      this.recaptchaToken = recaptchaToken
    },
    submitForm() {
      if (!validateEmail(this.email)) {
        this.errorMessage = this.$t(EMAIL_NOT_VALID_MESSAGE)
        this.$emit('flash-alert', {
          type: ALERT_TYPE_DANGER,
          message: this.$t(`${ALERT_EMAIL_VALIDATION_ERROR_MESSAGE_CODE}`),
        })

        return
      }

      if (!this.isContactAvailable) {
        this.$emit('flash-alert', {
          type: ALERT_TYPE_DANGER,
          message: this.$t(`${ALERT_DEFAULT_ERROR_MESSAGE_CODE}`),
        })

        return
      }

      this.loading = true

      const url = `${process.env.VUE_APP_BACKEND_URL}/api/globals/contact`,
          postData = {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            phone: this.phone,
            message: this.message
        }

      axios.post(url, postData)
          .then(() => {
            this.formMessage = this.$t('messages.send_success')

            this.$emit('flash-alert', {
              type: ALERT_TYPE_SUCCESS,
              message: this.$t(`${ALERT_DEFAULT_SUCCESS_MESSAGE_CODE}`),
            })

            this.loading = false
            this.isContactAvailable = false
          })
          .catch((err) => {
            console.error(err)

            this.$emit('flash-alert', {
              type: ALERT_TYPE_DANGER,
              message: this.$t(`${ALERT_DEFAULT_ERROR_MESSAGE_CODE}`),
            })

            this.loading = false
          })
    },
  },
}
</script>
