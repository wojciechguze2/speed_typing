<template>
  <footer ref="mainFooter" class="footer footer-animation bg-dark text-white w-100 mt-auto mb-0" role="contentinfo">
    <div class="flex-grow-1">
      <div class="container" :class="isMobile ? 'pt-5 pb-3' : 'py-5'">
        <div class="row">
          <div class="col-md-4 text-center footer-start">
            <p class="footer-section-header">
              {{ $t('messages.information') }}
            </p>
            <ul class="list-unstyled">
              <li>
                <router-link to="/about" class="text-white footer-link">
                  {{ $t('messages.about_site') }}
                </router-link>
              </li>
              <li>
                <router-link to="/texts" class="text-white footer-link">
                  {{ $t('messages.texts_list') }}
                </router-link>
              </li>
              <li>
                <a href="/regulations" class="text-white footer-link">
                  {{ $t('messages.regulations') }}
                </a>
              </li>
              <li>
                <a href="/privacy-policy" class="text-white footer-link">
                  {{ $t('messages.privacy_policy') }}
                </a>
              </li>
              <li>
                <router-link to="/contact" class="text-white footer-link">
                  {{ $t('messages.contact') }}
                </router-link>
              </li>
            </ul>
          </div>
          <div class="col-md-4 text-center footer-middle">
            <p class="footer-section-header">
              {{ $t('messages.most_popular_game_modes') }}
            </p>
            <ul class="list-unstyled">
              <li v-for="popularGameMode in mostPopularGameModes" v-bind:key="popularGameMode.id">
                <a :href="`/game/${popularGameMode.code}`" class="text-white footer-link">
                  {{ $t(`game_mode.${popularGameMode.code}`) }}
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-4 text-center footer-end">
            <p class="footer-section-header">
              {{ $t('messages.newest_game_modes') }}
            </p>
            <ul class="list-unstyled">
              <li v-for="newGameMode in newGameModes" v-bind:key="newGameMode.id">
                <a :href="`/game/${newGameMode.code}`" class="text-white footer-link">
                  {{ $t(`game_mode.${newGameMode.code}`) }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end align-items-center p-3 pb-0">
      <a
          :href="LINKEDIN_LINK"
          target="_blank"
          rel="noopener noreferrer"
          class="me-4"
          aria-label="Linkedin account"
      >
        <font-awesome-icon :icon="['fab', 'linkedin']" class="text-white" size="2x" />
      </a>
      <a
          :href="GITHUB_LINK"
          target="_blank"
          rel="noopener noreferrer"
          class="me-4"
          aria-label="GitHub account"
      >
        <font-awesome-icon :icon="['fab', 'github']" class="text-white" size="2x" />
      </a>
      <a
          :href="MAIL_LINK"
          target="_blank"
          rel="noopener noreferrer"
          class="me-4"
          aria-label="Send me an e-mail"
      >
        <font-awesome-icon icon="envelope" class="text-white" size="2x" />
      </a>
      <a
          :href="PHONE_LINK"
          target="_blank"
          rel="noopener noreferrer"
          class="me-4"
          aria-label="Call me"
      >
        <font-awesome-icon icon="phone" class="text-white" size="2x" />
      </a>
    </div>
    <div class="d-flex justify-content-end align-items-center px-3">
        <p class="me-4">Wojciech Guze - 08.2023</p>
    </div>
  </footer>
</template>

<script>
import {
  GITHUB_LINK,
  LINKEDIN_LINK,
  PHONE_LINK,
  MAIL_LINK,
  FOOTER_MAX_GAME_MODES,
  FOOTER_ANIMATION_TIMEOUT
} from '@/plugins/constants'
import {
  mapState
} from 'vuex'
import axios from '@/plugins/axios'
import {
  setFooterLinks
} from '@/plugins/helpers'

export default {
  name: 'MainFooter',
  data() {
    return {
      GITHUB_LINK,
      LINKEDIN_LINK,
      PHONE_LINK,
      MAIL_LINK
    }
  },
  computed: {
    ...mapState([
        'mostPopularGameModes',
        'newGameModes'
    ])
  },
  created() {
    setTimeout(() => {
      this.$refs.mainFooter.classList.remove('footer-animation')
    }, FOOTER_ANIMATION_TIMEOUT)

    if (!this.$store.state.newGameModes) {
      this.fetchFooterLinks()
    }
  },
  methods: {
    async fetchFooterLinks() {
      const url = `${process.env.VUE_APP_BACKEND_URL}/api/globals/game-modes-data`,
          params = {
            'global_max_game_modes': FOOTER_MAX_GAME_MODES
          },
          response = await axios.get(url, {params})

      setFooterLinks(response.data.mostPopularGameModes, response.data.newGameModes)
    }
  }
}
</script>
