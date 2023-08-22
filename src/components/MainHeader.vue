<template>
  <header class="navbar navbar-dark bg-dark">
    <div class="container d-flex justify-content-between align-items-center">
      <router-link to="/" class="navbar-brand text-primary">
        {{ TITLE }}
      </router-link>

      <div class="d-flex align-items-center">
        <router-link to="/fast-game" class="nav-link mx-3">
          <font-awesome-icon icon="play" class="me-1" />
          {{ $t('game_mode.fast-game') }}
        </router-link>
        <div class="dropdown ms-3">
          <button
              class="btn btn-outline-light dropdown-toggle"
              type="button"
              id="game-mode-dropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
          >
            {{ $t('messages.game_modes') }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="game-mode-dropdown">
            <li>
              <router-link to="/mode1" class="dropdown-item">
                Tryb 1
              </router-link>
            </li>
            <li>
              <router-link to="/mode2" class="dropdown-item">
                Tryb 2
              </router-link>
            </li>
          </ul>
        </div>
        <router-link to="/texts" class="nav-link mx-3">
          <font-awesome-icon icon="list" class="me-1" />
            {{ $t('messages.texts_list') }}
          </router-link>
      </div>
      <div class="d-flex align-items-center">
        <router-link to="/about" class="nav-link mx-3">
          {{ $t('messages.about_site') }}
        </router-link>
        <router-link to="/contact" class="nav-link mx-3">
          {{ $t('messages.contact') }}
        </router-link>
        <router-link :to="isAuthenticated ? '/account' : '/login'" class="nav-link mx-3">
          <font-awesome-icon icon="user" />
        </router-link>
        <LanguageSelect />
      </div>
    </div>
  </header>
</template>

<script>
import { TITLE } from '@/plugins/constants'
import LanguageSelect from '@/components/LanguageSelect'

export default {
  name: 'MainHeader',
  components: {LanguageSelect},
  data() {
    return {
      TITLE
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>
