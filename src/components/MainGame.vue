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
            {{ gameModeCode }} <!-- todo: translation/get name -->
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
        <div v-if="loadingExpectedOutput">
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
import axios from '@/plugins/axios'

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
    gameModeCode: {
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
      loadingExpectedOutput: true,
      loadingSavingResult: false,
      expectedOutputId: null
    }
  },
  computed: {
    cpm() {
      const cpm = (this.gameInputText.length - this.mistakesCount) / (this.gameTimeMs / 60000)

      return !isNaN(cpm) ? cpm.toFixed(2) : 0
    },
    finished() {
      return this.gameInputText.length === this.expectedOutput.length
    },
    countdownSeconds() {
      return this.gameModeCode === GAME_MODE_FAST ? 3 : 5
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
    saveResult() {
      this.loadingSavingResult = true
      const url = `${process.env.VUE_APP_BACKEND_URL}/api/game/save`,
          postData = {
            'expectedTextId': this.expectedOutputId,
            'gameModeCode': this.gameModeCode,
            'cpm': this.cpm,
            'timeMs': this.gameTimeMs,
            'mistakesCount': this.mistakesCount
          }

      axios.post(url, postData)
          .then(() => {
            // todo: alert
            this.loadingSavingResult = false
          })
          .catch(error => {
            // todo: alert
            console.error(error)
          })
    },
    fetchData() {
      this.loadingExpectedOutput = true
      const url = `${process.env.VUE_APP_BACKEND_URL}/api/expected-texts/random`

      axios.get(url)
          .then(response => {
            const expectedOutputText = response.data
            this.expectedOutput = expectedOutputText.text
            this.expectedOutputId = expectedOutputText.id
            this.loadingExpectedOutput = false
            // todo: alert
          })
          .catch(error => {
            // todo: alert
            console.error(error)
          })
    },
    updateGameInputText(newText) {
      this.gameInputText = newText
      this.checkForGameFinish()
      this.calculateMistakesCount()
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
      if (this.finished) {
        this.pauseGame()
        this.saveResult()
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
      this.mistakesCount = 0
    },
    pauseGame() {
      this.stopGameTimer()
      this.isGameRunning = false
    },
    continueGame() {
      if (this.finished) {
        this.restartGame()
      } else {
        this.focusGameInput()
        this.startGameTimer()
        this.isGameRunning = true
      }
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