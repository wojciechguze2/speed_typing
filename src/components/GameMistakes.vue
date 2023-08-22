<template>
  <span>
    {{ $t('game.mistakes_count') }}:
    <span class="font-weight-bold" :class="mistakesCount > 0 ? 'text-danger' : 'text-success'">
      {{ mistakesCount }}
    </span>
  </span>
</template>

<script>
export default {
  name: 'GameMistakes',
  props: {
    mistakesCount: {
      type: Number
    }
  }
}
</script>