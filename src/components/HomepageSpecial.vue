<template>
  <div class="w-75 m-auto">
    <div ref="homepageSpecialExpectedOutput" class="bg-dark text-light p-2 disabled">
    <span
        v-for="(expectedChar, index) in expectedOutput"
        :key="index"
        :class="{'text-success': isCharCorrect(index)}"
    >
        {{ expectedChar }}
      </span>
    </div>
    <transition name="homepage-special-fade-out">
      <textarea
          v-if="!finished"
          ref="homepageSpecialInput"
          class="form-control disabled mt-1 homepage-special-textarea"
          :class="finished ? 'text-success' : ''"
          rows="4"
          :readonly="true"
          :value="automaticValue"
      />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'HomepageSpecial',
  data() {
    return {
      expectedOutput: 'Lorem ipsum dolor sit amet, consectetur adipisci tempor incidunt ut labore et dolore magna aliqua veniam, quis nostrud exercitation ullamcorpor s commodo consequat. Duis autem vel eum irrure esse molestiae consequat...',
      automaticValue: '',
      finished: false,
      currentCharIndex: 0
    }
  },
  mounted() {
    this.typeTextAutomatically()
  },
  methods: {
    isCharCorrect(index) {
      return index === this.currentCharIndex
    },
    typeTextAutomatically() {
      const textToType = this.expectedOutput
      let currentIndex = 0

      const typingInterval = setInterval(() => {
        if (currentIndex < textToType.length) {
          this.automaticValue += textToType[currentIndex]
          this.currentCharIndex = currentIndex
          currentIndex++
        } else {
          clearInterval(typingInterval)
          this.finished = true

          setTimeout(() => {
            this.automaticValue = ''
            this.currentCharIndex = 0
            this.finished = false
            this.typeTextAutomatically()
          }, 2500)
        }
      }, 45)
    }
  }
}
</script>