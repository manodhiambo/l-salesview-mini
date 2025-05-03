<template>
  <div v-if="loading" class="flex justify-center items-center">
    <span>Loading Dashboard...</span>
  </div>
  <div v-else>
    <!-- Dashboard Content Here -->

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Example Metric Cards -->
      <L-MetricCard :data="salesData" title="Sales Performance" />
      <L-MetricCard :data="inventoryData" title="Inventory Status" />
      <L-MetricCard :data="topSellingData" title="Top 5 Selling Products" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import L-MetricCard from './L-MetricCard.vue'

const loading = ref(true)
const salesData = ref(null)
const inventoryData = ref(null)
const topSellingData = ref(null)

// Simulate cached data (example)
const cachedData = ref({
  sales: null,
  inventory: null,
  topSelling: null
})

const fetchData = async () => {
  // Check if data is cached
  if (!cachedData.value.sales) {
    // Simulate an API call to fetch sales data
    const salesResponse = await new Promise(resolve =>
      setTimeout(() => resolve([100, 200, 150, 300]), 1000)
    )
    salesData.value = salesResponse
    cachedData.value.sales = salesResponse
  }

  if (!cachedData.value.inventory) {
    // Simulate an API call to fetch inventory data
    const inventoryResponse = await new Promise(resolve =>
      setTimeout(() => resolve([200, 150, 50]), 1000)
    )
    inventoryData.value = inventoryResponse
    cachedData.value.inventory = inventoryResponse
  }

  if (!cachedData.value.topSelling) {
    // Simulate an API call to fetch top selling products
    const topSellingResponse = await new Promise(resolve =>
      setTimeout(() => resolve([10, 15, 7]), 1000)
    )
    topSellingData.value = topSellingResponse
    cachedData.value.topSelling = topSellingResponse
  }

  loading.value = false
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
</style>
