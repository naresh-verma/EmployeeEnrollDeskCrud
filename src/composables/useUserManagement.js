import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { USER_TABLE_COLUMNS } from '../constants/index'

export function useUserManagement() {
  const userStore = useUserStore()
  const showDeleteDialog = ref(false)
  const userToDelete = ref(null)

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
    columns: USER_TABLE_COLUMNS,
    users: userStore.users,
    showDeleteDialog,
    userToDelete,
    confirmDelete,
    deleteUser
  }
}