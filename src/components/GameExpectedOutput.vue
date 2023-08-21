<template>
  <div>
    <span
        v-for="(expectedChar, index) in expectedOutput"
        :key="index"
        :class="{
          'text-success': isCharCorrect(index),
          'text-danger': isCharIncorrect(index),
          'current-char text-dark bg-light': isCurrentChar(index)
        }"
    >
        {{ expectedChar }}
      </span>
  </div>
</template>

<script>
export default {
  name: 'GameExpectedOutput',
  props: {
    expectedOutput: {
      type: String
    },
    gameInputText: {
      type: String
    },
    capitalValidation: {
      type: Boolean
    }
  },
  methods: {
    inputChar(index) {
      return this.gameInputText[index]
    },
    expectedChar(index) {
      return this.expectedOutput[index]
    },
    isCharCorrect(index) {
      return this.capitalValidation
          ? this.inputChar(index) === this.expectedChar(index)
          : this.inputChar(index).toLowerCase() === this.expectedChar(index).toLowerCase()
    },
    isCharIncorrect(index) {
      return !this.isCharCorrect(index) && this.gameInputText[index]
    },
    isCurrentChar(index) {
      return this.gameInputText.length === index
    }
  }
}
</script>