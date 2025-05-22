// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Base views
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import PasswordResetView from '../views/PasswordResetView.vue'

// Feature entry components
import OrderSummary from '../components/sales/OrderSummary.vue'
import InventoryDataTable from '../components/inventory/InventoryDataTable.vue'
import CustomerMapView from '../components/customers/CustomerMapView.vue'

// ROUTES
const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/reset',
    name: 'Reset',
    component: PasswordResetView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'sales',
        name: 'Sales',
        component: OrderSummary,
        meta: { requiresAuth: true }
      },
      {
        path: 'inventory',
        name: 'Inventory',
        component: InventoryDataTable,
        meta: { requiresAuth: true }
      },
      {
        path: 'customers',
        name: 'Customers',
        component: CustomerMapView,
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ✅ Auth Navigation Guard
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
