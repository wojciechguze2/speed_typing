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
        <div class="col-lg-4">
          <div class="card bg-dark text-white p-3">
            <div class="card-title">
              <font-awesome-icon icon="flag" size="lg" />
            </div>
            <div class="card-body d-flex align-items-center">
              <p>
                Strona oferuje ćwiczenia w trzech językach: polskim, angielskim i niemieckim.
              </p>
            </div>
            <div class="card-footer">
              <router-link to="/" class="text-decoration-none link-primary">
                Zmień język
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card bg-dark text-white p-3">
            <div class="card-title">
              <font-awesome-icon icon="database" size="lg" />
            </div>
            <div class="card-body d-flex align-items-center">
              <p>
                Rozbudowana baza tekstów do ćwiczeń pozwala sprawdzić się w różnorodnych kontekstach.
              </p>
            </div>
            <div class="card-footer">
              <router-link to="/texts" class="text-decoration-none link-primary">
                Przejdź do listy tekstów
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card bg-dark text-white p-3">
            <div class="card-title">
              <font-awesome-icon icon="chart-pie" size="lg" />
            </div>
            <div class="card-body d-flex align-items-center">
              <p>
                Dzięki rozbudowanym statystykom możesz śledzić swoje postępy oraz analizować wyniki.
              </p>
            </div>
            <div class="card-footer">
              <router-link
                  v-if="isCustomerLogger"
                  to="/"
                  class="text-decoration-none link-primary"
              >
                Zobacz swoje statystki
              </router-link>
              <router-link
                  v-else
                  to="/"
                  class="text-decoration-none link-primary"
              >
                Zaloguj się, aby zobaczyć swoje statystki
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <p>
          Jeśli masz pytania, sugestie, chcesz się ze mną skontaktować, nie wahaj się do mnie napisać.
          Zapraszam do kontaktu!
        </p>
        <router-link to="/contact" class="btn btn-dark">
          Przejdź do formularza kontaktowego
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import HomepageSpecial from '@/components/HomepageSpecial'
import { TITLE } from '@/plugins/constants'

export default {
  name: 'HomeView',
  components: {
    HomepageSpecial
  },
  data() {
    return {
      isCustomerLogger: false,
      TITLE
    }
  }
}
</script>
