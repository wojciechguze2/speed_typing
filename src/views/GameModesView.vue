<template>
  <div class="container py-3">
    <Loader v-if="loading" additional-class="lg" :center-horizontally="true" />
    <div v-else>
      <table class="mx-auto my-5 table table-responsive table-bordered text-center table-hover">
        <thead>
          <tr>
            <th class="p-3">{{ $t('messages.game_mode') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="gameMode in gameModes" v-bind:key="gameMode.id">
            <td class="cursor-pointer p-3" @click="goToGameMode(gameMode.code)">
              <router-link :to="`/game/${gameMode.code}`" class="text-dark font-weight-bold text-decoration-none">
                {{ $t(`game_mode.${gameMode.code}`) }}
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import Loader from '@/components/Loader'
import { scrollToTop } from '@/plugins/helpers'
import {
  ALERT_LOAD_DATA_ERROR_MESSAGE_CODE,
  ALERT_LOAD_DATA_ERROR_TITLE_CODE,
  ALERT_TYPE_DANGER,
} from '@/plugins/constants'

export default {
  name: 'GameModesView',
  components: {
    Loader
  },
  data() {
    return {
      loading: true,
      gameModes: []
    }
  },
  created() {
    this.fetchData()
    scrollToTop()
  },
  methods: {
    goToGameMode(code) {
      const route = `/game/${code}`

      this.$router.push(route)
    },
    fetchData() {
      this.loading = true
      const url = `${process.env.VUE_APP_BACKEND_URL}/api/game-modes`,
          params = {
            locale_iso: window.LOCALE_ISO
          }

      axios.get(url, {params})
          .then(response => {
            this.gameModes = response.data
            this.loading = false
          })
          .catch(error => {
            this.$emit('flash-alert', {
              type: ALERT_TYPE_DANGER,
              title: this.$t(`${ALERT_LOAD_DATA_ERROR_TITLE_CODE}`),
              message: this.$t(`${ALERT_LOAD_DATA_ERROR_MESSAGE_CODE}`),
            })
            console.error(error)
          })
    },
  }
}
</script>