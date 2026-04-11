<template>
  <q-page class="flex flex-center auth-page">
    <q-card class="auth-card" style="width: 100%; max-width: 400px">
      <q-card-section class="bg-primary text-white text-center">
        <div class="text-h5 text-weight-bold">{{ forgotLabels.title }}</div>
        <div class="text-caption">{{ forgotLabels.subtitle }}</div>
      </q-card-section>

      <q-card-section class="q-pt-lg">
        <!-- Step 1: Request Reset -->
        <q-form v-if="step === 1" @submit.prevent="handleRequestReset" class="q-gutter-md">
          <!-- Error Message -->
          <q-banner v-if="resetError" class="bg-negative text-white rounded-borders q-mb-md">
            {{ resetError }}
          </q-banner>

          <div class="text-caption text-grey-8">
            {{ forgotLabels.step1Message }}
          </div>

          <q-input
            v-model="form.email"
            filled
            type="email"
            :label="forgotLabels.emailLabel"
            :error="!!emailError"
            :error-message="emailError"
            @blur="validateEmailField"
            class="text-body1"
          >
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>

          <q-btn
            unelevated
            rounded
            color="primary"
            :label="forgotLabels.submitButton"
            type="submit"
            class="full-width text-weight-bold"
            size="lg"
            :loading="isLoading"
          />

          <div class="text-center">
            <router-link
              :to="forgotLinks.backToLoginUrl"
              class="text-primary text-decoration-none"
            >
              <span class="text-caption">{{ forgotLinks.backToLogin }}</span>
            </router-link>
          </div>
        </q-form>

        <!-- Step 2: Reset Password -->
        <q-form v-else-if="step === 2" @submit.prevent="handleResetPassword" class="q-gutter-md">
          <!-- Error Message -->
          <q-banner v-if="resetError" class="bg-negative text-white rounded-borders q-mb-md">
            {{ resetError }}
          </q-banner>

          <div class="text-caption text-grey-8 text-center bg-blue-1 q-pa-md rounded-borders">
            <q-icon name="info" color="info" />
            <div class="q-mt-sm">
              {{ forgotLabels.step2Message }}
              <strong>{{ form.email }}</strong>
            </div>
          </div>

          <q-input
            v-model="form.newPassword"
            filled
            :type="showPassword ? 'text' : 'password'"
            :label="forgotLabels.newPasswordLabel"
            :error="passwordErrors.length > 0"
            @blur="validateNewPasswordField"
            @input="validateNewPasswordField"
            class="text-body1"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

          <!-- Password Requirements -->
          <div v-if="form.newPassword" class="password-requirements">
            <div class="text-caption">{{ forgotLabels.passwordRequirements }}</div>
            <ul class="q-pl-md q-my-xs">
              <li
                class="text-caption"
                :class="
                  form.newPassword.length >= 8
                    ? 'text-positive'
                    : 'text-negative'
                "
              >
                {{ forgotLabels.requirement1 }}
              </li>
              <li
                class="text-caption"
                :class="
                  /[A-Z]/.test(form.newPassword) ? 'text-positive' : 'text-negative'
                "
              >
                {{ forgotLabels.requirement2 }}
              </li>
              <li
                class="text-caption"
                :class="
                  /[a-z]/.test(form.newPassword) ? 'text-positive' : 'text-negative'
                "
              >
                {{ forgotLabels.requirement3 }}
              </li>
              <li
                class="text-caption"
                :class="
                  /[0-9]/.test(form.newPassword) ? 'text-positive' : 'text-negative'
                "
              >
                {{ forgotLabels.requirement4 }}
              </li>
              <li
                class="text-caption"
                :class="
                  /[!@#$%^&*]/.test(form.newPassword)
                    ? 'text-positive'
                    : 'text-negative'
                "
              >
                {{ forgotLabels.requirement5 }}
              </li>
            </ul>
          </div>

          <q-input
            v-model="form.confirmPassword"
            filled
            :type="showConfirmPassword ? 'text' : 'password'"
            :label="forgotLabels.confirmPasswordLabel"
            :error="!!confirmPasswordError"
            :error-message="confirmPasswordError"
            @blur="validateConfirmPasswordField"
            @input="validateConfirmPasswordField"
            class="text-body1"
          >
            <template v-slot:prepend>
              <q-icon name="lock_outline" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showConfirmPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="showConfirmPassword = !showConfirmPassword"
              />
            </template>
          </q-input>

          <q-btn
            unelevated
            rounded
            color="primary"
            :label="forgotLabels.resetButton"
            type="submit"
            class="full-width text-weight-bold"
            size="lg"
            :loading="isLoading"
          />

          <div class="text-center">
            <router-link
              :to="forgotLinks.backToLoginUrl"
              class="text-primary text-decoration-none"
            >
              <span class="text-caption">{{ forgotLinks.backToLogin }}</span>
            </router-link>
          </div>
        </q-form>

        <!-- Step 3: Success -->
        <div v-else-if="step === 3" class="text-center q-gutter-md">
          <q-icon
            name="check_circle"
            size="64px"
            color="positive"
          />
          <div class="text-h6 text-weight-bold">{{ forgotLabels.step3Title }}</div>
          <div class="text-caption text-grey-8">
            {{ forgotLabels.step3Message }}
          </div>
          <q-btn
            unelevated
            rounded
            color="primary"
            :label="forgotLabels.goToLoginButton"
            class="full-width text-weight-bold"
            size="lg"
            @click="goToLogin"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useAuthForm } from '../composables/useAuthForm'
import { useMessages } from '../composables/useMessages'
import { validatePassword, validatePasswordMatch } from '../utils/validation'

const router = useRouter()
const authStore = useAuthStore()
const { labels: forgotLabels, errors: forgotErrors, links: forgotLinks } = useMessages('forgotPassword')

// Use auth form composable
const {
  showPassword,
  showConfirmPassword,
  emailError,
  passwordErrors,
  confirmPasswordError,
  validateEmailField: composableValidateEmail
} = useAuthForm()

const step = ref(1) // 1: Request Reset, 2: Reset Password, 3: Success

const form = ref({
  email: '',
  newPassword: '',
  confirmPassword: ''
})

const isLoading = ref(false)
const resetError = ref('')

const validateEmailField = () => {
  composableValidateEmail(form.value.email)
}

const validateNewPasswordField = () => {
  const validation = validatePassword(form.value.newPassword)
  passwordErrors.value = validation.errors
  // Also validate confirm password if it has a value
  if (form.value.confirmPassword) {
    validateConfirmPasswordField()
  }
}

const validateConfirmPasswordField = () => {
  if (!form.value.confirmPassword) {
    confirmPasswordError.value = forgotErrors.confirmPasswordRequired
  } else if (!validatePasswordMatch(form.value.newPassword, form.value.confirmPassword)) {
    confirmPasswordError.value = forgotErrors.passwordMismatch
  } else {
    confirmPasswordError.value = ''
  }
}

const handleRequestReset = async () => {
  validateEmailField()

  if (emailError.value) {
    return
  }

  isLoading.value = true
  resetError.value = ''

  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const result = authStore.requestPasswordReset(form.value.email)

    if (result.success) {
      step.value = 2
    } else {
      resetError.value = result.message || forgotErrors.resetLinkFailed
    }
  } catch (error) {
    resetError.value = forgotErrors.unexpectedError
  } finally {
    isLoading.value = false
  }
}

const handleResetPassword = async () => {
  validateNewPasswordField()
  validateConfirmPasswordField()

  if (passwordErrors.value.length > 0 || confirmPasswordError.value) {
    return
  }

  isLoading.value = true
  resetError.value = ''

  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const result = authStore.resetPassword(form.value.email, form.value.newPassword)

    if (result.success) {
      // Show success message
      step.value = 3
      
      // Redirect to login with success message after 2 seconds
      setTimeout(() => {
        router.push({
          name: 'Login',
          query: { passwordReset: 'success' }
        })
      }, 1500)
    } else {
      resetError.value = result.message || forgotErrors.resetFailed
    }
  } catch (error) {
    resetError.value = forgotErrors.unexpectedError
  } finally {
    isLoading.value = false
  }
}

const goToLogin = () => {
  router.push(forgotLinks.backToLoginUrl)
}
</script>

<style scoped src="../styles/views/forgot-password.scss" lang="scss"></style>
