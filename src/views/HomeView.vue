<template>
  <div class="homepage">
    <div class="container text-center py-5">
      <h1 class="display-4">
        {{ TITLE }}
      </h1>
      <p class="lead mt-1">
        Rozwijaj swoje umiejętności, sprawdzaj się i analizuj statystyki!
      </p>
      <div class="homepage-special">
        <HomepageSpecial />
      </div>
      <div class="mt-5">
        <h2>Dlaczego ćwiczenie szybkiego pisania jest ważne</h2>
        <p>
          Szybkie i dokładne pisanie na klawiaturze to umiejętność, która ma ogromne znaczenie w dzisiejszym cyfrowym świecie. <br>
          Efektywne posługiwanie się klawiaturą zwiększa wydajność pracy, oszczędza czas i pomaga w komunikacji online.
        </p>
      </div>
      <div class="mt-5 row col-lg-12">
        <HomeCards
            :loading="loading"
        />
      </div>
      <div v-if="!loading" class="mt-5">
        <p>
          Jeśli masz pytania, sugestie, chcesz się ze mną skontaktować, nie wahaj się do mnie napisać.
          Zapraszam do kontaktu!
        </p>
        <transition appear name="homepage-special-slide-reverse">
          <router-link to="/contact" class="btn btn-dark">
            Przejdź do formularza kontaktowego
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
