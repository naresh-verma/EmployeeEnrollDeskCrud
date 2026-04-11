import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Home from '../views/Home.vue'
import UserList from '../views/UserList.vue'
import UserForm from '../views/UserForm.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import ForgotPassword from '../views/ForgotPassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta: { requiresAuth: false }
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: { requiresAuth: false }
    },
    {
      path: '/list',
      name: 'UserList',
      component: UserList,
      meta: { requiresAuth: true }
    },
    {
      path: '/create',
      name: 'UserCreate',
      component: UserForm,
      meta: { requiresAuth: true }
    },
    {
      path: '/edit/:id',
      name: 'UserEdit',
      component: UserForm,
      meta: { requiresAuth: true }
    }
  ],
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !authStore.isAuthenticated) {
    // Redirect to home if trying to access protected route without auth
    next({
      name: 'Home',
      query: { redirect: to.fullPath }
    })
  } else if ((to.name === 'Login' || to.name === 'Signup' || to.name === 'ForgotPassword') && authStore.isAuthenticated) {
    // Redirect to list if already authenticated and trying to access auth pages
    next('/list')
  } else {
    next()
  }
})

export default router
