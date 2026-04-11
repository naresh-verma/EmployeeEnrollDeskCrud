import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useMessages } from '../composables/useMessages'

export const useAuthStore = defineStore('auth', () => {
  const { labels: authLabels, errors: authErrors } = useMessages('auth')
  const currentUser = ref(null)
  const isAuthenticated = computed(() => !!currentUser.value)
  const users = ref([]) // In-memory user database (replace with API calls in production)

  // Initialize users from localStorage if available
  const initializeUsers = () => {
    const storedUsers = localStorage.getItem('appUsers')
    if (storedUsers) {
      users.value = JSON.parse(storedUsers)
    }
  }

  // Initialize current user from localStorage if available
  const initializeCurrentUser = () => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      currentUser.value = JSON.parse(storedUser)
    }
  }

  // Save users to localStorage
  const saveUsersToStorage = () => {
    localStorage.setItem('appUsers', JSON.stringify(users.value))
  }

  // Save current user to localStorage
  const saveCurrentUserToStorage = () => {
    if (currentUser.value) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
    } else {
      localStorage.removeItem('currentUser')
    }
  }

  /**
   * Register a new user
   * @param {object} userData - { email, password, firstName, lastName }
   * @returns {object} { success, message, user }
   */
  const signup = (userData) => {
    try {
      // Check if user already exists
      if (users.value.some(u => u.email === userData.email)) {
        return {
          success: false,
          message: authErrors.emailExists
        }
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email: userData.email,
        password: userData.password, // In production, this should be hashed
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        createdAt: new Date().toISOString()
      }

      users.value.push(newUser)
      saveUsersToStorage()

      return {
        success: true,
        message: authLabels.signupSuccess,
        user: { ...newUser, password: undefined }
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || authErrors.signupUnexpected
      }
    }
  }

  /**
   * Login user
   * @param {string} email
   * @param {string} password
   * @returns {object} { success, message, user }
   */
  const login = (email, password) => {
    try {
      const user = users.value.find(u => u.email === email)

      if (!user) {
        return {
          success: false,
          message: authErrors.invalidCredentials
        }
      }

      if (user.password !== password) {
        return {
          success: false,
          message: authErrors.invalidCredentials
        }
      }

      // Set current user
      currentUser.value = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
      saveCurrentUserToStorage()

      return {
        success: true,
        message: authLabels.loginSuccess,
        user: currentUser.value
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || authErrors.loginUnexpected
      }
    }
  }

  /**
   * Logout current user
   */
  const logout = () => {
    currentUser.value = null
    saveCurrentUserToStorage()
  }

  /**
   * Request password reset
   * @param {string} email
   * @returns {object} { success, message }
   */
  const requestPasswordReset = (email) => {
    try {
      const user = users.value.find(u => u.email === email)

      if (!user) {
        // For security, return generic message
        return {
          success: true,
          message: authLabels.passwordResetRequestSuccess
        }
      }

      // In production, send email with reset token
      // For demo, store reset token in localStorage
      const resetToken = Math.random().toString(36).substring(2, 15)
      localStorage.setItem(`resetToken_${email}`, resetToken)
      localStorage.setItem(`resetTokenExpiry_${email}`, Date.now() + 3600000) // 1 hour expiry

      return {
        success: true,
        message: authLabels.passwordResetRequestSuccess
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || authErrors.genericUnexpected
      }
    }
  }

  /**
   * Reset password
   * @param {string} email
   * @param {string} newPassword
   * @returns {object} { success, message }
   */
  const resetPassword = (email, newPassword) => {
    try {
      const user = users.value.find(u => u.email === email)

      if (!user) {
        return {
          success: false,
          message: authErrors.userNotFound
        }
      }

      // Update password
      user.password = newPassword
      saveUsersToStorage()

      // Clear reset token
      localStorage.removeItem(`resetToken_${email}`)
      localStorage.removeItem(`resetTokenExpiry_${email}`)

      return {
        success: true,
        message: authLabels.passwordResetSuccess
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || authErrors.passwordResetUnexpected
      }
    }
  }

  /**
   * Check if reset token is valid
   * @param {string} email
   * @returns {boolean}
   */
  const isResetTokenValid = (email) => {
    const expiry = localStorage.getItem(`resetTokenExpiry_${email}`)
    if (!expiry) return false
    return Date.now() < parseInt(expiry)
  }

  // Initialize on store creation
  initializeUsers()
  initializeCurrentUser()

  return {
    currentUser,
    isAuthenticated,
    users,
    signup,
    login,
    logout,
    requestPasswordReset,
    resetPassword,
    isResetTokenValid
  }
})
