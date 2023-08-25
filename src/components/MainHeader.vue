<template>
  <header class="navbar navbar-dark bg-dark">
    <button
        class="hamburger-btn d-sm-block d-md-none align-self-start btn btn-dark"
        @click="toggleMenu"
    >
      <font-awesome-icon icon="bars" />
    </button>
    <div class="navbar-container mx-auto d-flex justify-content-between align-items-center">
      <a
          to="/"
          class="navbar-brand link-appear font-weight-bold"
          :class="{'m-auto': isMobile}"
      >
        {{ TITLE }}
      </a>

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
        <a href="/game-modes" class="nav-link mx-3" :class="{'py-1': isMobile}">
          <font-awesome-icon icon="gamepad" class="me-1" />
          {{ $t('messages.game_modes') }}
        </a>
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
        <a
            v-if="isAuthenticated"
            to="/account"
            class="nav-link mx-3 text-primary"
            :class="{'py-1': isMobile}"
        >
          <font-awesome-icon icon="user" size="lg" />
          <span v-if="isMobile" class="mx-2">
            {{ $t(`messages.account`) }}
          </span>
        </a>
        <a
            v-else
            to="/login"
            class="nav-link mx-3"
            :class="{'py-1': isMobile}"
        >
          <font-awesome-icon icon="user" size="lg" />
          <span v-if="isMobile" class="mx-2">
            {{ $t(`messages.login`) }}
          </span>
        </a>
        <LanguagesDropdown v-if="!isMobile" />
      </div>
    </div>
    <LanguagesDropdown v-if="isMobile" additional-class="me-1 my-1 align-self-start" />
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
