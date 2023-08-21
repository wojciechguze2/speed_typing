<template>
  <MainHeader />
  <router-view />
  <MainFooter />
</template>

<script>
import MainHeader from '@/components/MainHeader'
import MainFooter from '@/components/MainFooter'

export default {
  name: 'App',
  components: {
    MainHeader,
    MainFooter
  }
}
</script>

<style lang="scss">
  @import '@/styles/main.scss';
</style>
