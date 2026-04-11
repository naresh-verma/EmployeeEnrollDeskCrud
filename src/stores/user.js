import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref([])

  const addUser = (user) => {
    user.id = Date.now()
    users.value.push(user)
  }

  const updateUser = (id, updatedUser) => {
    const index = users.value.findIndex(u => u.id === id)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...updatedUser }
    }
  }

  const deleteUser = (id) => {
    users.value = users.value.filter(u => u.id !== id)
  }

  const getUser = (id) => {
    return users.value.find(u => u.id === id)
  }

  return {
    users,
    addUser,
    updateUser,
    deleteUser,
    getUser
  }
})