import messages from '../constants/messages.json'

const validationErrors = messages.validation?.error || {}

/**
 * Email validation using regex pattern
 * @param {string} email
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Password validation
 * Requirements:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one digit
 * - At least one special character (!@#$%^&*)
 * @param {string} password
 * @returns {object} { isValid, errors }
 */
export const validatePassword = (password) => {
  const errors = []

  if (!password) {
    errors.push(validationErrors.passwordRequired)
    return { isValid: false, errors }
  }

  if (password.length < 8) {
    errors.push(validationErrors.passwordMinLength)
  }

  if (!/[A-Z]/.test(password)) {
    errors.push(validationErrors.passwordUppercase)
  }

  if (!/[a-z]/.test(password)) {
    errors.push(validationErrors.passwordLowercase)
  }

  if (!/[0-9]/.test(password)) {
    errors.push(validationErrors.passwordDigit)
  }

  if (!/[!@#$%^&*]/.test(password)) {
    errors.push(validationErrors.passwordSpecial)
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate confirm password matches password
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {boolean}
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword
}

/**
 * Validate email format and return error message if invalid
 * @param {string} email
 * @returns {string|null}
 */
export const getEmailError = (email) => {
  if (!email) {
    return validationErrors.emailRequired
  }
  if (!validateEmail(email)) {
    return validationErrors.emailInvalid
  }
  return null
}
