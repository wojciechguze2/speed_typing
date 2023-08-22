<template>
  <div class="main-bg">
    <MainGame
        :game-mode-code="GAME_MODE_FAST"
    />
  </div>
</template>
<script>
import MainGame from '@/components/MainGame'
import { GAME_MODE_FAST } from '@/plugins/constants'

export default {
  name: 'FastGameView',
  components: {
    MainGame
  },
  data() {
    return {
      GAME_MODE_FAST
    }
  }
}
</script>

<style lang="scss">
  @import '@/styles/game.scss';
</style>
