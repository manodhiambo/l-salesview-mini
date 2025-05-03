// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import PasswordResetView from '../views/PasswordResetView.vue'

// ROUTES
const routes = [
  { path: '/', name: 'Login', component: LoginView },
  { path: '/reset', name: 'Reset', component: PasswordResetView },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ✅ Moved inside after Pinia is mounted
router.beforeEach(async (to, from, next) => {
  const { useAuthStore } = await import('../store/auth')
  const auth = useAuthStore()

  auth.checkAuth()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
