<template>
  <div :class="centerHorizontally ? 'h-100 m-auto' : ''">
    <div
        class="spinner-border text-primary loader m-auto d-flex"
        :class="additionalClass"
        role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Loader',
  props: [
      'additionalClass',
      'centerHorizontally'
  ]
}
</script>