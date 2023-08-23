<template>
  <div class="dropdown ms-3 languages-dropdown">
    <button
        class="btn btn-sm btn-outline-light dropdown-toggle"
        :class="{
          'text-uppercase': isoLabels,
          'text-primary': !isoLabels
        }"
        type="button"
        id="language-dropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
    >
      <!--{{ $t('messages.change_language') }}-->
      {{ isoLabels ? currentLocaleIso : currentLocale.name }}
    </button>
    <ul class="dropdown-menu" aria-labelledby="game-mode-dropdown">
      <li v-for="(language, index) in languageChoices" :key="index">
        <router-link
            :to="`/${language.iso}`"
            class="dropdown-item"
            :class="{'text-uppercase': isoLabels}"
            :aria-label="language.name"
        >
          {{ isoLabels ? language.iso : language.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getLocale } from '@/languages'

export default {
  name: 'LanguagesDropdown',
  props: {
    labelType: {
      type: String,
      default: 'iso'
    }
  },
  data() {
    return {
      currentLocaleIso: null,
      currentLocale: {},
      languageChoices: [],
      languages: [
        { iso: 'pl', name: 'Polski' },
        { iso: 'en', name: 'English' },
        { iso: 'de', name: 'Deutsch' },
      ]
    }
  },
  computed: {
    isoLabels() {
      return this.labelType === 'iso'
    }
  },
  methods: {
    getLocalesData() {
      this.currentLocaleIso = getLocale()
      this.currentLocale = this.languages.filter(language => language.iso === this.currentLocaleIso)[0]
      this.languageChoices = this.languages.filter(language => language.iso !== this.currentLocaleIso)
    }
  },
  watch: {
    $route() {
      this.getLocalesData()
    },
  },
  created() {
    this.getLocalesData()
  }
}
</script>
