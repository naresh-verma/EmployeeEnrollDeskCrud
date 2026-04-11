<template>
  <q-page class="flex flex-center auth-page">
    <!-- Success Banner -->
    <q-banner
      v-if="showSuccessBanner"
      class="success-banner"
    >
      <template v-slot:avatar>
        <q-icon name="check_circle" color="positive" size="lg" />
      </template>
      <div class="text-h6">{{ signupLabels.successTitle }}</div>
      <div class="text-body2 text-grey-8">{{ getInterpolated(signupLabels.successMessage, { firstName: form.firstName }) }}</div>
    </q-banner>

    <q-card v-if="!showSuccessBanner" class="auth-card" style="width: 100%; max-width: 500px">
      <q-card-section class="bg-primary text-white text-center">
        <div class="text-h5 text-weight-bold">{{ signupLabels.title }}</div>
        <div class="text-caption">{{ signupLabels.subtitle }}</div>
      </q-card-section>

      <q-card-section class="q-pt-lg">
        <q-form @submit.prevent="handleSignup" class="q-gutter-md">
          <!-- Error Message -->
          <q-banner v-if="signupError" class="bg-negative text-white rounded-borders q-mb-md">
            {{ signupError }}
          </q-banner>

          <!-- First Name Field -->
          <q-input
            v-model="form.firstName"
            filled
            :label="signupLabels.firstNameLabel"
            :error="!!firstNameError"
            :error-message="firstNameError"
            @blur="validateFirstNameField"
            class="text-body1"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <!-- Last Name Field -->
          <q-input
            v-model="form.lastName"
            filled
            :label="signupLabels.lastNameLabel"
            class="text-body1"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <!-- Email Field -->
          <q-input
            v-model="form.email"
            filled
            type="email"
            :label="signupLabels.emailLabel"
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
          <div>
            <q-input
              v-model="form.password"
              filled
              :type="showPassword ? 'text' : 'password'"
              :label="signupLabels.passwordLabel"
              :error="passwordErrors.length > 0"
              @blur="validatePasswordField"
              @input="validatePasswordField"
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
            <div v-if="form.password" class="password-requirements q-mt-sm">
              <div class="text-caption">{{ signupLabels.passwordRequirements }}</div>
              <ul class="q-pl-md q-my-xs">
                <li
                  class="text-caption"
                  :class="
                    form.password.length >= 8
                      ? 'text-positive'
                      : 'text-negative'
                  "
                >
                  {{ signupLabels.requirement1 }}
                </li>
                <li
                  class="text-caption"
                  :class="
                    /[A-Z]/.test(form.password) ? 'text-positive' : 'text-negative'
                  "
                >
                  {{ signupLabels.requirement2 }}
                </li>
                <li
                  class="text-caption"
                  :class="
                    /[a-z]/.test(form.password) ? 'text-positive' : 'text-negative'
                  "
                >
                  {{ signupLabels.requirement3 }}
                </li>
                <li
                  class="text-caption"
                  :class="
                    /[0-9]/.test(form.password) ? 'text-positive' : 'text-negative'
                  "
                >
                  {{ signupLabels.requirement4 }}
                </li>
                <li
                  class="text-caption"
                  :class="
                    /[!@#$%^&*]/.test(form.password)
                      ? 'text-positive'
                      : 'text-negative'
                  "
                >
                  {{ signupLabels.requirement5 }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Confirm Password Field -->
          <q-input
            v-model="form.confirmPassword"
            filled
            :type="showConfirmPassword ? 'text' : 'password'"
            :label="signupLabels.confirmPasswordLabel"
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

          <!-- Terms & Conditions Checkbox -->
          <q-checkbox
            v-model="form.agreeToTerms"
            class="text-caption"
          >
            <template v-slot:default>
              {{ signupLabels.termsPrefix }}
              <a :href="signupLinks.termsUrl" class="text-primary">{{ signupLabels.termsLabel }}</a>
            </template>
          </q-checkbox>

          <!-- Submit Button -->
          <q-btn
            unelevated
            rounded
            color="primary"
            :label="signupLabels.submitButton"
            type="submit"
            class="full-width text-weight-bold"
            size="lg"
            :loading="isLoading"
          />
        </q-form>

        <!-- Login Link -->
        <div class="text-center q-mt-md">
          <span class="text-caption">{{ signupLinks.loginText }}</span>
          <router-link
            :to="signupLinks.loginUrl"
            class="text-primary text-decoration-none text-weight-bold"
          >
            <span class="text-caption">{{ signupLinks.loginLink }}</span>
          </router-link>
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
import { validatePassword } from '../utils/validation'

const router = useRouter()
const authStore = useAuthStore()
const { labels: signupLabels, errors: signupErrors, links: signupLinks, getInterpolated } = useMessages('signup')

// Use auth form composable
const {
  showPassword,
  showConfirmPassword,
  emailError,
  passwordErrors,
  confirmPasswordError,
  firstNameError,
  validateFirstNameField: composableValidateFirstName,
  validateEmailField: composableValidateEmail,
  validateNewPasswordField,
  validateConfirmPasswordField: composableValidateConfirmPassword
} = useAuthForm()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false
})

const isLoading = ref(false)
const showSuccessBanner = ref(false)
const signupError = ref('')

const validateFirstNameField = () => {
  composableValidateFirstName(form.value.firstName)
}

const validateEmailField = () => {
  composableValidateEmail(form.value.email, (email) => {
    return authStore.users.some(u => u.email === email)
  })
}

const validatePasswordField = () => {
  const validation = validatePassword(form.value.password)
  passwordErrors.value = validation.errors
}

const validateConfirmPasswordField = () => {
  composableValidateConfirmPassword(form.value.password, form.value.confirmPassword)
}

const handleSignup = async () => {
  // Validate all fields
  validateFirstNameField()
  validateEmailField()
  validatePasswordField()
  validateConfirmPasswordField()

  if (
    firstNameError.value ||
    emailError.value ||
    passwordErrors.value.length > 0 ||
    confirmPasswordError.value ||
    !form.value.agreeToTerms
  ) {
    if (!form.value.agreeToTerms) {
      signupError.value = signupErrors.termsRequired
    }
    return
  }

  isLoading.value = true
  signupError.value = ''

  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const result = authStore.signup({
      email: form.value.email,
      password: form.value.password,
      firstName: form.value.firstName,
      lastName: form.value.lastName
    })

    if (result.success) {
      // Show success banner
      showSuccessBanner.value = true
      
      // Auto-login after signup
      authStore.login(form.value.email, form.value.password)
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push(signupLinks.dashboardUrl)
      }, 2000)
    } else {
      signupError.value = result.message || signupErrors.signupFailed
    }
  } catch (error) {
    signupError.value = signupErrors.unexpectedError
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped src="../styles/views/signup.scss" lang="scss"></style>
