<template>
  <div class="about">
    <div class="container py-3">
      <h3>
        {{ $t('messages.about_site') }}
      </h3>
      <div class="lead mt-4 fs-4">
        {{ $t('about.used_technologies') }}:
        <ul class="mt-2 mb-4 fs-5">
          <li>
            Frontend:
            <ul>
              <li>
                Vue.js
                <a href="https://vuejs.org/" aria-label="Vue.js Webiste">
                  <transition appear name="transition-about-slide">
                    <font-awesome-icon :icon="['fab', 'vuejs']" />
                  </transition>
                </a>
              </li>
              <li>
                Bootstrap
                <a href="https://getbootstrap.com/" aria-label="Bootstrap Webiste">
                  <transition appear name="transition-about-slide">
                    <font-awesome-icon :icon="['fab', 'bootstrap']" />
                  </transition>
                </a>
              </li>
              <li>
                FontAwesome
                <a href="https://fontawesome.com/" aria-label="FontAwesome Webiste">
                  <transition appear name="transition-about-slide">
                    <font-awesome-icon :icon="['fab', 'font-awesome']" />
                  </transition>
                </a>
              </li>
            </ul>
          </li>
          <li>
            Backend:
            <ul>
              <li>
                Python3 - Django
                <a href="https://www.djangoproject.com/" aria-label="Python 3 Django Webiste">
                  <transition appear name="transition-about-slide">
                    <font-awesome-icon :icon="['fab', 'python']" />
                  </transition>
                </a>
              </li>
              <li>
                PostgreSQL
                <a href="https://www.postgresql.org/" aria-label="PostgeSQL Webiste">
                  <transition appear name="transition-about-slide">
                    <font-awesome-icon icon="database" />
                  </transition>
                </a>
              </li>
              <li>
                Texts generator -
                <a href="https://openai.com/" aria-label="OpenAI Webiste">
                  <transition appear name="transition-about-slide">
                    OpenAI
                  </transition>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="fs-5">
        <p>{{ $t('messages.site') }} "{{ TITLE }}" {{ $t('about.my_first_project')}}</p>
        <!--<p>{{ $t('about.execution_time') }}</p> 4/5 days but i still develop it-->
        <p>{{ $t('about.site_goal') }}</p>
        <p>
          {{ $t('about.more_projects.before_link') }}
          <a
              :href="GITHUB_LINK"
              target="_blank"
              rel="noopener noreferrer"
              class="me-4 link-dark text-decoration-none"
          >
            <font-awesome-icon :icon="['fab', 'github']" />
            {{ $t('about.more_projects.after_link') }}
          </a>
        </p>
      </div>
      <!--<div class="text-center pt-4">  todo:
        Tutaj klawiaturka THREE.js jak mi się będzie nudzić
      </div> -->
    </div>
  </div>
</template>

<script>
import { TITLE, GITHUB_LINK } from '@/plugins/constants'
import { scrollToTop } from '@/plugins/helpers'

export default {
  name: 'AboutView',
  data() {
    return {
      TITLE,
      GITHUB_LINK
    }
  },
  created() {
    scrollToTop()
  },
}
</script>

<style lang="scss">
  @import '@/styles/about.scss';
</style>