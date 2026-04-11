<template>
  <q-card style="min-width: 400px">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">Register User for Role - Step 2</div>
      <q-space />
      <q-btn icon="close" flat round dense @click="$emit('close')" />
    </q-card-section>

    <q-separator />

    <q-linear-progress :value="1" color="positive" />

    <q-card-section>
      <div class="q-mb-md">
        <div class="text-subtitle2">Confirm Registration Details</div>
      </div>

      <div class="q-mb-lg">
        <div class="row q-mb-md">
          <div class="col-5"><strong>User Name:</strong></div>
          <div class="col-7">{{ userName }}</div>
        </div>
        <div class="row q-mb-md">
          <div class="col-5"><strong>Email:</strong></div>
          <div class="col-7">{{ userEmail }}</div>
        </div>
        <q-separator class="q-my-md" />
        <div class="row q-mb-md">
          <div class="col-5"><strong>Company:</strong></div>
          <div class="col-7">{{ formData.companyName }}</div>
        </div>
        <div class="row q-mb-md">
          <div class="col-5"><strong>Job Title:</strong></div>
          <div class="col-7">{{ formData.jobTitle }}</div>
        </div>
        <div class="row q-mb-md">
          <div class="col-5"><strong>Department:</strong></div>
          <div class="col-7">{{ formData.department }}</div>
        </div>
        <div class="row q-mb-md">
          <div class="col-5"><strong>Salary:</strong></div>
          <div class="col-7">{{ formData.salary }}</div>
        </div>
        <div class="row q-mb-md">
          <div class="col-5"><strong>Start Date:</strong></div>
          <div class="col-7">{{ formData.startDate }}</div>
        </div>
        <div class="row q-mb-md">
          <div class="col-5"><strong>Description:</strong></div>
          <div class="col-7">{{ formData.description }}</div>
        </div>
      </div>

      <div class="row q-gutter-md">
        <q-btn
          flat
          label="Back"
          @click="$emit('back')"
          class="col"
        />
        <q-btn
          label="Submit"
          color="positive"
          @click="$emit('submit')"
          class="col"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  formData: {
    type: Object,
    required: true
  }
})

defineEmits(['close', 'back', 'submit'])
</script>