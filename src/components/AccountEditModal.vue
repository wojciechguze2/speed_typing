<template>
  <div
      v-if="isOpened"
      class="modal fade text-start show"
      id="acccount-edit-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modal-title"
      aria-hidden="true"
  >
    <form @submit.prevent="onSubmit">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header border-0 bg-gray-100">
            <h3 class="h5 text-uppercase modal-title" id="modal-title">
              {{ $t('account.edit_account') }}
            </h3>
            <button
                class="btn btn-sm btn-outline-secondary close"
                type="button"
                data-bs-dismiss="modal"
                :aria-label="$t('messages.close')"
                @click="onClose"
            >
              <font-awesome-icon icon="times" />
            </button>
          </div>
          <div class="modal-body">
            <div class="form-floating mb-3">
              <div>
                <label for="email" class="form-label">{{ $t('messages.email') }}</label>
                <input
                    type="email"
                    id="email"
                    v-model="email"
                    class="form-control"
                    autocomplete="off"
                    autofocus
                    required
                    :placeholder="ACCOUNT_EMAIL_CHANGE_AVAILABLE ? $t('account.new_email') : currentEmail"
                    :disabled="!ACCOUNT_EMAIL_CHANGE_AVAILABLE"
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
                    :placeholder="$t('account.new_password')"
                    autocomplete="off"
                    required
                >
              </div>
            </div>
          </div>
          <div class="modal-footer border-0 bg-gray-100">
            <button class="btn btn-secondary" type="button" data-bs-dismiss="modal" @click="onClose">
              {{ $t('messages.cancel') }}
            </button>
            <button class="btn btn-primary" type="submit" @click="onSubmit">
              {{ $t('messages.save') }}
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ACCOUNT_EMAIL_CHANGE_AVAILABLE } from '@/plugins/constants'
export default {
  components: {
    FontAwesomeIcon
  },
  emits: [
    'confirm',
    'close'
  ],
  props: {
    isOpened: Boolean,
    currentEmail: String
  },
  data() {
    return {
      email: null,
      password: null,
      ACCOUNT_EMAIL_CHANGE_AVAILABLE
    }
  },
  methods: {
    onSubmit() {
      this.$emit('confirm', this.email, this.password)
    },
    onClose(e) {
      e.preventDefault()
      this.$emit('close')
    },
  },
  mounted() {
    if (this.currentEmail) {
      this.email = this.currentEmail
    }
  }
}
</script>
