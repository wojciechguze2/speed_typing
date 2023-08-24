<template>
  <div class="wrapper">
    <MainHeader />
    <router-view
        @flash-alert="flashAlert"
    />
    <MainFooter />
    <template
        v-for="alertData in alerts"
        v-bind:key="alertData.id"
    >
      <AsyncAlert
          :id="alertData.id"
          :type="alertData.type"
          :title="alertData.title"
          :message="alertData.message"
          @close="removeAlert"
      />
    </template>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import MainFooter from '@/components/MainFooter'
import { defineAsyncComponent } from 'vue'
import { ALERT_TIMEOUT } from '@/plugins/constants'
import { generateRandomString } from '@/plugins/helpers'

const AsyncAlert = defineAsyncComponent(() => import('@/components/Alert'))

export default {
  name: 'App',
  components: {
    MainHeader,
    MainFooter,
    AsyncAlert,
  },
  data() {
    return {
      alerts: [],
    }
  },
  methods: {
    /**
     * @param {Object} alertData
     * @param {string} alertData.type - Alert type (from constant: ALERT_TYPES).
     * @param {string} alertData.title
     * @param {string} alertData.message
     */
    flashAlert(alertData) {
      const alertId = generateRandomString()

      this.alerts.push({
        id: alertId,
        ...alertData
      })

      setTimeout(() => {
        this.removeAlert(alertId)
      }, ALERT_TIMEOUT)
    },
    removeAlert(alertId) {
      const alertIndex = this.alerts.findIndex(alert => alert.id === alertId)

      if (alertIndex !== -1) {
        this.alerts.splice(alertIndex, 1)
      }
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/global.scss';
</style>
