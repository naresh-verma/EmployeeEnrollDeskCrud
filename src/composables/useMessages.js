import messages from '../constants/messages.json'

export function useMessages(section = null) {
  /**
   * Get a value from messages object using dot notation
   * @param {string} path - Dot notation path (e.g., 'login.labels.emailLabel')
   * @param {*} defaultValue - Default value if path not found
   * @returns {*} The value at the path or default value
   */
  const getMessage = (path, defaultValue = '') => {
    try {
      const value = path.split('.').reduce((obj, key) => obj?.[key], messages)
      return value !== undefined ? value : defaultValue
    } catch (error) {
      console.warn(`Message path not found: ${path}`)
      return defaultValue
    }
  }

  /**
   * Replace placeholders in a message string
   * @param {string} message - Message containing placeholders like {placeholder}
   * @param {object} replacements - Object with key-value pairs for replacement
   * @returns {string} Message with placeholders replaced
   */
  const interpolate = (message, replacements = {}) => {
    return message.replace(/{(\w+)}/g, (match, key) => {
      return replacements[key] !== undefined ? replacements[key] : match
    })
  }

  /**
   * Get and interpolate a message
   * @param {string} path - Dot notation path
   * @param {object} replacements - Placeholders to replace
   * @param {*} defaultValue - Default value if not found
   * @returns {string} Interpolated message
   */
  const getInterpolated = (path, replacements = {}, defaultValue = '') => {
    const message = getMessage(path, defaultValue)
    return interpolate(message, replacements)
  }

  // If section is provided, return the section object with labels, errors, links
  if (section && messages[section]) {
    return {
      labels: messages[section].labels || {},
      errors: messages[section].errors || messages[section].error || {},
      links: messages[section].links || {},
      // Include utility methods for interpolation
      getMessage,
      interpolate,
      getInterpolated,
      // Also keep full object for reference
      [section]: messages[section]
    }
  }

  return {
    messages,
    getMessage,
    interpolate,
    getInterpolated
  }
}
