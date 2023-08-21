<template>
  <button class="btn btn-primary" @click="restartGame">
    Restartuj <font-awesome-icon icon="refresh" />
  </button>
</template>

<script>
export default {
  name: 'GameButtonClear',
  emits: [
    'restart-game',
  ],
  methods: {
    restartGame(e) {
      e.preventDefault()
      this.$emit('restart-game')
    }
  }
}
</script>