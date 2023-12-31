<template>
  <div class="mt-5 mb-5">
    <div class="container main-game-container">
      <div class="d-flex col-lg-12 row text-center">
        <div class="col-lg-3">
          <GameTimer
            :game-time-ms="gameTimeMs"
            :is-game-running="isGameRunning"
            :cpm="cpm"
            :time-limit-seconds="timeLimitSeconds"
            :remain-time-ms="remainTimeMs"
          />
        </div>
        <div class="col-lg-6">
          <div
            v-if="gameModeCode === GAME_MODE_RANDOM"
          >
            {{ $t('messages.loading') }}
          </div>
          <h4 v-else>
            {{ $t(`game_mode.${gameModeCode}`) }}
          </h4>
          <div v-if="remainTimeSeconds" class="fs-3 text-primary font-weight-bold">
            {{ remainTimeSeconds }}
          </div>
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
            :is-by-one-mode="isByOneMode"
            :expected-output-type="expectedOutputType"
            :game-input-text="gameInputText"
            :expected-output="displayedExpectedOutput"
            :capital-validation="expectedOutputType === EXPECTED_OUTPUT_TYPE_TEXT"
        />
      </div>
      <div class="my-1">
        <GameButtonTogglePause
            :is-game-running="isGameRunning"
            @pause-game="pauseGame"
            @continue-game="continueGame"
        />
        <span v-if="!isGameRunning" class="mx-2 fs-6" @click="continueGame">
          {{ $t('game.click_to_start') }}
        </span>
      </div>
      <div class="my-3">
        <GameInput
            ref="gameInputContainer"
            :is-by-one-mode="isByOneMode"
            :expected-output-type="expectedOutputType"
            :game-input-text="gameInputText"
            :is-game-running="isGameRunning"
            :expected-value="expectedValue"
            @update-game-input-text="updateGameInputText"
            @continue-game="continueGame"
        />
        <div v-if="!isByOneMode" class="d-flex justify-content-end">
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
import {
  ALERT_GAME_LOSS_MESSAGE_CODE,
  ALERT_GAME_LOSS_TITLE_CODE,
  ALERT_LOAD_DATA_ERROR_MESSAGE_CODE,
  ALERT_LOAD_DATA_ERROR_TITLE_CODE,
  ALERT_SAVE_GAME_SUCCESS_MESSAGE_CODE,
  ALERT_SAVE_GAME_SUCCESS_TITLE_CODE,
  ALERT_SAVE_GAME_USER_NOT_LOGGED_ERROR_MESSAGE_CODE,
  ALERT_SAVE_GAME_USER_NOT_LOGGED_ERROR_TITLE_CODE,
  ALERT_TYPE_DANGER,
  ALERT_TYPE_INFO,
  BY_ONE_LETTER_GAME_MODES,
  BY_ONE_WORD_GAME_MODES,
  EXPECTED_OUTPUT_TYPE_LETTER,
  EXPECTED_OUTPUT_TYPE_TEXT,
  EXPECTED_OUTPUT_TYPE_WORD,
  GAME_MODE_RANDOM,
  GAME_MODE_TYPE_TIME
} from '@/plugins/constants'
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
  emits: [
      'flash-alert',
      'update-game-mode-code'
  ],
  props: {
    gameModeCode: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      gameModeTypeCodes: [],
      mistakesCount: 0,
      loadingExpectedOutput: true,
      loadingSavingResult: false,
      isGameRunning: false,
      gameTimerInterval: null,
      gameTimeMs: 0,
      timeLimitSeconds: 0,
      gameInputTimeEndings: [],
      gameInputText: '',
      expectedOutput: '',
      expectedOutputId: null,
      EXPECTED_OUTPUT_TYPE_TEXT,
      GAME_MODE_RANDOM
    }
  },
  computed: {
    remainTimeSeconds() {
      const remainTime = this.timeLimitSeconds - (this.gameTimeMs / 1000)

      return !isNaN(remainTime) && remainTime >= 0  ? parseInt(remainTime) : 0
    },
    remainTimeMs() {
      const remainTime = (this.timeLimitSeconds * 1000) - this.gameTimeMs

      return remainTime >= 0 ? remainTime : 0
    },
    inputControl() {
      return this.isByOneMode
          ? this.$refs.gameInputContainer.$refs.byOneControl
          : this.$refs.gameInputContainer.$refs.gameInputControl
    },
    targetExceptedOutput() {
      return this.isByOneMode ? this.expectedOutputWithoutWhitespaces : this.expectedOutput
    },
    expectedValue() {
      if (BY_ONE_WORD_GAME_MODES.includes(this.gameModeCode)) {
        return this.currentWord
      } else if (BY_ONE_LETTER_GAME_MODES.includes(this.gameModeCode)) {
        return this.currentChar
      }

      return null
    },
    isTimeLimitModeType() {
      return this.gameModeTypeCodes.includes(GAME_MODE_TYPE_TIME)
    },
    isByOneMode() {
      return this.expectedOutputType !== EXPECTED_OUTPUT_TYPE_TEXT
    },
    displayedExpectedOutput() {
      if (this.expectedOutputType === EXPECTED_OUTPUT_TYPE_TEXT) {
        return this.expectedOutput
      } else if (this.expectedOutputType === EXPECTED_OUTPUT_TYPE_WORD) {
        return this.currentWord
      } else if (this.expectedOutputType === EXPECTED_OUTPUT_TYPE_LETTER) {
        return this.currentChar
      }

      return this.expectedOutput
    },
    expectedOutputType() {
      if (BY_ONE_WORD_GAME_MODES.includes(this.gameModeCode)) {
        return EXPECTED_OUTPUT_TYPE_WORD
      } else if (BY_ONE_LETTER_GAME_MODES.includes(this.gameModeCode)) {
        return EXPECTED_OUTPUT_TYPE_LETTER
      }

      return EXPECTED_OUTPUT_TYPE_TEXT
    },
    expectedOutputWordsList() {
      return (this.expectedOutput || '').split(/\s+/g)
    },
    currentWordsCharIndex() {
      return (this.gameInputText || '').replace(/\s+/g, '').length
    },
    expectedOutputWithoutWhitespaces() {
      return (this.expectedOutput || '').replace(/\s+/g, '')
    },
    currentChar() {
      return (this.expectedOutputWithoutWhitespaces || [])[this.currentWordsCharIndex]
    },
    currentWord() {
      let currentIndex = 0

      for (const word of this.expectedOutputWordsList) {
        const wordLength = word.length

        if (
            this.currentWordsCharIndex + 1 > currentIndex
            && this.currentWordsCharIndex + 1 <= currentIndex + wordLength
        ) {
          return word
        }

        currentIndex += wordLength
      }

      return ''
    },
    cpm() {
      const cpm = (this.gameInputText.length - this.mistakesCount) / (this.gameTimeMs / 60000)

      return !isNaN(cpm) ? cpm.toFixed(2) : 0
    },
    finishedSuccessFully() {
      return this.gameInputText.length === this.targetExceptedOutput.length
    },
    finished() {
      if (this.isTimeLimitModeType) {
        return !this.remainTimeMs || this.gameInputText.length === this.targetExceptedOutput.length
      } else {  // textLengthModeType
        return this.gameInputText.length === this.targetExceptedOutput.length
      }
    },
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.addKeyDownListener()

    if (this.isGameRunning) {
      this.continueGame()
    } else {
      this.pauseGame()
    }
  },
  beforeUnmount() {
    this.removeKeyDownListener()
  },
  methods: {
    removeKeyDownListener() {
      document.body.removeEventListener('keydown', this.startGameFast)
    },
    addKeyDownListener() {
      document.body.addEventListener('keydown', this.startGameFast)
    },
    saveResult() {
      if (!this.finishedSuccessFully) {
        this.$emit('flash-alert', {
          type: ALERT_TYPE_DANGER,
          title: this.$t(`${ALERT_GAME_LOSS_TITLE_CODE}`),
          message: this.$t(`${ALERT_GAME_LOSS_MESSAGE_CODE}`),
        })

        return
      }

      if (!this.$store.getters.isAuthenticated) {
        this.$emit('flash-alert', {
          type: ALERT_TYPE_INFO,
          title: this.$t(`${ALERT_SAVE_GAME_USER_NOT_LOGGED_ERROR_TITLE_CODE}`),
          message: this.$t(`${ALERT_SAVE_GAME_USER_NOT_LOGGED_ERROR_MESSAGE_CODE}`),
        })

        return
      }

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
            this.$emit('flash-alert', {
              type: 'success',
              title: this.$t(`${ALERT_SAVE_GAME_SUCCESS_TITLE_CODE}`),
              message: this.$t(`${ALERT_SAVE_GAME_SUCCESS_MESSAGE_CODE}`),
            })
            this.loadingSavingResult = false
          })
          .catch(error => {
            if (error.response && error.response.status === 403) {
              this.$emit('flash-alert', {
                type: ALERT_TYPE_INFO,
                title: this.$t(`${ALERT_SAVE_GAME_USER_NOT_LOGGED_ERROR_TITLE_CODE}`),
                message: this.$t(`${ALERT_SAVE_GAME_USER_NOT_LOGGED_ERROR_MESSAGE_CODE}`),
              })
            } else {
              this.$emit('flash-alert', {
                type: ALERT_TYPE_DANGER,
                title: this.$t(`${ALERT_LOAD_DATA_ERROR_TITLE_CODE}`),
                message: this.$t(`${ALERT_LOAD_DATA_ERROR_MESSAGE_CODE}`),
              })
            }
            console.error(error)
          })
    },
    fetchData() {
      this.loadingExpectedOutput = true
      const url = `${process.env.VUE_APP_BACKEND_URL}/api/game/expected-text`,
          params = {
            locale_iso: window.LOCALE_ISO,
            game_mode_code: this.gameModeCode
          }

      axios.get(url, {params})
          .then(response => {
            this.gameModeTypeCodes = response.data.gameMode.typeCodes

            if (this.isTimeLimitModeType) {
              this.timeLimitSeconds = response.data.timeLimitSeconds
            }

            this.$emit('update-game-mode-code', response.data.gameMode.code)

            const expectedOutputText = response.data.expectedText
            this.expectedOutput = expectedOutputText.text
            this.expectedOutputId = expectedOutputText.id

            this.loadingExpectedOutput = false
          })
          .catch(error => {
            this.$emit('flash-alert', {
              type: ALERT_TYPE_DANGER,
              title: this.$t(`${ALERT_LOAD_DATA_ERROR_TITLE_CODE}`),
              message: this.$t(`${ALERT_LOAD_DATA_ERROR_MESSAGE_CODE}`),
            })
            console.error(error)
          })
    },
    updateGameInputText(newText, isFastStart = false) {
      if (isFastStart && BY_ONE_WORD_GAME_MODES.includes(this.gameModeCode)) {
        this.$refs.gameInputContainer.byOneInput = newText
      } else {
        this.gameInputText = newText

        if (!isFastStart) {
          this.checkForGameFinish()
          this.checkForAutomation()
        }
      }

      this.calculateMistakesCount()
    },
    checkForAutomation() {
      this.gameInputTimeEndings.push(this.gameTimeMs % 100)

      if (this.gameInputTimeEndings.length > 150) {
        this.gameInputTimeEndings.splice(0)
      } else {
        this.gameInputTimeEndings.reduce((obj, item) => {
          const occurrenceCount = (obj[item] || 0)

          if (occurrenceCount > 100) {
            // todo: ban user
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
        this.addKeyDownListener() // optional (delete if breaks something)
      }
    },
    inputChar(index) {
      return this.gameInputText[index]
    },
    expectedChar(index) {
      return this.targetExceptedOutput[index]
    },
    calculateMistakesCount() {
      if (this.isByOneMode) {
        return 0
      }

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
      this.inputControl.focus()
    },
    clearGameInput() {
      this.gameInputText = ''
      this.inputControl.value = ''
      this.mistakesCount = 0
    },
    pauseGame() {
      this.stopGameTimer()
      this.isGameRunning = false
    },
    startGameFast(event) {  // by char clicked on document
      if (!this.isGameRunning && event.key && event.key.length === 1 && !event.ctrlKey) {
        event.preventDefault()
        this.removeKeyDownListener()
        this.continueGame(event.key)
      }
    },
    continueGame(key) {
      if (this.finished) {
        this.restartGame()
      } else {
        if (key && key.length === 1 && typeof key === 'string') {
          this.updateGameInputText(key, true)
        }

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