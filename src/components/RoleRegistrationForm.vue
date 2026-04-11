<template>
  <q-card style="min-width: 400px">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">{{ roleLabels.formTitle }}</div>
      <q-space />
      <q-btn icon="close" flat round dense @click="$emit('close')" />
    </q-card-section>

    <q-separator />

    <q-linear-progress :value="0.5" color="primary" />

    <q-card-section>
      <q-form @submit="$emit('submit', formData)">
        <q-input
          v-model="formData.companyName"
          :label="roleLabels.companyNameLabel"
          required
          class="q-mb-md"
        />

        <q-input
          v-model="formData.jobTitle"
          :label="roleLabels.jobTitleLabel"
          required
          class="q-mb-md"
        />

        <q-input
          v-model="formData.department"
          :label="roleLabels.departmentLabel"
          required
          class="q-mb-md"
        />

        <q-input
          v-model="formData.salary"
          :label="roleLabels.salaryLabel"
          type="number"
          required
          class="q-mb-md"
        />

        <q-input
          v-model="formData.startDate"
          :label="roleLabels.startDateLabel"
          type="date"
          required
          class="q-mb-md"
        />

        <q-input
          v-model="formData.description"
          :label="roleLabels.descriptionLabel"
          type="textarea"
          class="q-mb-md"
        />

        <div class="row q-gutter-md">
          <q-btn
            flat
            :label="roleLabels.cancelButton"
            @click="$emit('close')"
            class="col"
          />
          <q-btn
            type="submit"
            :label="roleLabels.reviewButton"
            color="primary"
            class="col"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { EMPTY_ROLE_FORM_DATA } from '../constants/index'
import { useMessages } from '../composables/useMessages'

const { labels: roleLabels } = useMessages('roleRegistration')

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['close', 'submit'])

const formData = ref({
  companyName: props.formData?.companyName || '',
  jobTitle: props.formData?.jobTitle || '',
  department: props.formData?.department || '',
  salary: props.formData?.salary || '',
  startDate: props.formData?.startDate || '',
  description: props.formData?.description || ''
})

watch(() => props.formData, (newVal) => {
  if (newVal) {
    formData.value = { ...newVal }
  }
}, { deep: true })
</script>