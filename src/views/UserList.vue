``<template>
  <q-page class="q-pa-md">
    <q-table
      :rows="users"
      :columns="columns"
      row-key="id"
      title="Users"
    >
      <template #top-right>
        <q-btn
          color="primary"
          icon="add"
          label="Add User"
          @click="$router.push('/create')"
        />
      </template>
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            icon="edit"
            color="primary"
            @click="$router.push(`/edit/${props.row.id}`)"
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
          <span>Are you sure you want to delete this user?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Delete" color="negative" @click="deleteUser" v-close-popup />
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
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useUserManagement } from '../composables/useUserManagement'
import { useRoleRegistration } from '../composables/useRoleRegistration'

const router = useRouter()
const userStore = useUserStore()

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
</script>