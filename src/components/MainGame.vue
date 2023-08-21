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
      <div class="my-3">
        <div v-if="loading">
          <Loader additional-class="lg" />
        </div>
        <GameExpectedOutput
            v-else
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
            ref="gameInputContainer"
            :game-input-text="gameInputText"
            :is-game-running="isGameRunning"
            @update-game-input-text="updateGameInputText"
        />
        <div class="d-flex justify-content-end">
          <GameMistakes
              :mistakes-count="mistakesCount"
          />
        </div>
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
import Loader from '@/components/Loader'
import axios from "axios";

export default {
  name: 'MainGame',
  components: {
    GameButtonClear,
    GameButtonRestart,
    GameButtonTogglePause,
    GameExpectedOutput,
    GameInput,
    GameTimer,
    GameMistakes,
    Loader
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
      expectedOutput: '',
      loading: true
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
  created() {
    this.fetchData()
  },
  mounted() {
    if (this.isGameRunning) {
      this.continueGame()
    } else {
      this.pauseGame()
    }
  },
  methods: {
    fetchData() {
      this.loading = true
      const url = `${process.env.VUE_APP_BACKEND_URL}/api/expected-texts/random`

      axios.get(url)
          .then(response => {
            this.expectedOutput = response.data.text
            this.loading = false
          })
          .catch(error => {
            console.error(error)
          })
    },
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
      this.fetchData()
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
    focusGameInput() {
      this.$refs.gameInputContainer.$refs.gameInputControl.focus()
    },
    clearGameInput() {
      this.gameInputText = ''
    },
    pauseGame() {
      this.stopGameTimer()
      this.isGameRunning = false
    },
    continueGame() {
      this.focusGameInput()
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