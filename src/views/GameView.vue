<template>
  <div class="main-bg">
    <MainGame
        :game-mode-code="gameModeCode"
        @update-game-mode-code="updateGameModeCode"
    />
  </div>
</template>
<script>
import MainGame from '@/components/MainGame'
import { scrollToTop } from '@/plugins/helpers'

export default {
  name: 'GameView',
  components: {
    MainGame
  },
  created() {
    scrollToTop()
  },
  data() {
    return {
      gameModeCode: this.$route.params.gameMode.toString()
    }
  },
  methods: {
    updateGameModeCode(gameModeCode) {
      this.gameModeCode = gameModeCode
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/game.scss';
</style>
