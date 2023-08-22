<template>
  <div
      class="bg-dark rounded-2 p-2"
      :class="isGameRunning ? 'text-primary' : 'text-danger'"
  >
    <p class="m-0 p-1">{{ $t('game.time') }}: <span class="font-weight-bold">{{ formatTime(gameTimeMs) }}</span></p>
    <p class="m-0 p-1 timer-border-divider">{{ $t('messages.cpm') }}: <span class="font-weight-bold">{{ cpm }}</span></p>
  </div>
</template>

<script>
export default {
  name: 'GameTimer',
  props: [
      'gameTimeMs',
      'isGameRunning',
      'cpm'
  ],
  methods: {
    formatTime(time) {
      const minutes = Math.floor(time / 60000)
      const seconds = Math.floor((time % 60000) / 1000)

      return `${this.padTime(minutes)}:${this.padTime(seconds)}:${this.padTime(time % 1000, 3)}`
    },
    padTime(value, length = 2) {
      return value.toString().padStart(length, '0')
    }
  }
}
</script>