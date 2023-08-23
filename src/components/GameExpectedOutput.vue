<template>
  <div class="game-expected-output shadow-sm d-flex">
    <div
        class="my-auto user-select-none pointer-events-none"
        :class="{
          'text-lowercase': !capitalValidation,
          'm-auto': isByOneMode
        }"
    >
      <span
          v-for="(expectedChar, index) in expectedOutput"
          :key="index"
          :class="{
            'text-success': isCharCorrect(index),
            'text-danger': isCharIncorrect(index),
            'current-char text-dark bg-light': isCurrentChar(index),
            'fs-3': isByOneMode
          }"
      >
          {{ expectedChar }}
        </span>
    </div>
  </div>
</template>

<script>
import {
  EXPECTED_OUTPUT_TYPE_TEXT
} from '@/plugins/constants'

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
    },
    expectedOutputType: {
      type: String,
      default: EXPECTED_OUTPUT_TYPE_TEXT
    },
    isByOneMode: {
      type: Boolean,
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
      if (this.isByOneMode) {
        return false
      }

      const inputChar = this.inputChar(index),
          expectedChar = this.expectedChar(index)

      return (
          this.capitalValidation || !inputChar || !expectedChar
          ? inputChar === expectedChar
          : inputChar.toLowerCase() === expectedChar.toLowerCase()
      )
    },
    isCharIncorrect(index) {
      if (this.isByOneMode) {
        return false
      }

      return !this.isCharCorrect(index) && this.gameInputText[index]
    },
    isCurrentChar(index) {
      if (this.isByOneMode) {
        return false
      }

      return this.gameInputText.length === index
    }
  }
}
</script>