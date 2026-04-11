<template>
  <q-page class="q-pa-md">
    <q-form @submit="saveUser">
      <q-input
        v-model="user.name"
        :label="userFormLabels.nameLabel"
        required
      />
      <q-input
        v-model="user.email"
        :label="userFormLabels.emailLabel"
        type="email"
        required
      />
      <q-input
        v-model="user.address"
        :label="userFormLabels.addressLabel"
        required
      />
      <q-input
        v-model="user.phone"
        :label="userFormLabels.phoneLabel"
        required
      />
      <q-btn
        type="submit"
        color="primary"
        :label="userFormLabels.saveButton"
        :loading="loading"
      />
      <q-btn
        flat
        :label="userFormLabels.cancelButton"
        @click="$router.push(userFormLinks.cancelUrl)"
      />
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter, useRoute } from 'vue-router'
import { useMessages } from '../composables/useMessages'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const { labels: userFormLabels, errors: userFormErrors, links: userFormLinks } = useMessages('userForm')

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
  router.push(userFormLinks.cancelUrl)
}
</script>