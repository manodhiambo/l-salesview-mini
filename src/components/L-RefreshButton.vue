<template>
  <div class="flex items-center space-x-4">
    <!-- Refresh Button -->
    <Button variant="outline" size="sm" @click="refreshData" :disabled="loading">
      <span v-if="loading">Refreshing...</span>
      <span v-else>Refresh Data</span>
    </Button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from '@/components/ui/button.vue';

const loading = ref(false)

const refreshData = async () => {
  loading.value = true
  // Simulate a network request or data fetch (e.g., an API call)
  setTimeout(() => {
    console.log('Data refreshed') // Replace with actual data-fetching logic
    loading.value = false
  }, 2000) // Simulating a 2-second delay for the refresh
}
</script>

<style scoped>
</style>
