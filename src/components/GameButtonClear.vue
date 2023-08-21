<template>
  <button class="btn btn-danger" :class="mr ? 'mr-10px' : ''" @click="clearGame">
    Wyczyść <font-awesome-icon icon="eraser" />
  </button>
</template>

<script>
export default {
  name: 'GameButtonClear',
  emits: [
    'clear-game',
  ],
  props: [
      'mr'
  ],
  methods: {
    clearGame(e) {
      e.preventDefault()
      this.$emit('clear-game')
    }
  }
}
</script>