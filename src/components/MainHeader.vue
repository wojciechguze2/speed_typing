<template>
  <header class="navbar navbar-dark bg-dark">
    <button
        class="d-sm-block d-md-none align-self-start btn btn-dark"
        @click="toggleMenu"
        aria-label="Toggle header menu button"
    >
      <font-awesome-icon icon="bars" />
    </button>
    <div class="navbar-container mx-auto d-flex justify-content-between align-items-center" role="navigation">
      <router-link
          to="/"
          class="navbar-brand link-appear font-weight-bold"
          :class="{'m-auto': isMobile}"
      >
        {{ TITLE }}
      </router-link>

      <div
          class="align-items-center navbar-links--1"
          :class="{
            'd-flex': !isMobile,
            'd-none': !isMenuOpen && isMobile,
            'text-center m-auto': isMobile
          }"
      >
        <a :href="`/game/${GAME_MODE_FAST}`" class="nav-link mx-3" :class="{'py-1': isMobile}">
          <font-awesome-icon icon="play" class="me-1" />
          {{ $t(`game_mode.${GAME_MODE_FAST}`) }}
        </a>
        <router-link to="/game-modes" class="nav-link mx-3" :class="{'py-1': isMobile}">
          <font-awesome-icon icon="gamepad" class="me-1" />
          {{ $t('messages.game_modes') }}
        </router-link>
        <a :href="`/game/${GAME_MODE_RANDOM}`" class="nav-link mx-3" :class="{'py-1': isMobile}">
          <font-awesome-icon icon="random" class="me-1" />
          {{ $t(`game_mode.${GAME_MODE_RANDOM}`) }}
        </a>
      </div>
      <div
          class="align-items-center navbar-links--2"
          :class="{
            'd-flex': !isMobile,
            'd-none': !isMenuOpen && isMobile,
            'text-center m-auto': isMobile
          }"
      >
        <router-link
            v-if="isAuthenticated"
            to="/account"
            class="nav-link mx-3 text-primary"
            :class="{'py-1': isMobile}"
            aria-label="My account"
        >
          <font-awesome-icon icon="user" size="lg" />
          <span v-if="isMobile" class="mx-2">
            {{ $t(`messages.account`) }}
          </span>
        </router-link>
        <router-link
            v-else
            to="/login"
            class="nav-link mx-3"
            :class="{'py-1': isMobile}"
            aria-label="Sign in"
        >
          <font-awesome-icon icon="user" size="lg" />
          <span v-if="isMobile" class="mx-2">
            {{ $t(`messages.login`) }}
          </span>
        </router-link>
        <LanguagesDropdown
            v-if="!isMobile"
            id-postfix="header-desktop"
        />
      </div>
    </div>
    <LanguagesDropdown
        v-if="isMobile"
        additional-class="me-1 my-1 align-self-start"
        id-postfix="header-mobile"
    />
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
      isMenuOpen: false,
      GAME_MODE_FAST,
      GAME_MODE_RANDOM,
      TITLE
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
</script>
