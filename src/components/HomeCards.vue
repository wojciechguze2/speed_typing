<template>
  <div class="col-lg-4">
    <transition name="bounce">
      <div v-if="!loading" class="card bg-dark text-white p-3">
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
    </transition>
  </div>
  <div class="col-lg-4">
    <transition name="bounce">
      <div v-if="!loading" class="card bg-dark text-white p-3">
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
    </transition>
  </div>
  <div class="col-lg-4">
    <transition name="bounce">
      <div v-if="!loading" class="card bg-dark text-white p-3">
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
              v-if="isAuthenticated"
              to="/account/statistics"
              class="text-decoration-none link-primary"
          >
            Zobacz swoje statystki
          </router-link>
          <router-link
              v-else
              to="/login"
              class="text-decoration-none link-primary"
          >
            Zaloguj się, aby zobaczyć swoje statystki
          </router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'HomeCards',
  props: [
      'loading'
  ],
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>