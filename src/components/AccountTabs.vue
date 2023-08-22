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
            name: this.$t('account.tabs.data')
          },
          {
            url: '/account/history',
            code: 'account-history',
            name: this.$t('account.tabs.games_history')
          },
          {
            url: '/account/statistics',
            code: 'statistics',
            name: this.$t('account.tabs.statistics')
          },
          {
            url: '/logout',
            code: 'logout',
            name: this.$t('messages.logout'),
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