<script>
export default {
  name: 'LogouView',
  beforeCreate() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.commit('setAuthentication', null)
      localStorage.setItem('vuex-state', JSON.stringify(this.$store.state))
    }

    this.$router.push('/')
  }
}
</script>