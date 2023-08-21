<template>
  <AccountTabs />
  <Loader v-if="loading"/>
  <div
    v-else
  >
    <p>Email: <span class="font-weight-bold">{{ userData.email }}</span></p>
    <p>Data ostatniego logowania: <span class="font-weight-bold">{{ userData.lastLoginDate }}</span></p>
    <p>Data dołączenia: <span class="font-weight-bold">{{ userData.createDate }}</span></p>
    <p>Ostatni tryb gry: <span class="font-weight-bold">{{ userData.lastGameModeCode }}</span></p>
    <button class="btn btn-danger">
      Usuń konto
    </button>
  </div>
</template>

<script>
import AccountTabs from '@/components/AccountTabs'
import Loader from '@/components/Loader'
import axios from "axios";

export default {
  name: 'AccountView',
  components: {
    AccountTabs,
    Loader
  },
  data() {
    return {
      loading: true,
      userData: {
        email: null,
        createDate: null,
        lastLoginDate: null,
        lastGameModeCode: null
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
      const url = `${process.env.VUE_APP_BACKEND_URL}/api/user`

      axios.get(url)
          .then(response => {
            this.userData = response.data
            this.loading = false
          })
          .catch(error => {
            console.error(error)
          })
    }
  }
}
</script>