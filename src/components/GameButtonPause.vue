<template>
  <button class="btn btn-warning" @click="pauseGame">
    <font-awesome-icon icon="pause" />
  </button>
</template>

<script>
export default {
  name: 'GameButtonPause',
  emits: [
    'pause-game',
  ],
  methods: {
    pauseGame(e) {
      e.preventDefault()
      this.$emit('pause-game')
    }
  }
}
</script>