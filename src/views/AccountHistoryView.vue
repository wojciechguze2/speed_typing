<template>
  <AccountTabs />
  <Loader v-if="loading"/>
  <table
      v-else
      class="mx-auto my-5 w-50 table table-responsive table-bordered text-center"
  >
    <thead>
      <tr>
        <th>{{ $t('messages.game_mode') }}</th>
        <th>{{ $t('messages.cpm') }}</th>
        <th>{{ $t('game.mistakes_count') }}</th>
        <th>{{ $t('game.time') }}</th>
        <th>{{ $t('messages.date') }}</th>
        <th>{{ $t('game.text_length') }}</th>
      </tr>
    </thead>
    <tbody v-if="historyData.length">
      <tr
          v-for="game in historyData"
          v-bind:key="game.id"
      >
        <td>{{ game.gameModeCode }}</td>
        <td>{{ game.cpm }}</td>
        <td>{{ game.mistakesCount }}</td>
        <td>{{ game.timeMs }}</td>
        <td>{{ game.createDate }}</td>
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
</template>

<script>
import AccountTabs from '@/components/AccountTabs'
import axios from '@/plugins/axios'
import Loader from '@/components/Loader'
import {
  DEFAULT_NOT_AUTHENTICATED_REDIRECT_URL
} from '@/plugins/constants'

export default {
  name: 'AccountHistoryView',
  components: {
    AccountTabs,
    Loader
  },
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
            console.error(error)
          })
    }
  }
}
</script>