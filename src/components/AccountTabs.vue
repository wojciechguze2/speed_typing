<template>
  <div>
    <nav class="nav nav-tabs">
      <router-link
        v-for="tab in tabs"
        v-bind:key="tab.code"
        :to="tab.url"
        class="nav-link"
        :class="[{'active': isActiveTab(tab.url)}, tab.additionalClass ?? '']"
      >
        {{ tab.name }}
      </router-link>
    </nav>
  </div>
</template>


<script>
export default {
  name: 'AccountTabs',
  data() {
    return {
      tabs: [
          {
            url: '/account',
            code: 'user-data',
            name: 'Dane'
          },
          {
            url: '/account/history',
            code: 'account-history',
            name: 'Historia gier'
          },
          {
            url: '/account/statistics',
            code: 'statistics',
            name: 'Statystyki'
          },
          {
            url: '/logout',
            code: 'logout',
            name: 'Wyloguj się',
            additionalClass: 'bg-danger text-white'
          },
      ]
    }
  },
  methods: {
    isActiveTab(url) {
      return url === this.$route.path
    }
  }
}
</script>