<template>
  <div>
    <div class="container py-3">
      <h3>
        O stronie
      </h3>
      <div class="lead mt-4">
        Wykorzystane technologie:
        <ul class="mt-2 mb-4">
          <li>
            Frontend:
            <ul>
              <li>
                Vue.js
                <font-awesome-icon :icon="['fab', 'vuejs']" />
              </li>
              <li>
                Bootstrap
                <font-awesome-icon :icon="['fab', 'bootstrap']" />
              </li>
              <li>
                FontAwesome
                <font-awesome-icon :icon="['fab', 'font-awesome']" />
              </li>
            </ul>
          </li>
          <li>
            Backend:
            <ul>
              <li>
                Python3 - Django
                <font-awesome-icon :icon="['fab', 'python']" />
              </li>
              <li>
                PostgreSQL
                <font-awesome-icon icon="database" />
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div>
        <p>Strona "{{ TITLE }}" to mój pierwszy większy projekt osobisty, na który w końcu znalazłem czas.</p>
        <p>Cały proces tworzenia zajął mi około 3 dni.</p>
        <p>Głównym celem tej strony jest pomoc użytkownikom w ćwiczeniu i doskonaleniu umiejętności szybkiego pisania na klawiaturze.</p>
        <p>
          Więcej moich projektów będziesz mógł/mogła ujrzeć na moim
          <a
              :href="GITHUB_LINK"
              target="_blank"
              rel="noopener noreferrer"
              class="me-4 link-dark text-decoration-none"
          >
            <font-awesome-icon :icon="['fab', 'github']" />
            Githubie już wkrótce :)
          </a>
        </p>
      </div>
      <div class="text-center pt-4"> <!-- todo: -->
        Tutaj klawiaturka THREE.js jak mi się będzie nudzić
      </div>
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