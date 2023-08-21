<template>
  <Loader v-if="loading" additional-class="full-size" :center-horizontally="true" />
  <div v-else>
    <table class="table table-responsive">
      <thead>
        <tr>
          <th>Tekst</th>
          <th>Autor</th>
          <th>Język</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="text in expectedTexts" v-bind:key="text.id">
          <td>{{ text.text }}</td>
          <td>{{ text.author ? text.author.name : '' }}</td>
          <td>{{ text.locale.iso }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Loader from '@/components/Loader'

export default {
  name: 'TextsView',
  components: {
    Loader
  },
  created() {
    this.fetchData()
  },
  data() {
    return {
      expectedTexts: [],
      loading: true,
    }
  },
  methods: {
    fetchData() {
      const url = `${process.env.VUE_APP_BACKEND_URL}/api/expected-texts`

      axios.get(url)
          .then(response => {
            this.expectedTexts = response.data
            this.loading = false
          })
          .catch(error => {
            console.error(error)
          })
    },
  }
}
</script>