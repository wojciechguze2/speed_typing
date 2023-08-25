<template>
  <div class="keyboard">
    <template v-for="char in keyboardChars" :key="char">
      <br v-if="isNewline(char)" />
      <span
          v-else
          class="text-white keyboard-button rounded-0 m-1 pointer-events-none btn"
          :class="[{'font-size-small p-1': isMobile}, isCurrentChar(char) ? 'btn-primary' : 'btn-dark']"
      >
        {{ char }}
      </span>
    </template>
  </div>
</template>

<script>
const NEWLINE = '<br>'
const SPACE_CHAR = '_______________________'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Keyboard',
  props: {
    currentChar: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      keyboardChars: [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', NEWLINE,
          'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', NEWLINE,
          'Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", NEWLINE,
          'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', NEWLINE,
          'Ctrl', 'Alt', SPACE_CHAR, 'Alt', 'Ctrl'
      ],
    }
  },
  methods: {
    isNewline(char) {
      return char === NEWLINE
    },
    isCurrentChar(char) {
      if (this.currentChar === ' ' && char === SPACE_CHAR) {
        return true
      }

      return char.toLowerCase() === this.currentChar.toLowerCase()
    }
  },
}
</script>
