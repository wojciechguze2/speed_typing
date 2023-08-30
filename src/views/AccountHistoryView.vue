<template>
  <div class="container">
    <AccountTabs />
    <Loader v-if="loading"/>
    <table
        v-else
        class="mx-auto my-5 table table-responsive table-bordered text-center"
    >
      <thead>
        <tr>
          <th>{{ $t('messages.game_mode') }}</th>
          <th>{{ $t('messages.cpm') }}</th>
          <th>{{ $t('game.mistakes_count') }}</th>
          <template v-if="!isMobile">
            <th>{{ $t('game.time') }}</th>
            <th>{{ $t('messages.date') }}</th>
          </template>
          <th>{{ $t('game.text_length') }}</th>
        </tr>
      </thead>
      <tbody v-if="historyData.length">
        <tr
            v-for="game in historyData"
            v-bind:key="game.id"
        >
          <td>{{ $t(`game_mode.${game.gameModeCode}`) }}</td>
          <td>{{ game.cpm }}</td>
          <td>{{ game.mistakesCount }}</td>
          <template v-if="!isMobile">
            <td>{{ game.timeMs }}</td>
            <td>{{ game.createDate }}</td>
          </template>
          <td>{{ game.expectedTextLength }}</td>
        </tr>
      </tbody>
      <tbody
        v-else
      >
        <tr>
          <td colspan="6">
            {{ $t('account.history.no_games_found') }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AccountTabs from '@/components/AccountTabs'
import axios from '@/plugins/axios'
import Loader from '@/components/Loader'
import {
  ALERT_LOAD_DATA_ERROR_MESSAGE_CODE,
  ALERT_LOAD_DATA_ERROR_TITLE_CODE,
  ALERT_TYPE_DANGER,
  DEFAULT_NOT_AUTHENTICATED_REDIRECT_URL
} from '@/plugins/constants'

export default {
  name: 'AccountHistoryView',
  components: {
    AccountTabs,
    Loader
  },
  emits: [
      'flash-alert'
  ],
  data() {
    return {
      loading: true,
      historyData: null
    }
  },
  beforeCreate() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push(DEFAULT_NOT_AUTHENTICATED_REDIRECT_URL)
    }
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      const url = `${process.env.VUE_APP_BACKEND_URL}/api/user/history`

      axios.get(url)
          .then(response => {
            this.historyData = response.data
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
    }
  }
}
</script>