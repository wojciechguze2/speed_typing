<template>
  <div class="container py-3">
    <Loader v-if="loading" />
    <div v-else>
      <h3>
        {{ pageData.title }}
      </h3>
      <div>
        {{ pageData.content }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import Loader from '@/components/Loader'

export default {
  name: 'StaticPageView',
  components: {
    Loader
  },
  props: {
    staticPageKey: String
  },
  data() {
    return {
      loading: true,
      pageData: {
        title: null,
        content: null
      }
    }
  },
  methods: {
    async fetchData() {
      this.loading = true

      const url = `${process.env.VUE_APP_BACKEND_URL}/api/globals/static-page/${this.staticPageKey}`,
          params = {
            locale_iso: window.LOCALE_ISO
          }

      axios.get(url, {params}).then(response => {
        this.pageData = response.data
        this.loading = false
      })
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    $route: 'fetchData'
  }
}
</script>