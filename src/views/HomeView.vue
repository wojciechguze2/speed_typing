<template>
  <div class="homepage">
    <div class="container text-center py-5">
      <h1 class="display-4">
        {{ TITLE }}
      </h1>
      <p class="lead mt-1">
        {{ $t('homepage.content_1.header') }}
      </p>
      <div class="homepage-special">
        <HomepageSpecial />
      </div>
      <div class="mt-5">
        <h2>
          {{ $t('homepage.content_2.header') }}
        </h2>
        <p v-html="$t('homepage.content_2.content')" /> <!-- todo: change v-html (to avoid xss) -->
      </div>
      <div class="mt-5 row col-lg-12">
        <HomeCards
            :loading="loading"
        />
      </div>
      <div v-if="!loading" class="mt-5">
        <p>
          {{ $t('homepage.content_3.header') }}
          {{ $t('homepage.content_3.content') }}
        </p>
        <transition appear name="homepage-special-slide-reverse">
          <router-link to="/contact" class="btn btn-dark">
            {{ $t('homepage.content_3.button_text') }}
          </router-link>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import HomepageSpecial from '@/components/HomepageSpecial'
import { TITLE } from '@/plugins/constants'
import HomeCards from '@/components/HomeCards'

export default {
  name: 'HomeView',
  components: {
    HomeCards,
    HomepageSpecial
  },
  data() {
    return {
      loading: true,
      TITLE
    }
  },
  mounted() {
    this.loading = false
  }
}
</script>

<style lang="scss">
  @import '@/styles/homepage.scss';
</style>
