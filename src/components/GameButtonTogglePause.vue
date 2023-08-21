<template>
  <GameButtonPause
      v-if="isGameRunning"
      @pause-game="pauseGame"
  />
  <GameButtonContinue
      v-else
      @continue-game="continueGame"
  />
</template>
<script>
import GameButtonPause from '@/components/GameButtonPause'
import GameButtonContinue from '@/components/GameButtonContinue'

export default {
  name: 'GameButtonTogglePause',
  emits: [
    'pause-game',
    'continue-game',
  ],
  props: {
    isGameRunning: {
      type: Boolean
    }
  },
  components: {
    GameButtonPause,
    GameButtonContinue,
  },
  methods: {
    pauseGame() {
      this.$emit('pause-game')
    },
    continueGame() {
      this.$emit('continue-game')
    },
  }
}
</script>