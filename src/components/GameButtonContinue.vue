<template>
  <button class="btn btn-success" @click="continueGame">
    <font-awesome-icon icon="play" />
  </button>
</template>

<script>
export default {
  name: 'GameButtonContinue',
  emits: [
    'continue-game',
  ],
  methods: {
    continueGame(e) {
      e.preventDefault()
      this.$emit('continue-game')
    }
  }
}
</script>