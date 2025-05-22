<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <l-sidebar :collapsed="sidebarCollapsed" @toggle="toggleSidebar" />

    <div class="flex flex-col flex-1">
      <l-navbar @toggleTheme="toggleTheme" />
      <l-breadcrumb :items="breadcrumbItems" />

      <main class="flex-1 p-4 overflow-auto">
        <l-time-period-controls
          :selectedRange="selectedRange"
          :compare="compare"
          @updateRange="updateRange"
          @toggleCompare="toggleCompare"
        />

        <div class="flex justify-end mb-4">
          <l-refresh-button @click="refreshData" />
        </div>

        <!-- Show dashboard cards only on exact 'Dashboard' route -->
        <template v-if="$route.name === 'Dashboard'">
          <draggable
            v-model="dashboardCards"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            :options="{ animation: 200 }"
          >
            <template #item="{ element }">
              <component
                :is="element.component"
                :data="element.data"
                :loading="loading"
              />
            </template>
          </draggable>
        </template>

        <template v-else>
          <router-view />
        </template>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import draggable from 'vuedraggable'

// Components
import LNavbar from '@/components/L-Navbar.vue'
import LSidebar from '@/components/L-Sidebar.vue'
import LBreadcrumb from '@/components/L-Breadcrumb.vue'
import LTimePeriodControls from '@/components/L-TimePeriodControls.vue'
import LRefreshButton from '@/components/L-RefreshButton.vue'

import LMetricCard from '@/components/L-MetricCard.vue'
import LSalesChart from '@/components/L-SalesChart.vue'
import LInventoryChart from '@/components/L-InventoryChart.vue'
import LTopProductsChart from '@/components/L-TopProductsChart.vue'

// State and hooks
const route = useRoute()

const sidebarCollapsed = ref(false)
const selectedRange = ref('this_month')
const compare = ref(false)
const loading = ref(true)

const breadcrumbItems = ref([
  { text: 'Home', href: '/' },
  { text: 'Dashboard', href: '/dashboard' },
])

const dashboardCards = ref([])

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const toggleTheme = () => {
  document.documentElement.classList.toggle('dark')
}

const updateRange = (range) => {
  selectedRange.value = range
  fetchData()
}

const toggleCompare = () => {
  compare.value = !compare.value
  fetchData()
}

const refreshData = () => {
  fetchData()
}

const fetchData = async () => {
  loading.value = true

  // Simulate async data fetch
  setTimeout(() => {
    dashboardCards.value = [
      {
        id: 1,
        component: LMetricCard,
        data: { title: 'Total Sales', value: '$85,000', icon: '💰' },
      },
      {
        id: 2,
        component: LMetricCard,
        data: { title: 'Customers', value: '1,230', icon: '👥' },
      },
      {
        id: 3,
        component: LMetricCard,
        data: { title: 'Inventory Items', value: '520', icon: '📦' },
      },
      {
        id: 4,
        component: LSalesChart,
        data: { chartTitle: 'Sales Overview' },
      },
      {
        id: 5,
        component: LInventoryChart,
        data: { chartTitle: 'Stock Levels' },
      },
      {
        id: 6,
        component: LTopProductsChart,
        data: { chartTitle: 'Top Products' },
      },
    ]
    loading.value = false
  }, 1000)
}

onMounted(() => {
  fetchData()
})
</script>
