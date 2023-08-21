<template>
  <div class="container py-5">
    <h1 class="display-4 text-center">Formularz kontaktowy</h1>
    <form @submit.prevent="submitForm" class="w-50 m-auto">
      <div class="mb-3">
        <label for="firstName" class="form-label">Imię</label>
        <input v-model="firstName" type="text" class="form-control" id="firstName" required />
      </div>
      <div class="mb-3">
        <label for="lastName" class="form-label">Nazwisko</label>
        <input v-model="lastName" type="text" class="form-control" id="lastName" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">E-mail</label>
        <input v-model="email" type="email" class="form-control" id="email" required />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Numer telefonu</label>
        <input v-model="phone" type="tel" class="form-control" id="phone" />
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">Wiadomość</label>
        <textarea v-model="message" class="form-control" id="message" rows="4" />
      </div>
      <div class="mb-3">
        <vue-recaptcha ref="recaptcha" @verify="onRecaptchaVerify" />
      </div>
      <button type="submit" class="btn btn-primary">Wyślij</button>
    </form>
  </div>
</template>

<script>
import { VueReCaptcha } from 'vue-recaptcha-v3'

export default {
  name: 'ContactView',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    VueReCaptcha,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      recaptchaToken: null,
    };
  },
  methods: {
    onRecaptchaVerify(recaptchaToken) {
      this.recaptchaToken = recaptchaToken
    },
    submitForm() {
      console.log('Form submitted')
      console.log('First Name:', this.firstName)
      console.log('Last Name:', this.lastName)
      console.log('Email:', this.email)
      console.log('Phone:', this.phone)
      console.log('Message:', this.message)
      console.log('reCAPTCHA Token:', this.recaptchaToken)
    },
  },
};
</script>
