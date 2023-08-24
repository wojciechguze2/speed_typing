<template>
  <div class="container py-5 contact">
    <h1 class="display-4 text-center">
      {{ $t('contact.contact_form') }}
    </h1>
    <form @submit.prevent="submitForm" class="w-50 m-auto">
      <div class="mb-3">
        <label for="firstName" class="form-label">{{ $t('contact.firstname') }}</label>
        <input v-model="firstName" type="text" class="form-control" id="firstName" />
      </div>
      <div class="mb-3">
        <label for="lastName" class="form-label">{{ $t('contact.lastname') }}</label>
        <input v-model="lastName" type="text" class="form-control" id="lastName" />
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
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>
      <div class="mb-3">
        <vue-recaptcha ref="recaptcha" @verify="onRecaptchaVerify" />
      </div>
      <button type="submit" class="btn btn-primary">{{ $t('messages.send') }}</button>
      <Loader v-if="loading" />
      <div v-if="alert">
        {{ alert }}
      </div>
    </form>
  </div>
</template>

<script>
import { VueReCaptcha } from 'vue-recaptcha-v3'
import { validateEmail } from '@/plugins/validators'
import { EMAIL_NOT_VALID_MESSAGE } from '@/plugins/constants'
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
      alert: null,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      recaptchaToken: null,
      errorMessage: ''
    }
  },
  created() {
    scrollToTop()
  },
  methods: {
    onRecaptchaVerify(recaptchaToken) {
      this.recaptchaToken = recaptchaToken
    },
    submitForm() {
      if (!validateEmail(this.email)) {
        this.errorMessage = EMAIL_NOT_VALID_MESSAGE

        return
      }

      this.loading = true

      const url = `${process.env.VUE_APP_BACKEND_URL}/api/globals/contact`,
          postData = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            message: this.message
        }

      axios.post(url, postData).then(() => {
        // todo: add alert
        this.alert = 'Wysłano pomyślnie!'
        this.loading = false
        this.$router.push('/')
      })
    },
  },
};
</script>
