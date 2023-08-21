<template>
  <div>
    <h3 class="h1">
      {{ displayedMessage }}
    </h3>
    <h4 class="h2 text-muted">
      {{ displayedPasswordMessage }}
    </h4>
  </div>
</template>

<script>
export default {
  name: 'LoginSpecial',
  data() {
    return {
      message: 'Efektywność, Wydajność, Sukces.',
      passwordMessage: 'Pamiętaj o silnym haśle!',
      displayedMessage: '',
      displayedPasswordMessage: '',
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
        await this.typePasswordMessage()
      }, 1000) // Dodajemy odstęp 1000 ms (1 sekunda) przed wyświetleniem drugiej wiadomości
    },
    async typePasswordMessage() {
      return await this.messageTyping(this.passwordMessage, 'displayedPasswordMessage')
    }
  },
  async mounted() {
    this.typeMessage()
  }
}
</script>
