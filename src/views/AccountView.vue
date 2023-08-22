<template>
  <AccountTabs />
  <Loader v-if="loading"/>
  <div v-else class="w-50 mx-auto my-5">
    <div class="account-buttons d-flex justify-content-end my-1">
      <button
          class="btn btn-primary mx-1"
          @click="editAccountButtonClick"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Edytuj konto"
      >
        <font-awesome-icon icon="pen" />
      </button>
      <button
          class="btn btn-danger"
          @click="deleteAccountButtonClick"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Usuń konto"
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
            Email
          </td>
          <td>
            {{ userData.email }}
          </td>
        </tr>
        <tr>
          <td>
            Data ostatniego logowania
          </td>
          <td>
            {{ userData.lastLoginDate }}
          </td>
        </tr>
        <tr>
          <td>
            Data dołączenia
          </td>
          <td>
            {{ userData.createDate }}
          </td>
        </tr>
        <tr>
          <td>
            Data dołączenia
          </td>
          <td>
            {{ userData.createDate }}
          </td>
        </tr>
        <tr>
          <td>
            Ostatni tryb gry
          </td>
          <td>
            {{ userData.lastGameModeCode }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <ModalConfirm
      :is-opened="deleteModalOpened"
      modal-id="account-delete-modal"
      modal-title="Usuń konto"
      modal-message="Czy na pewno chcesz usunąć konto?"
      @confirm="deleteAccount"
      @close="hideDeleteModal"
  />
  <AccountEditModal
      :current-email="userData.email"
      :is-opened="editModalOpened"
      @confirm="editAccount"
      @close="hideEditModal"
  />
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
              // todo: alert, confirmation
              this.$router.push(DEFAULT_NOT_AUTHENTICATED_REDIRECT_URL)
            }
          })
          .catch(error => {
            // todo: alert
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
        // todo: alert

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
            // todo: alert, confirmation
            this.userData = response.data
            this.hideEditModal()
            this.$router.push(LOGOUT_URL)
          })
          .catch(error => {
            // todo: alert
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
            // todo: alert
            if (error.response && error.response.status === 403) {
              this.$router.push(LOGOUT_URL)
            }
            console.error(error)
          })
    }
  }
}
</script>