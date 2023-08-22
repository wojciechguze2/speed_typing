<script>
import { logout } from '@/plugins/helpers'

export default {
  name: 'LogouView',
  beforeCreate() {
    if (this.$store.getters.isAuthenticated) {
      logout()
    }

    this.$router.push('/')
  }
}
</script>