<template>
  <div>
    <template v-if="count > 0">
      <div class="pagination justify-content-center">
        <button
            @click="goToPreviousPage"
            :disabled="currentPage === 1"
            class="btn page-item"
            :class="{'disabled border-0': currentPage === 1}"
        >
          ←
        </button>
        <button
            v-for="page in pages"
            :key="page"
            @click="goToPage(page)"
            :class="{ 'btn-primary': page === currentPage }"
            class="btn page-item"
        >
          {{ page }}
        </button>
        <button
            @click="goToNextPage"
            :disabled="currentPage === totalPages"
            class="btn page-item"
            :class="{'disabled border-0': currentPage === totalPages}"
        >
          →
        </button >
        <br>
      </div>
      <span class="row d-flex justify-content-center mt-2">
        {{ $t('pagination.page') }}: ({{ currentPage }} z {{ totalPages }})
      </span>
    </template>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Pagination',
  props: [
    'count',
    'limit'
  ],
  computed: {
    totalPages() {
      return Math.ceil(this.count / this.limit)
    },
    currentPage() {
      return parseInt(this.$route.query.page || 1)
    },
    pages() {
      let startPage = Math.max(1, this.currentPage - 5)
      let endPage = Math.min(this.totalPages, startPage + this.limit - 1)

      if (endPage - startPage < this.limit - 1) {
        startPage = Math.max(1, endPage - this.limit + 1)
      }

      const pagesArray = []

      for (let i = startPage; i <= endPage; i++) {
        pagesArray.push(i)
      }

      return pagesArray
    },
  },
  methods: {
    scroll() {

    },
    goToPage(page) {
      this.scroll()

      this.$router.push({
        query: {
          ...this.$route.query,
          page: page
        }
      })
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 1)
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.goToPage(this.currentPage + 1)
      }
    }
  }
}
</script>
