<template>
  <q-page class="flex flex-center auth-page">
    <!-- Password Reset Success Banner -->
    <q-banner
      v-if="showPasswordResetBanner"
      class="password-reset-banner"
    >
      <template v-slot:avatar>
        <q-icon name="check_circle" color="positive" size="lg" />
      </template>
      <div class="text-h6">{{ loginLabels.passwordResetTitle }}</div>
      <div class="text-body2 text-grey-8">{{ loginLabels.passwordResetMessage }}</div>
    </q-banner>

    <q-card class="auth-card" style="width: 100%; max-width: 400px">
      <q-card-section class="bg-primary text-white text-center">
        <div class="text-h5 text-weight-bold">{{ loginLabels.title }}</div>
        <div class="text-caption">{{ loginLabels.subtitle }}</div>
      </q-card-section>

      <q-card-section class="q-pt-lg">
        <q-form @submit.prevent="handleLogin" class="q-gutter-md">
          <!-- Error Message -->
          <q-banner v-if="loginError" class="bg-negative text-white rounded-borders q-mb-md">
            {{ loginError }}
          </q-banner>

          <!-- Email Field -->
          <q-input
            v-model="form.email"
            filled
            type="email"
            :label="loginLabels.emailLabel"
            :error="!!emailError"
            :error-message="emailError"
            @blur="validateEmailField"
            class="text-body1"
          >
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>

          <!-- Password Field -->
          <q-input
            v-model="form.password"
            filled
            :type="showPassword ? 'text' : 'password'"
            :label="loginLabels.passwordLabel"
            :error="!!passwordError"
            :error-message="passwordError"
            @blur="validatePasswordField"
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

          <!-- Submit Button -->
          <q-btn
            unelevated
            rounded
            color="primary"
            :label="loginLabels.submitButton"
            type="submit"
            class="full-width text-weight-bold"
            size="lg"
            :loading="isLoading"
          />
        </q-form>

        <!-- Forgot Password Link -->
        <div class="text-center q-mt-md">
          <router-link
            :to="loginLinks.forgotPasswordUrl"
            class="text-primary text-decoration-none"
          >
            <span class="text-caption">{{ loginLinks.forgotPassword }}</span>
          </router-link>
        </div>

        <!-- Sign Up Link -->
        <div class="text-center q-mt-md">
          <span class="text-caption">{{ loginLinks.signupText }}</span>
          <router-link
            :to="loginLinks.signupUrl"
            class="text-primary text-decoration-none text-weight-bold"
          >
            <span class="text-caption">{{ loginLinks.signupLink }}</span>
          </router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useAuthForm } from '../composables/useAuthForm'
import { useMessages } from '../composables/useMessages'
import { getEmailError } from '../utils/validation'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { labels: loginLabels, errors: loginErrors, links: loginLinks } = useMessages('login')

// Use auth form composable
const {
  showPassword,
  emailError,
  passwordError
} = useAuthForm()

const form = ref({
  email: '',
  password: ''
})

const isLoading = ref(false)
const showPasswordResetBanner = ref(false)
const loginError = ref('')

onMounted(() => {
  // Check if coming from password reset
  if (route.query.passwordReset === 'success') {
    showPasswordResetBanner.value = true
    // Clear the query parameter
    router.replace({ name: 'Login' })
  }
})

const validateEmailField = () => {
  emailError.value = getEmailError(form.value.email)
}

const validatePasswordField = () => {
  if (!form.value.password) {
    passwordError.value = loginErrors.passwordRequired
  } else {
    passwordError.value = ''
  }
}

const handleLogin = async () => {
  // Validate all fields
  validateEmailField()
  validatePasswordField()

  if (emailError.value || passwordError.value) {
    return
  }

  isLoading.value = true
  loginError.value = ''

  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const result = authStore.login(form.value.email, form.value.password)

    if (result.success) {
      router.push(loginLinks.dashboardUrl)
    } else {
      loginError.value = result.message || loginErrors.loginFailed
    }
  } catch (error) {
    loginError.value = loginErrors.unexpectedError
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped src="../styles/views/login.scss" lang="scss"></style>
