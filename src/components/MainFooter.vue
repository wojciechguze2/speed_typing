<template>
  <footer class="footer bg-dark text-white w-100 mt-auto mb-0">
    <div class="flex-grow-1">
      <div class="container py-5">
        <div class="row">
          <div class="col-md-4">
            <h5>
              {{ $t('messages.information') }}
            </h5>
            <ul class="list-unstyled">
              <li>
                <router-link to="/regulations" class="text-white">
                  {{ $t('messages.regulations') }}
                </router-link>
              </li>
              <li>
                <router-link to="/privacy-policy" class="text-white">
                  {{ $t('messages.privacy_policy') }}
                </router-link>
              </li>
              <li>
                <router-link to="/sitemap" class="text-white">
                  {{ $t('messages.sitemap') }}
                </router-link>
              </li>
            </ul>
          </div>
          <div class="col-md-4">
            <h5>{{ $t('messages.most_popular_game_modes') }}</h5>
            <ul class="list-unstyled">
              <li>
                <router-link to="/popular-mode1" class="text-white">
                  Tryb 1
                </router-link>
              </li>
              <li>
                <router-link to="/popular-mode2" class="text-white">
                  Tryb 2
                </router-link>
              </li>
              <li>
                <router-link to="/popular-mode3" class="text-white">
                  Tryb 3
                </router-link>
              </li>
            </ul>
          </div>
          <div class="col-md-4">
            <h5>{{ $t('messages.newest_game_modes') }}</h5>
            <ul class="list-unstyled">
              <li>
                <router-link to="/popular-mode1" class="text-white">
                  Tryb 1
                </router-link>
              </li>
              <li>
                <router-link to="/popular-mode2" class="text-white">
                  Tryb 2
                </router-link>
              </li>
              <li>
                <router-link to="/popular-mode3" class="text-white">
                  Tryb 3
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end align-items-center p-4">
      <a
          :href="LINKEDIN_LINK"
          target="_blank"
          rel="noopener noreferrer"
          class="me-4"
      >
        <font-awesome-icon :icon="['fab', 'linkedin']" class="text-white" size="2x" />
      </a>
      <a
          :href="GITHUB_LINK"
          target="_blank"
          rel="noopener noreferrer"
          class="me-4"
      >
        <font-awesome-icon :icon="['fab', 'github']" class="text-white" size="2x" />
      </a>
      <a
          :href="MAIL_LINK"
          target="_blank"
          rel="noopener noreferrer"
          class="me-4"
      >
        <font-awesome-icon icon="envelope" class="text-white" size="2x" />
      </a>
      <a
          :href="PHONE_LINK"
          target="_blank"
          rel="noopener noreferrer"
          class="me-4"
      >
        <font-awesome-icon icon="phone" class="text-white" size="2x" />
      </a>
    </div>
  </footer>
</template>

<script>
import {GITHUB_LINK, LINKEDIN_LINK, PHONE_LINK, MAIL_LINK} from '@/plugins/constants'

export default {
  name: 'MainFooter',
  data() {
    return {
      GITHUB_LINK,
      LINKEDIN_LINK,
      PHONE_LINK,
      MAIL_LINK
    }
  }
}
</script>
