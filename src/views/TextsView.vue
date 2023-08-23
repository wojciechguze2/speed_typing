<template>
  <div class="container py-3">
    <Loader v-if="loading" additional-class="lg" :center-horizontally="true" />
    <div v-else>
      <table class="mx-auto my-5 table table-responsive table-bordered text-center">
        <thead>
          <tr>
            <th>{{ $t('texts.text') }}</th>
            <!--<th>{{ $t('messages.author') }}</th>
            <th>{{ $t('messages.language') }}</th>-->
          </tr>
        </thead>
        <tbody>
          <tr v-for="text in expectedTexts" v-bind:key="text.id">
            <td>{{ text.text }}</td>
            <!--<td>{{ text.author ? text.author.name : '' }}</td>
            <td>{{ text.locale.iso }}</td>-->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
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
      const url = `${process.env.VUE_APP_BACKEND_URL}/api/expected-texts`,
          params = {
            locale_iso: window.LOCALE_ISO
          }

      axios.get(url, {params})
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