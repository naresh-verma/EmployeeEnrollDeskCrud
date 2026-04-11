<template>
  <q-page class="q-pa-md">
    <q-form @submit="saveUser">
      <q-input
        v-model="user.name"
        label="Name"
        required
      />
      <q-input
        v-model="user.email"
        label="Email"
        type="email"
        required
      />
      <q-input
        v-model="user.address"
        label="Address"
        required
      />
      <q-input
        v-model="user.phone"
        label="Phone"
        required
      />
      <q-btn
        type="submit"
        color="primary"
        label="Save"
        :loading="loading"
      />
      <q-btn
        flat
        label="Cancel"
        @click="$router.push('/')"
      />
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter, useRoute } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const user = ref({
  name: '',
  email: '',
  address: '',
  phone: ''
})

const loading = ref(false)
const isEdit = ref(false)

onMounted(() => {
  const id = route.params.id
  if (id) {
    isEdit.value = true
    const existingUser = userStore.getUser(Number(id))
    if (existingUser) {
      user.value = { ...existingUser }
    }
  }
})

const saveUser = () => {
  loading.value = true
  if (isEdit.value) {
    userStore.updateUser(Number(route.params.id), user.value)
  } else {
    userStore.addUser(user.value)
  }
  loading.value = false
  router.push('/')
}
</script>