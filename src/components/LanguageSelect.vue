<template>
  <div class="dropdown ms-3">
    <button
        class="btn btn-outline-light dropdown-toggle"
        type="button"
        id="language-dropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
    >
      {{ $t('messages.change_language') }}
    </button>
    <ul class="dropdown-menu" aria-labelledby="game-mode-dropdown">
      <li v-for="(language, index) in languages" :key="index">
        <router-link :to="`/${language.iso}`" class="dropdown-item">
          {{ language.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LanguageSelect',
  data() {
    return {
      selectedLanguage: '',
      languages: [
        { iso: 'pl', name: 'Polski' },
        { iso: 'en', name: 'English' },
        { iso: 'de', name: 'Deutsch' },
      ]
    }
  },
  mounted() {
    this.languages = this.languages.filter(language => language.iso !== window.LOCALE_ISO)
  }
}
</script>
