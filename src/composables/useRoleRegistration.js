import { ref, computed } from 'vue'
import { useRoleRegistryStore } from '../stores/roleRegistry'
import { EMPTY_ROLE_FORM_DATA, ROLE_REGISTRATION_STEPS } from '../constants/index'
import RoleRegistrationForm from '../components/RoleRegistrationForm.vue'
import RoleRegistrationReview from '../components/RoleRegistrationReview.vue'

export function useRoleRegistration() {
  const roleStore = useRoleRegistryStore()

  const showRoleDialog = ref(false)
  const selectedUser = ref(null)
  const roleStep = ref(ROLE_REGISTRATION_STEPS.FORM)
  const roleFormData = ref({ ...EMPTY_ROLE_FORM_DATA })

  const currentRoleComponent = computed(() => {
    return roleStep.value === ROLE_REGISTRATION_STEPS.FORM
      ? RoleRegistrationForm
      : RoleRegistrationReview
  })

  const openRoleRegistration = (user) => {
    selectedUser.value = user
    roleStep.value = ROLE_REGISTRATION_STEPS.FORM
    roleFormData.value = { ...EMPTY_ROLE_FORM_DATA }
    showRoleDialog.value = true
  }

  const closeRoleDialog = () => {
    showRoleDialog.value = false
    selectedUser.value = null
    roleStep.value = ROLE_REGISTRATION_STEPS.FORM
  }

  const goBackToForm = () => {
    roleStep.value = ROLE_REGISTRATION_STEPS.FORM
  }

  const handleRoleStepSubmit = (data) => {
    if (roleStep.value === ROLE_REGISTRATION_STEPS.FORM) {
      if (data) {
        roleFormData.value = { ...data }
      }
      roleStep.value = ROLE_REGISTRATION_STEPS.REVIEW
    } else if (roleStep.value === ROLE_REGISTRATION_STEPS.REVIEW) {
      roleStore.addRegistration({
        userId: selectedUser.value.id,
        ...roleFormData.value
      })
      closeRoleDialog()
    }
  }

  return {
    showRoleDialog,
    selectedUser,
    roleStep,
    roleFormData,
    currentRoleComponent,
    openRoleRegistration,
    closeRoleDialog,
    goBackToForm,
    handleRoleStepSubmit
  }
}