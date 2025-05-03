<template>
  <div class="flex items-center space-x-4">
    <!-- Reset Layout Button -->
    <Button variant="outline" size="sm" @click="resetLayout" :disabled="loading">
      Reset Layout
    </Button>

    <!-- Drag and Drop Card Area -->
    <div class="w-full mt-4">
      <draggable
        v-model="cards"
        group="cards"
        animation="300"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        @end="onDragEnd"
      >
        <div v-for="(card, index) in cards" :key="index" class="flex justify-center">
          <L-MetricCard :title="card.title" :value="card.value" :icon="card.icon" />
        </div>
      </draggable>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from '@/components/ui/button.vue';
import L-MetricCard from './L-MetricCard.vue'
import draggable from 'vuedraggable' // Ensure to install 'vuedraggable'

const loading = ref(false)

// Cards data (can be fetched dynamically or passed as props)
const cards = ref([
  { title: 'Sales Today', value: '12,000', icon: '📊' },
  { title: 'Total Revenue', value: '500,000', icon: '💵' },
  { title: 'Orders This Week', value: '345', icon: '🛒' },
  { title: 'Inventory Value', value: '75,000', icon: '📦' },
])

const resetLayout = () => {
  loading.value = true
  // Reset to default card order
  cards.value = [
    { title: 'Sales Today', value: '12,000', icon: '📊' },
    { title: 'Total Revenue', value: '500,000', icon: '💵' },
    { title: 'Orders This Week', value: '345', icon: '🛒' },
    { title: 'Inventory Value', value: '75,000', icon: '📦' },
  ]
  loading.value = false
}

const onDragEnd = (event) => {
  console.log('Cards rearranged', event)
  // Optionally, save the new order (e.g., store in a database or localStorage)
}
</script>

<style scoped>
</style>
