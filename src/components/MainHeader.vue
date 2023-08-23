<template>
  <header class="navbar navbar-dark bg-dark">
    <div class="navbar-container mx-auto d-flex justify-content-between align-items-center">
      <router-link to="/" class="navbar-brand link-appear font-weight-bold">
        {{ TITLE }}
      </router-link>

      <div class="d-flex align-items-center">
        <a :href="`/game/${GAME_MODE_FAST}`" class="nav-link mx-3">
          <font-awesome-icon icon="play" class="me-1" />
          {{ $t(`game_mode.${GAME_MODE_FAST}`) }}
        </a>
        <router-link to="/game-modes" class="nav-link mx-3">
          <font-awesome-icon icon="gamepad" class="me-1" />
          {{ $t('messages.game_modes') }}
        </router-link>
        <a :href="`/game/${GAME_MODE_RANDOM}`" class="nav-link mx-3">
          <font-awesome-icon icon="random" class="me-1" />
          {{ $t(`game_mode.${GAME_MODE_RANDOM}`) }}
        </a>
      </div>
      <div class="d-flex align-items-center">
        <router-link
            v-if="isAuthenticated"
            to="/account"
            class="nav-link mx-3 text-primary"
        >
          <font-awesome-icon icon="user" size="lg" />
        </router-link>
        <router-link
            v-else
            to="/login"
            class="nav-link mx-3"
        >
          <font-awesome-icon icon="user" size="lg" />
        </router-link>
        <LanguagesDropdown />
      </div>
    </div>
  </header>
</template>

<script>
import {
  GAME_MODE_FAST,
  GAME_MODE_RANDOM,
  TITLE
} from '@/plugins/constants'
import LanguagesDropdown from '@/components/LanguagesDropdown'

export default {
  name: 'MainHeader',
  components: {
    LanguagesDropdown
  },
  data() {
    return {
      GAME_MODE_FAST,
      GAME_MODE_RANDOM,
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
