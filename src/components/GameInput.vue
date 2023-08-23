<template>
  <div class="game-input">
    <textarea
        ref="gameInputControl"
        class="form-control shadow-sm"
        :class="{
          'disabled bg-dark text-white': !isGameRunning,
          'd-none': isByOneMode
        }"
        rows="8"
        spellcheck="false"
        autocomplete="off"
        autocapitalize="off"
        :readonly="!isGameRunning"
        :value="gameInputText"
        @input="updateGameInputText"
        @click="continueGame"
    />
    <input
        v-if="isByOneMode"
        ref="byOneControl"
        v-model="byOneInput"
        class="w-25 form-control m-auto shadow-sm"
        :class="{'disabled bg-dark text-white': !isGameRunning}"
        @input="updateByOneInputText"
        @click="continueGame"
    />
    <span class="d-flex justify-content-end">
      {{ $t('game.input_length') }}:&nbsp;
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
      'continue-game',
      'update-game-input-text'
  ],
  props: {
    isGameRunning: {
      type: Boolean
    },
    gameInputText: {
      type: String
    },
    expectedOutputType: {
      type: String
    },
    isByOneMode: {
      type: Boolean
    },
    expectedValue: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      byOneInput: ''
    }
  },
  mounted() {
    this.$refs.gameInputControl.onpaste = e => e.preventDefault()
    this.$refs.gameInputControl.oncopy = e => e.preventDefault()
    this.$refs.gameInputControl.oncontextmenu = e => e.preventDefault()
  },
  methods: {
    continueGame() {
      return null
      /* todo: optionally allow continue game from here (check pointer events css)
      if (!this.isGameRunning) {
        this.$emit('continue-game')
      }
       */
    },
    updateGameInputText(event) {
      this.$emit('update-game-input-text', event.target.value)
    },
    updateByOneInputText(event) {
      if (event.target.value.toLowerCase() === this.expectedValue.toLowerCase()) {
        this.$emit('update-game-input-text', this.gameInputText + event.target.value)
        this.byOneInput = ''
      }
    }
  }
}
</script>
