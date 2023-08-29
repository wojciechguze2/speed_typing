<template>
  <div class="container">
    <AccountTabs />
    <div class="mx-auto py-3">
      <Loader v-if="loading"/>
      <div v-else class="account-buttons d-flex justify-content-end my-1">
        <button
            class="btn btn-primary mx-1"
            @click="editAccountButtonClick"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            :title="$t('account.edit_account')"
        >
          <font-awesome-icon icon="pen" />
        </button>
        <button
            class="btn btn-danger"
            @click="deleteAccountButtonClick"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            :title="$t('account.delete_account')"
        >
          <font-awesome-icon icon="trash-can" />
        </button>
      </div>
      <table
          class="table table-responsive table-bordered"
      >
        <tbody>
          <tr>
            <td>
              {{ $t('messages.email') }}
            </td>
            <td>
              {{ userData.email }}
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('account.last_login_date') }}
            </td>
            <td>
              {{ userData.lastLoginDate }}
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('account.join_date') }}
            </td>
            <td>
              {{ userData.createDate }}
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('account.last_game_mode') }}
            </td>
            <td>
              {{ userData.lastGameModeCode ? $t(`game_mode.${userData.lastGameModeCode}`) : '-' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ModalConfirm
        :is-opened="deleteModalOpened"
        modal-id="account-delete-modal"
        :modal-title="$t('account.delete_account')"
        :modal-message="$t('account.delete_account_confirm')"
        @confirm="deleteAccount"
        @close="hideDeleteModal"
    />
    <AccountEditModal
        :current-email="userData.email"
        :is-opened="editModalOpened"
        @confirm="editAccount"
        @close="hideEditModal"
    />
  </div>
</template>

<script>
import AccountTabs from '@/components/AccountTabs'
import Loader from '@/components/Loader'
import axios from '@/plugins/axios'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ModalConfirm from '@/components/ModalConfirm'
import { validateEmail } from '@/plugins/validators'
import AccountEditModal from '@/components/AccountEditModal'
import {
  ACCOUNT_EMAIL_CHANGE_AVAILABLE,
  ALERT_DEFAULT_SUCCESS_MESSAGE_CODE,
  ALERT_EMAIL_VALIDATION_ERROR_MESSAGE_CODE,
  ALERT_LOAD_DATA_ERROR_MESSAGE_CODE,
  ALERT_LOAD_DATA_ERROR_TITLE_CODE,
  ALERT_TYPE_DANGER, ALERT_TYPE_SUCCESS,
  DEFAULT_AUTHENTICATED_REDIRECT_URL,
  DEFAULT_NOT_AUTHENTICATED_REDIRECT_URL,
  LOGOUT_URL
} from '@/plugins/constants'

export default {
  name: 'AccountView',
  components: {
    AccountEditModal,
    ModalConfirm,
    FontAwesomeIcon,
    AccountTabs,
    Loader
  },
  data() {
    return {
      deleteModalOpened: false,
      editModalOpened: false,
      loading: true,
      userData: {
        email: null,
        createDate: null,
        lastLoginDate: null,
        lastGameModeCode: null
      }
    }
  },
  beforeCreate() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push(DEFAULT_AUTHENTICATED_REDIRECT_URL)
    }
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    deleteAccountButtonClick() {
      this.showDeleteModal()
    },
    showDeleteModal() {
      this.deleteModalOpened = true
    },
    hideDeleteModal() {
      this.deleteModalOpened = false
    },
    async deleteAccount() {
      const url = `${process.env.VUE_APP_BACKEND_URL}/api/user`

      this.loading = true

      axios.delete(url)
          .then(response => {
            const deleted = response.data

            if (deleted) {
              this.$emit('flash-alert', {
                type: 'success',
                message: this.$t(`${ALERT_DEFAULT_SUCCESS_MESSAGE_CODE}`),
              })
              this.$router.push(DEFAULT_NOT_AUTHENTICATED_REDIRECT_URL)
            }
          })
          .catch(error => {
            this.$emit('flash-alert', {
              type: ALERT_TYPE_DANGER,
              title: this.$t(`${ALERT_LOAD_DATA_ERROR_TITLE_CODE}`),
              message: this.$t(`${ALERT_LOAD_DATA_ERROR_MESSAGE_CODE}`),
            })
            console.error(error)
          })

      this.loading = false
    },
    editAccountButtonClick() {
      this.showEditModal()
    },
    showEditModal() {
      this.editModalOpened = true
    },
    hideEditModal() {
      this.editModalOpened = false
    },
    async editAccount(email, password) {
      const url = `${process.env.VUE_APP_BACKEND_URL}/api/user`

      if (!validateEmail(email)) {
        this.$emit('flash-alert', {
          type: ALERT_TYPE_DANGER,
          message: this.$t(`${ALERT_EMAIL_VALIDATION_ERROR_MESSAGE_CODE}`),
        })

        return
      }

      this.loading = true

      const patchData = {
        password
      }

      if (ACCOUNT_EMAIL_CHANGE_AVAILABLE) {
        patchData['email'] = email
      }

      axios.patch(url, patchData)
          .then(response => {
            this.$emit('flash-alert', {
              type: ALERT_TYPE_SUCCESS,
              message: this.$t(`${ALERT_DEFAULT_SUCCESS_MESSAGE_CODE}`),
            })
            this.userData = response.data
            this.hideEditModal()
            this.$router.push(LOGOUT_URL)
          })
          .catch(error => {
            this.$emit('flash-alert', {
              type: ALERT_TYPE_DANGER,
              title: this.$t(`${ALERT_LOAD_DATA_ERROR_TITLE_CODE}`),
              message: this.$t(`${ALERT_LOAD_DATA_ERROR_MESSAGE_CODE}`),
            })
            console.error(error)
          })

      this.loading = false
    },
    async fetchData() {
      const url = `${process.env.VUE_APP_BACKEND_URL}/api/user`

      axios.get(url)
          .then(response => {
            this.userData = response.data
            this.loading = false
          })
          .catch(error => {
            if (error.response && error.response.status === 403) {
              this.$router.push(LOGOUT_URL)
            } else {
              this.$emit('flash-alert', {
                type: ALERT_TYPE_DANGER,
                title: this.$t(`${ALERT_LOAD_DATA_ERROR_TITLE_CODE}`),
                message: this.$t(`${ALERT_LOAD_DATA_ERROR_MESSAGE_CODE}`),
              })
            }

            console.error(error)
          })
    }
  }
}
</script>