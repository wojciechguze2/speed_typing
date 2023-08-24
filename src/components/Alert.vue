<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div
        class="toast show cursor-pointer"
        :id="`toast-${id}`"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        @click="closeAlert"
    >
      <div class="toast-header">
        <span
            class="me-2"
            :class="`text-${type}`"
        >
         <font-awesome-icon
             icon="circle"
             @click="closeAlert"
         />
        </span>
        <div
            class="card-heading text-dark me-auto"
        >
          {{ title }}
        </div>
        <button
            class="btn-close"
            type="button"
            data-bs-dismiss="toast"
            :aria-label="$t('messages.close')"
        />
      </div>
      <div
          class="toast-body text-muted"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import {
  ALERT_TYPE_INFO,
  TITLE
} from '@/plugins/constants'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Alert',
  emits: [
      'close'
  ],
  components: {
    FontAwesomeIcon
  },
  props: {
    id: {
      type: String,
      required: false,
      default: '0'
    },
    type: {
      type: String,
      default: ALERT_TYPE_INFO,
    },
    title: {
      type: String,
      default: TITLE,
    },
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    closeAlert(e) {
      e.preventDefault()
      this.$emit('close', this.id)
    }
  }
}
</script>