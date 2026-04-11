import { computed, ref } from 'vue'
import { useUserStore } from '../stores/user'
import { getUserTableColumns } from '../constants/index'
import { useMessages } from './useMessages'

export function useUserManagement() {
  const userStore = useUserStore()
  const { labels: userListLabels } = useMessages('userList')
  const showDeleteDialog = ref(false)
  const userToDelete = ref(null)
  const columns = computed(() => getUserTableColumns(userListLabels))

  const confirmDelete = (id) => {
    userToDelete.value = id
    showDeleteDialog.value = true
  }

  const deleteUser = () => {
    if (userToDelete.value) {
      userStore.deleteUser(userToDelete.value)
      userToDelete.value = null
    }
  }

  return {
    columns,
    users: userStore.users,
    showDeleteDialog,
    userToDelete,
    confirmDelete,
    deleteUser
  }
}