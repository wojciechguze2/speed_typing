<template>
  <div class="wrapper">
    <MainHeader
        :key="mainHeaderKey"
    />
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
import {
  ALERT_TIMEOUT,
} from '@/plugins/constants'
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
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      alerts: [],
      mainHeaderKey: 0
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeAlert)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeAlert)
  },
  methods: {
    /**
     * todo: make navbar responsive (not like this)
     */
    resizeAlert() {
      const windowWidth = window.innerWidth,
          windowHeight = window.innerHeight

      const widthDifference = Math.abs(windowWidth - this.windowWidth)
      const heightDifference = Math.abs(windowHeight - this.windowHeight)

      if (widthDifference >= 25 && heightDifference >= 25) {
        this.mainHeaderKey += 1
      }
    },
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
