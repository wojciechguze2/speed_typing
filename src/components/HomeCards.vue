<template>
  <div class="col-lg-4 my-2" role="presentation">
    <transition name="transition-homepage-special-slide-reverse">
      <div v-if="!loading" class="card bg-dark text-white p-3">
        <div class="card-title">
          <font-awesome-icon icon="flag" size="lg" />
        </div>
        <div class="card-body d-flex align-items-center">
          <p>
            {{ $t('homepage.cards.card_1.body') }}
          </p>
        </div>
        <div class="card-footer">
          <!--<router-link to="/" class="text-decoration-none link-primary">
            {{ $t('homepage.cards.card_1.footer') }}
          </router-link>-->
          <LanguagesDropdown
              label-type="name"
              id-postfix="homepage-cards"
          />
        </div>
      </div>
    </transition>
  </div>
  <div class="col-lg-4 my-2">
    <transition name="transition-homepage-special-slide-reverse">
      <div v-if="!loading" class="card bg-dark text-white p-3">
        <div class="card-title">
          <font-awesome-icon icon="database" size="lg" />
        </div>
        <div class="card-body d-flex align-items-center">
          <p>
            {{ $t('homepage.cards.card_2.body') }}
          </p>
        </div>
        <div class="card-footer">
          <router-link to="/texts" class="text-decoration-none link-primary">
            {{ $t('homepage.cards.card_2.footer') }}
          </router-link>
        </div>
      </div>
    </transition>
  </div>
  <div class="col-lg-4 my-2">
    <transition name="transition-homepage-special-slide-reverse">
      <div v-if="!loading" class="card bg-dark text-white p-3">
        <div class="card-title">
          <font-awesome-icon icon="chart-pie" size="lg" />
        </div>
        <div class="card-body d-flex align-items-center">
          <p>
            {{ $t('homepage.cards.card_3.body') }}
          </p>
        </div>
        <div class="card-footer">
          <router-link
              v-if="isAuthenticated"
              to="/account/statistics"
              class="text-decoration-none link-primary"
          >
            {{ $t('homepage.cards.card_3.footer') }}
          </router-link>
          <router-link
              v-else
              to="/login"
              class="text-decoration-none link-primary"
          >
            {{ $t('homepage.cards.card_3.footer_not_authenticated') }}
          </router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import LanguagesDropdown from '@/components/LanguagesDropdown'
export default {
  name: 'HomeCards',
  components: {
    LanguagesDropdown
  },
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