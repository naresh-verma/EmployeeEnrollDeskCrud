import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRoleRegistryStore = defineStore('roleRegistry', () => {
  const registrations = ref([])

  const addRegistration = (registration) => {
    registration.id = Date.now()
    registration.registeredAt = new Date().toISOString()
    registrations.value.push(registration)
  }

  const getRegistrationsByUserId = (userId) => {
    return registrations.value.filter(r => r.userId === userId)
  }

  return {
    registrations,
    addRegistration,
    getRegistrationsByUserId
  }
})