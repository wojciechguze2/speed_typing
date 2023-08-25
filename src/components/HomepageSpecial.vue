<template>
  <div class="m-auto" :class="{'w-75': !isMobile}">
    <transition appear name="homepage-special-slide">
      <div ref="homepageSpecialExpectedOutput" class="bg-dark text-light p-2 disabled">
        <span
            v-for="(expectedChar, index) in expectedOutput"
            :key="index"
            :class="{'text-primary': isCharCorrect(index)}"
        >
          {{ expectedChar }}
        </span>
      </div>
    </transition>
    <transition name="homepage-special-fade-out">
      <textarea
          v-if="!finished"
          id="homepage-special-textarea"
          ref="homepageSpecialInput"
          class="form-control disabled mt-1 homepage-special-textarea"
          :class="finished ? 'text-primary' : ''"
          rows="4"
          :readonly="true"
          :value="automaticValue"
      />
    </transition>
    <div class="mt-4">
      <transition appear name="homepage-special-slide">
        <Keyboard :current-char="currentChar" />
      </transition>
    </div>
  </div>
</template>

<script>
import Keyboard from '@/components/Keyboard'
import {
  HOMEPAGE_SPECIAL_TYPING_INTERVAL,
  HOMEPAGE_SPECIAL_TYPING_COUNTDOWN,
  HOMEPAGE_SPECIAL_ANIMATION_REFRESH_TIMEOUT
} from '@/plugins/constants'

export default {
  name: 'HomepageSpecial',
  components: {
    Keyboard
  },
  data() {
    return {
      expectedOutput: this.$t('homepage.special.expected_output'),
      automaticValue: '',
      finished: false,
      currentCharIndex: 0,
      currentChar: '',
    }
  },
  mounted() {
    if (this.isMobile) {
      this.expectedOutput = this.expectedOutput.slice(0, 97)
      this.expectedOutput += '...'
    }

    setTimeout(() => {
      this.typeTextAutomatically()
    }, HOMEPAGE_SPECIAL_TYPING_COUNTDOWN)
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
          const char = textToType[currentIndex]

          this.automaticValue += char
          this.currentCharIndex = currentIndex
          this.currentChar = char

          currentIndex++
        } else {
          clearInterval(typingInterval)
          this.finished = true
          this.currentCharIndex = -1
          this.currentChar = ''

          setTimeout(() => {
            this.automaticValue = ''
            this.finished = false
            this.typeTextAutomatically()
          }, HOMEPAGE_SPECIAL_ANIMATION_REFRESH_TIMEOUT)
        }
      }, HOMEPAGE_SPECIAL_TYPING_INTERVAL)
    }
  }
}
</script>