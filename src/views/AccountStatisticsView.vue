<template>
  <AccountTabs />
  <div class="container py-3">
    <Loader v-if="loading"/>
    <table
        v-else
        class="mx-auto my-5 table table-responsive table-bordered"
    >
      <tbody>
        <tr>
          <td>
            {{ $t('account.statistics.last_cpm') }}
          </td>
          <td>
            {{ statisticsData.lastCpm || '-' }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t('account.statistics.average_cpm') }}
          </td>
          <td>
            {{ statisticsData.averageCpm || '-' }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t('account.statistics.best_cpm') }}
          </td>
          <td>
            {{ statisticsData.bestCpm || '-' }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t('account.statistics.games_played_count') }}
          </td>
          <td>
            {{ statisticsData.gamesPlayedCount || '-' }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t('account.statistics.favourite_game_mode') }}
          </td>
          <td>
            {{ statisticsData.favoriteGameModeCode || '-' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// todo: add charts (Chart.js)
import AccountTabs from '@/components/AccountTabs'
import axios from '@/plugins/axios'
import Loader from '@/components/Loader'
import {
  DEFAULT_NOT_AUTHENTICATED_REDIRECT_URL
} from '@/plugins/constants'

export default {
  name: 'AccountStatisticsView',
  components: {
    AccountTabs,
    Loader
  },
  data() {
    return {
      loading: true,
      statisticsData: {
        lastCpm: null,
        averageCpm: null,
        bestCpm: null,
        gamesPlayedCount: null,
        favoriteGameModeCode: null,
      }
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
      const url = `${process.env.VUE_APP_BACKEND_URL}/api/user/statistics`

      axios.get(url)
          .then(response => {
            this.statisticsData = response.data
            this.loading = false
          })
          .catch(error => {
            console.error(error)
          })
    }
  }
}
</script>