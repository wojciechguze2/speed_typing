<template>
  <footer class="footer bg-dark text-white d-flex flex-column">
    <div class="flex-grow-1">
      <div class="container py-5">
        <div class="row">
          <div class="col-md-4">
            <h5>
              Informacje
            </h5>
            <ul class="list-unstyled">
              <li>
                <router-link to="/regulations" class="text-white">
                  Regulamin
                </router-link>
              </li>
              <li>
                <router-link to="/privacy-policy" class="text-white">
                  Polityka prywatności
                </router-link>
              </li>
              <li>
                <router-link to="/sitemap" class="text-white">
                  Mapa strony
                </router-link>
              </li>
            </ul>
          </div>
          <div class="col-md-4">
            <h5>Najpopularniejsze tryby</h5>
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
            <h5>Najnowsze tryby</h5>
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
