<template>
  <div
      class="dropdown languages-dropdown"
      :class="[{'ms-3': isoLabels}, additionalClass]"
  >
    <button
        class="btn btn-sm dropdown-toggle"
        :class="{
          'text-uppercase btn-outline-light': isoLabels,
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
        <a
            :href="`/${language.iso}`"
            class="dropdown-item"
            :class="{'text-uppercase': isoLabels}"
            :aria-label="language.name"
        >
          {{ isoLabels ? language.iso : language.name }}
        </a>
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
    },
    additionalClass: {
      type: String,
      required: false
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
