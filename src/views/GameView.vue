<template>
  <div class="main-bg">
    <MainGame
        :game-mode-code="gameModeCode"
        @update-game-mode-code="updateGameModeCode"
        @flash-alert="flashAlert"
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
  emits: [
    'flash-alert'
  ],
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
    },
    flashAlert(alertData) {
      this.$emit('flash-alert', alertData)
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/game.scss';
</style>
