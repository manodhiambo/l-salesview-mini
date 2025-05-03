<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Sidebar -->
    <L-Sidebar :collapsed="sidebarCollapsed" @toggle="toggleSidebar" />

    <div class="flex flex-col flex-1">
      <!-- Navbar -->
      <L-Navbar @toggleTheme="toggleTheme" />

      <!-- Breadcrumb -->
      <L-Breadcrumb :items="breadcrumbItems" />

      <!-- Main Content -->
      <main class="flex-1 p-4 overflow-auto">
        <!-- Time Period Controls -->
        <L-TimePeriodControls
          :selectedRange="selectedRange"
          :compare="compare"
          @updateRange="updateRange"
          @toggleCompare="toggleCompare"
        />

        <!-- Refresh Button -->
        <div class="flex justify-end mb-4">
          <L-RefreshButton @click="refreshData" />
        </div>

        <!-- Dashboard Cards -->
        <draggable v-model="dashboardCards" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" :options="{ animation: 200 }">
          <template #item="{ element }">
            <component :is="element.component" :data="element.data" :loading="loading" />
          </template>
        </draggable>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import draggable from 'vuedraggable';

// Components
import LNavbar from '@/components/L-Navbar.vue';
import LSidebar from '@/components/L-Sidebar.vue';
import LBreadcrumb from '@/components/L-Breadcrumb.vue';
import LTimePeriodControls from '@/components/L-TimePeriodControls.vue';
import LRefreshButton from '@/components/L-RefreshButton.vue';
import LMetricCard from '@/components/L-MetricCard.vue';
import LSalesChart from '@/components/L-SalesChart.vue';
import LInventoryChart from '@/components/L-InventoryChart.vue';
import LTopProductsChart from '@/components/L-TopProductsChart.vue';

// State
const sidebarCollapsed = ref(false);
const selectedRange = ref('this_month');
const compare = ref(false);
const loading = ref(true);

// Breadcrumb items
const breadcrumbItems = ref([
  { text: 'Home', href: '/' },
  { text: 'Dashboard', href: '/dashboard' },
]);

// Dashboard cards
const dashboardCards = ref([
  { id: 1, component: LMetricCard, data: { title: 'Total Sales', value: '$50,000' } },
  { id: 2, component: LSalesChart, data: {} },
  { id: 3, component: LInventoryChart, data: {} },
  { id: 4, component: LTopProductsChart, data: {} },
]);

// Methods
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

const toggleTheme = () => {
  document.documentElement.classList.toggle('dark');
};

const updateRange = (range) => {
  selectedRange.value = range;
  fetchData();
};

const toggleCompare = () => {
  compare.value = !compare.value;
  fetchData();
};

const refreshData = () => {
  fetchData();
};

const fetchData = async () => {
  loading.value = true;
  // Simulate data fetching
  setTimeout(() => {
    loading.value = false;
    // Update dashboardCards data here
  }, 1000);
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* Add any additional styles here */
</style>

