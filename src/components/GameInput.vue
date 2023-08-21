<template>
  <div class="game-input">
    <textarea
        ref="gameInputControl"
        class="form-control"
        :class="{'disabled bg-dark text-white': !isGameRunning}"
        rows="8"
        spellcheck="false"
        autocomplete="off"
        autocapitalize="off"
        :readonly="!isGameRunning"
        :value="gameInputText"
        @input="updateGameInputText"
    />
    <span class="d-flex justify-content-end">
      Ilość wprowadzonych znaków:&nbsp;
      <span class="text-primary font-weight-bold">
        {{ gameInputText.length }}
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'GameInput',
  emits: [
      'update-game-input-text'
  ],
  props: {
    isGameRunning: {
      type: Boolean
    },
    gameInputText: {
      type: String
    }
  },
  mounted() {
    this.$refs.gameInputControl.onpaste = e => e.preventDefault()
    this.$refs.gameInputControl.oncopy = e => e.preventDefault()
    this.$refs.gameInputControl.oncontextmenu = e => e.preventDefault()
  },
  methods: {
    updateGameInputText(event) {
      this.$emit('update-game-input-text', event.target.value, event.inputType, event.target.selectionStart)
    }
  }
}
</script>
