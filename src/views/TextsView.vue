<template>
  <div class="container py-3">
    <Loader v-if="loading" additional-class="lg" :center-horizontally="true" />
    <div v-else>
      <table class="mx-auto my-5 table table-responsive table-bordered text-center">
        <thead>
          <tr> <!-- todo: add filters -->
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
      <Pagination
          :count="expectedTextsCount"
          :limit="DEFAULT_PAGINATION_LIMIT"
      />
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import Loader from '@/components/Loader'
import Pagination from '@/components/Pagination'
import { DEFAULT_PAGINATION_LIMIT } from '@/plugins/constants'

export default {
  name: 'TextsView',
  components: {
    Loader,
    Pagination
  },
  created() {
    this.fetchData()
  },
  data() {
    return {
      expectedTexts: [],
      expectedTextsCount: 0,
      loading: true,
      DEFAULT_PAGINATION_LIMIT
    }
  },
  watch: {
    '$route.query'() {
      this.fetchData()
    },
  },
  methods: {
    fetchData() {
      this.loading = true

      const page = parseInt(this.$route.query.page || 1),
          limit = parseInt(this.$route.query.limit || DEFAULT_PAGINATION_LIMIT),
          offset = (page - 1) * limit,
          url = `${process.env.VUE_APP_BACKEND_URL}/api/expected-texts`,
          params = {
            locale_iso: window.LOCALE_ISO,
            page,
            offset,
            limit
          }

      axios.get(url, { params })
          .then(response => {
            this.expectedTexts = response.data.expectedTexts
            this.expectedTextsCount = response.data.count
            this.loading = false
          })
          .catch(error => {
            console.error(error)
          })
    },
  }
}
</script>