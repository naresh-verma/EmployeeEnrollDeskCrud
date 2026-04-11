import { ref } from 'vue'
import { getEmailError, validatePassword, validatePasswordMatch } from '../utils/validation'
import { useMessages } from './useMessages'

/**
 * Composable for auth form handling
 * Provides reusable validation methods and form state management
 */
export const useAuthForm = () => {
  const { getMessage } = useMessages()

  // Password visibility states
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)

  // Error states
  const emailError = ref('')
  const passwordError = ref('')
  const passwordErrors = ref([])
  const confirmPasswordError = ref('')
  const firstNameError = ref('')

  /**
   * Validate email field
   */
  const validateEmailField = (email, checkIfExists = null) => {
    emailError.value = getEmailError(email)
    // Optional: Check if email already exists
    if (!emailError.value && checkIfExists) {
      const userExists = checkIfExists(email)
      if (userExists) {
        emailError.value = getMessage('auth.error.emailExists')
      }
    }
  }

  /**
   * Validate password field
   */
  const validatePasswordField = (password) => {
    if (!password) {
      passwordError.value = getMessage('validation.error.passwordRequired')
    } else {
      passwordError.value = ''
    }
  }

  /**
   * Validate password with all requirements
   */
  const validatePasswordRequirements = (password) => {
    const validation = validatePassword(password)
    passwordErrors.value = validation.errors
    return validation
  }

  /**
   * Validate confirm password matches password
   */
  const validateConfirmPasswordField = (password, confirmPassword) => {
    if (!confirmPassword) {
      confirmPasswordError.value = getMessage('signup.error.confirmPasswordRequired')
    } else if (!validatePasswordMatch(password, confirmPassword)) {
      confirmPasswordError.value = getMessage('signup.error.passwordMismatch')
    } else {
      confirmPasswordError.value = ''
    }
  }

  /**
   * Validate new password field (for reset)
   */
  const validateNewPasswordField = (password, confirmPassword = null) => {
    const validation = validatePassword(password)
    passwordErrors.value = validation.errors
    
    // Also validate confirm password if it has a value
    if (confirmPassword) {
      validateConfirmPasswordField(password, confirmPassword)
    }

    return validation
  }

  /**
   * Validate first name field
   */
  const validateFirstNameField = (firstName) => {
    if (!firstName.trim()) {
      firstNameError.value = getMessage('signup.error.firstNameRequired')
    } else {
      firstNameError.value = ''
    }
  }

  /**
   * Clear all validation errors
   */
  const clearErrors = () => {
    emailError.value = ''
    passwordError.value = ''
    passwordErrors.value = []
    confirmPasswordError.value = ''
    firstNameError.value = ''
  }

  /**
   * Toggle password visibility
   */
  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
  }

  /**
   * Toggle confirm password visibility
   */
  const toggleConfirmPasswordVisibility = () => {
    showConfirmPassword.value = !showConfirmPassword.value
  }

  return {
    // States
    showPassword,
    showConfirmPassword,
    emailError,
    passwordError,
    passwordErrors,
    confirmPasswordError,
    firstNameError,

    // Methods
    validateEmailField,
    validatePasswordField,
    validatePasswordRequirements,
    validateConfirmPasswordField,
    validateNewPasswordField,
    validateFirstNameField,
    clearErrors,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility
  }
}
