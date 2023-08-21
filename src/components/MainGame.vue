<template>
  <div class="mt-5 mb-5">
    <div class="container main-game-container">
      <div class="d-flex col-lg-12 row text-center">
        <div class="col-lg-3">
          <GameTimer
            :game-time-ms="gameTimeMs"
            :is-game-running="isGameRunning"
            :cpm="cpm"
          />
          <GameMistakes
            :mistakes-count="mistakesCount"
          />
        </div>
        <div class="col-lg-6">
          <h4>
            {{ gameModeType }}
          </h4>
        </div>
        <div class="col-lg-3">
          <div>
            <GameButtonClear
                @clear-game="clearGame"
                :mr="true"
            />
            <GameButtonRestart
                @restart-game="restartGame"
            />
          </div>
        </div>
      </div>
      <div class="my-2">
        <GameExpectedOutput
            :game-input-text="gameInputText"
            :expected-output="expectedOutput"
            :capital-validation="true"
        />
      </div>
      <div class="my-1">
        <GameButtonTogglePause
            :is-game-running="isGameRunning"
            @pause-game="pauseGame"
            @continue-game="continueGame"
        />
        <span v-if="!isGameRunning" @click="continueGame">
          Kliknij aby rozpocząć
        </span>
      </div>
      <div class="my-3">
        <GameInput
            :game-input-text="gameInputText"
            :is-game-running="isGameRunning"
            @update-game-input-text="updateGameInputText"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GameExpectedOutput from '@/components/GameExpectedOutput'
import GameInput from '@/components/GameInput'
import GameTimer from '@/components/GameTimer'
import GameButtonTogglePause from '@/components/GameButtonTogglePause'
import GameButtonClear from '@/components/GameButtonClear'
import GameMistakes from '@/components/GameMistakes'
import GameButtonRestart from '@/components/GameButtonRestart'
import { GAME_MODE_FAST } from '@/plugins/constants'

export default {
  name: 'MainGame',
  components: {
    GameButtonClear,
    GameButtonRestart,
    GameButtonTogglePause,
    GameExpectedOutput,
    GameInput,
    GameTimer,
    GameMistakes
  },
  props: {
    gameModeType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      mistakesCount: 0,
      isGameRunning: false,
      gameTimerInterval: null,
      gameTimeMs: 0,
      gameInputText: '',
      gameInputTimeEndings: [],
      expectedOutput: 'What is Lorem Ipsum?\n' +
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n' +
          '\n' +
          'Why do we use it?\n' +
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\n' +
          '\n' +
          '\n' +
          'Where does it come from?\n' +
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n' +
          '\n' +
          'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    }
  },
  computed: {
    cpm() {
      const cpm = (this.gameInputText.length - this.mistakesCount) / (this.gameTimeMs / 60000)

      return !isNaN(cpm) ? cpm.toFixed(2) : 0
    },
    countdownSeconds() {
      return this.gameModeType === GAME_MODE_FAST ? 3 : 5
    },
  },
  mounted() {
    if (this.isGameRunning) {
      this.continueGame()
    } else {
      this.pauseGame()
    }
  },
  methods: {
    updateGameInputText(newText) {
      this.gameInputText = newText
      this.calculateMistakesCount()
      this.checkForGameFinish()
      this.controlGameInputTimes()
    },
    controlGameInputTimes() {
      this.gameInputTimeEndings.push(this.gameTimeMs % 100)

      if (this.gameInputTimeEndings.length > 150) {
        this.gameInputTimeEndings.splice(0)
      } else {
        this.gameInputTimeEndings.reduce((obj, item) => {
          const occurrenceCount = (obj[item] || 0)

          if (occurrenceCount > 100) {
            throw new Error('Possible automation detected!')
          }

          obj[item] = occurrenceCount + 1

          return obj
        }, {})
      }
    },
    checkForGameFinish() {
      if (this.gameInputText.length === this.expectedOutput.length) {
        this.pauseGame()
      }
    },
    inputChar(index) {
      return this.gameInputText[index]
    },
    expectedChar(index) {
      return this.expectedOutput[index]
    },
    calculateMistakesCount() {
      let mistakes = 0

      for (let i = 0; i < this.gameInputText.length; i++) {
        const inputChar = this.inputChar(i),
            expectedChar = this.expectedChar(i)

        if (inputChar !== expectedChar && inputChar.trim() !== expectedChar.trim()) {
          mistakes++
        }
      }

      this.mistakesCount = mistakes
    },
    changeText() {
      console.log('changeText')
    },
    startGameTimer() {
      this.gameTimerInterval = setInterval(() => {
        this.gameTimeMs += 10
      }, 10)
    },
    stopGameTimer() {
      clearInterval(this.gameTimerInterval)
    },
    clearTimer() {
      clearInterval(this.gameTimerInterval)
      this.gameTimeMs = 0
    },
    clearGameInput() {
      this.gameInputText = ''
    },
    pauseGame() {
      this.stopGameTimer()
      this.isGameRunning = false
    },
    continueGame() {
      this.startGameTimer()
      this.isGameRunning = true
    },
    clearGame() {
      this.clearTimer()
      this.clearGameInput()
      this.pauseGame()
    },
    restartGame() {
      this.clearGame()
      this.changeText()
    },
  },
}
</script>