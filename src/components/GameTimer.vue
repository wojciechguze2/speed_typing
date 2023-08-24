<template>
  <div
      class="bg-dark rounded-2 p-2"
      :class="isGameRunning ? 'text-primary' : 'text-danger'"
  >
    <p class="m-0 p-1">{{ $t('game.time') }}:
      <span class="font-weight-bold">
        {{ formatTime(gameTimeMs) }}
      </span>
    </p>
    <p
        v-if="remainTimeMs"
        class="m-0 p-1"
    >
      {{ $t('game.remain_time') }}:
      <span class="font-weight-bold">
        {{ formatTime(remainTimeMs) }}
      </span>
    </p>
    <p class="m-0 p-1 timer-border-divider">
      {{ $t('messages.cpm') }}:
      <span class="font-weight-bold">
        {{ cpm }}
      </span>
    </p>
    <p
        v-if="timeLimitSeconds"
        class="m-0 p-1 timer-border-divider"
    >
      {{ $t('game.time_limit') }}:
      <span class="font-weight-bold">
        {{ timeLimitSeconds }} {{ $t('seconds') }}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'GameTimer',
  props: [
      'gameTimeMs',
      'isGameRunning',
      'cpm',
      'timeLimitSeconds',
      'remainTimeMs'
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