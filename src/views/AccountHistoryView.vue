<template>
  <AccountTabs />
  <Loader v-if="loading"/>
  <table v-else>

  </table>
</template>

<script>
import AccountTabs from '@/components/AccountTabs'
import axios from 'axios'
import Loader from '@/components/Loader'

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
      this.$router.push('/login')
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