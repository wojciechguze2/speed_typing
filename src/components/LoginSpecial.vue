<template>
  <div>
    <h3 class="h1">
      {{ displayedMessage }}
    </h3>
    <h4 class="h2 text-muted">
      {{ displayedAdditionalMessage }}
    </h4>
  </div>
</template>

<script>
export default {
  name: 'LoginSpecial',
  data() {
    return {
      message: this.$t('login.special.message'),
      additionalMessage: this.$t('login.special.additional_message'),
      displayedMessage: '',
      displayedAdditionalMessage: '',
    }
  },
  methods: {
    async messageTyping(message, displayedMessageVariableName) {
      let index = 0

      const interval = setInterval(() => {
        if (index < message.length) {
          this[displayedMessageVariableName] += message[index]
          index++
        } else {
          clearInterval(interval)

          return new Promise((resolve) => {
            resolve(true)
          })
        }
      }, 50)
    },
    async typeMessage() {
      await this.messageTyping(this.message, 'displayedMessage')
      setTimeout(async () => {
        await this.typeAdditionalMessage()
      }, 1000) // Dodajemy odstęp 1000 ms (1 sekunda) przed wyświetleniem drugiej wiadomości
    },
    async typeAdditionalMessage() {
      return await this.messageTyping(this.additionalMessage, 'displayedAdditionalMessage')
    }
  },
  mounted() {
    this.typeMessage()
  }
}
</script>
