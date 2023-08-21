<template>
  <AccountTabs />
  <Loader v-if="loading"/>
  <table
      v-else
      class="mx-auto my-5 w-50 table table-responsive table-bordered"
  >
    <tbody>
      <tr>
        <td>
          Ostatni CPM
        </td>
        <td>
          {{ statisticsData.lastCpm || '-' }}
        </td>
      </tr>
      <tr>
        <td>
          Średni CPM
        </td>
        <td>
          {{ statisticsData.averageCpm || '-' }}
        </td>
      </tr>
      <tr>
        <td>
          Najlepszy CPM
        </td>
        <td>
          {{ statisticsData.bestCpm || '-' }}
        </td>
      </tr>
      <tr>
        <td>
          Ilość rozegranych gier
        </td>
        <td>
          {{ statisticsData.gamesPlayedCount || '-' }}
        </td>
      </tr>
      <tr>
        <td>
          Ulubiony tryb
        </td>
        <td>
          {{ statisticsData.favoriteGameModeCode || '-' }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import AccountTabs from '@/components/AccountTabs'
import axios from 'axios'
import Loader from '@/components/Loader'

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
      this.$router.push('/login')
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