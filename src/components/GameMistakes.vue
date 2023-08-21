<template>
  <span>
    Ilość błędów:
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