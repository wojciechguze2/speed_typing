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
                <a href="https://vuejs.org/">
                  <transition appear name="about-slide">
                    <font-awesome-icon :icon="['fab', 'vuejs']" />
                  </transition>
                </a>
              </li>
              <li>
                Bootstrap
                <a href="https://getbootstrap.com/">
                  <transition appear name="about-slide">
                    <font-awesome-icon :icon="['fab', 'bootstrap']" />
                  </transition>
                </a>
              </li>
              <li>
                FontAwesome
                <a href="https://fontawesome.com/">
                  <transition appear name="about-slide">
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
                <a href="https://www.djangoproject.com/">
                  <transition appear name="about-slide">
                    <font-awesome-icon :icon="['fab', 'python']" />
                  </transition>
                </a>
              </li>
              <li>
                PostgreSQL
                <a href="https://www.postgresql.org/">
                  <transition appear name="about-slide">
                    <font-awesome-icon icon="database" />
                  </transition>
                </a>
              </li>
              <li>
                Texts generator -
                <a href="https://openai.com/">
                  <transition appear name="about-slide">
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
        <!--<p>{{ $t('about.execution_time') }}</p> 2/3 days but i still make changes in it-->
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

export default {
  name: 'AboutView',
  data() {
    return {
      TITLE,
      GITHUB_LINK
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/about.scss';
</style>