import { createRouter, createWebHistory } from 'vue-router'
import UserList from '../views/UserList.vue'
import UserForm from '../views/UserForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/create',
      name: 'UserCreate',
      component: UserForm
    },
    {
      path: '/edit/:id',
      name: 'UserEdit',
      component: UserForm
    }
  ],
})

export default router
