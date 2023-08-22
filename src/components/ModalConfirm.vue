<template>
  <div
      v-if="isOpened"
      class="modal fade text-start show"
      :id="modalId"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modal-title"
      aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header border-0 bg-gray-100">
          <h3 v-if="modalTitle" class="h5 text-uppercase modal-title" id="modal-title">
            {{ modalTitle }}
          </h3>
          <button
              class="btn btn-sm btn-outline-secondary close"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Zamknij"
              @click="onClose"
          >
            <font-awesome-icon icon="times" />
          </button>
        </div>
        <div v-if="modalMessage" class="modal-body">
          {{ modalMessage }}
        </div>
        <div class="modal-footer border-0 bg-gray-100">
          <button class="btn btn-secondary" type="button" data-bs-dismiss="modal" @click="onClose">
            {{ $t('messages.cancel') }}
          </button>
          <button class="btn btn-primary" type="submit" @click="onConfirm">
            {{ $t('messages.confirm') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
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
    modalId: {
      type: String,
      default: 'modal-confirm'
    },
    modalTitle: {
      type: String,
      default: 'Confirm'
    },
    modalMessage: {
      type: String,
      default: ''
    }
  },
  methods: {
    onConfirm() {
      this.$emit('confirm')
    },
    onClose() {
      this.$emit('close')
    },
  }
}
</script>
