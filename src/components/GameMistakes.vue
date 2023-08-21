<template>
  <span>
    Ilość błędów: {{ mistakesCount }}
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