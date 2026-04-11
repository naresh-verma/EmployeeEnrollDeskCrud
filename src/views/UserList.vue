<template>
  <div>
    <!-- Header with Logout Button -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-h6 text-weight-bold">
          <q-icon name="people" size="lg" class="q-mr-md" />
          {{ userListLabels.pageTitle }}
        </q-toolbar-title>
        <q-space />
        <div class="q-gutter-md flex items-center">
          <div class="text-subtitle2">
            {{ getInterpolated(userListLabels.welcomeMessage, { firstName: authStore.currentUser?.firstName }) }}
          </div>
          <q-btn
            flat
            round
            dense
            icon="logout"
            @click="showLogoutDialog = true"
            class="text-white"
          >
            <q-tooltip>{{ userListLabels.logoutTooltip }}</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Main Content -->
    <q-page class="q-pa-md">
      <q-table
        :rows="users"
        :columns="columns"
        row-key="id"
        :title="userListLabels.tableTitle"
      >
        <template #top-right>
          <q-btn
            color="primary"
            icon="add"
            :label="userListLabels.addUserButton"
            @click="$router.push(userListLinks.createUser)"
          />
        </template>
        <template #body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              flat
              round
              icon="edit"
              color="primary"
              @click="$router.push(userListLinks.editUser.replace('{id}', props.row.id))"
            />
            <q-btn
              flat
              round
              icon="work"
              color="info"
              @click="openRoleRegistration(props.row)"
            />
            <q-btn
              flat
              round
              icon="delete"
              color="negative"
              @click="confirmDelete(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
      <q-dialog v-model="showDeleteDialog">
        <q-card>
          <q-card-section class="row items-center">
            <span>{{ userListLabels.deleteConfirmMessage }}</span>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat :label="userListLabels.deleteCancel" v-close-popup />
            <q-btn flat :label="userListLabels.deleteConfirm" color="negative" @click="deleteUser" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="showRoleDialog">
        <keep-alive>
          <component
            :is="currentRoleComponent"
            :key="roleStep"
            :user-name="selectedUser?.name"
            :user-email="selectedUser?.email"
            :form-data="roleFormData"
            @close="closeRoleDialog"
            @submit="handleRoleStepSubmit"
            @back="goBackToForm"
          />
        </keep-alive>
      </q-dialog>

      <!-- Logout Confirmation Dialog -->
      <q-dialog v-model="showLogoutDialog">
        <q-card style="width: 400px">
          <q-card-section class="row items-center">
            <q-icon name="logout" color="warning" size="lg" class="q-mr-md" />
            <span class="text-h6">{{ userListLabels.logoutConfirmTitle }}</span>
          </q-card-section>
          <q-separator />
          <q-card-section>
            {{ userListLabels.logoutConfirmMessage }}
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              :label="userListLabels.logoutConfirmCancel"
              color="primary"
              v-close-popup
            />
            <q-btn
              flat
              :label="userListLabels.logoutConfirmButton"
              color="negative"
              @click="confirmLogout"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useAuthStore } from '../stores/auth'
import { useMessages } from '../composables/useMessages'
import { useUserManagement } from '../composables/useUserManagement'
import { useRoleRegistration } from '../composables/useRoleRegistration'

const router = useRouter()
const userStore = useUserStore()
const authStore = useAuthStore()
const { labels: userListLabels, errors: userListErrors, links: userListLinks, getInterpolated } = useMessages('userList')

const showLogoutDialog = ref(false)

const {
  columns,
  showDeleteDialog,
  userToDelete,
  confirmDelete,
  deleteUser
} = useUserManagement()

const {
  showRoleDialog,
  selectedUser,
  roleFormData,
  currentRoleComponent,
  openRoleRegistration,
  closeRoleDialog,
  goBackToForm,
  handleRoleStepSubmit
} = useRoleRegistration()

const users = computed(() => userStore.users)

const confirmLogout = () => {
  authStore.logout()
  showLogoutDialog.value = false
  router.push(userListLinks.home)
}
</script>

<style scoped src="../styles/views/user-list.scss" lang="scss"></style>