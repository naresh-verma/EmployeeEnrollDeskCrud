<template>
  <keep-alive>
    <component
      :is="currentComponent"
      :key="step"
      :user-name="userName"
      :user-email="userEmail"
      :form-data="formData"
      @close="$emit('close')"
      @submit="handleStepSubmit"
      @back="step = 'form'"
    />
  </keep-alive>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoleRegistryStore } from '../stores/roleRegistry'
import RoleRegistrationForm from './RoleRegistrationForm.vue'
import RoleRegistrationReview from './RoleRegistrationReview.vue'

const props = defineProps({
  userId: {
    type: Number,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close', 'submitted'])

const roleStore = useRoleRegistryStore()

const step = ref('form')
const formData = ref({
  companyName: '',
  jobTitle: '',
  department: '',
  salary: '',
  startDate: '',
  description: ''
})

const currentComponent = computed(() => {
  return step.value === 'form' ? RoleRegistrationForm : RoleRegistrationReview
})

const handleStepSubmit = (data) => {
  if (step.value === 'form') {
    formData.value = data
    step.value = 'review'
  } else if (step.value === 'review') {
    roleStore.addRegistration({
      userId: props.userId,
      ...formData.value
    })
    emit('submitted')
  }
}
</script>