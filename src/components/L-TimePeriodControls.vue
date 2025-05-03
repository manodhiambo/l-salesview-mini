<template>
  <div class="flex items-center space-x-4">
    <!-- Date Range Picker -->
    <DatePicker
      v-model="dateRange"
      placeholder="Select date range"
      class="w-56"
      :disabled="loading"
      @change="onDateRangeChange"
    />

    <!-- Quick Select Buttons -->
    <div class="flex space-x-2">
      <Button size="sm" variant="outline" @click="quickSelect('today')">Today</Button>
      <Button size="sm" variant="outline" @click="quickSelect('week')">This Week</Button>
      <Button size="sm" variant="outline" @click="quickSelect('month')">This Month</Button>
      <Button size="sm" variant="outline" @click="quickSelect('quarter')">This Quarter</Button>
      <Button size="sm" variant="outline" @click="quickSelect('year')">This Year</Button>
    </div>

    <!-- Comparison Toggle -->
    <div class="flex items-center space-x-2">
      <label for="compare" class="text-sm">Compare Periods</label>
      <input type="checkbox" id="compare" v-model="comparePeriods" @change="onComparisonChange" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from '@/components/ui/button.vue';
import DatePicker from 'vue3-datepicker'

const loading = ref(false)
const dateRange = ref(null)
const comparePeriods = ref(false)

const onDateRangeChange = (value) => {
  console.log('Selected Date Range: ', value)
  // Update logic to reflect date range changes
}

const quickSelect = (period) => {
  loading.value = true
  const today = new Date()
  let startDate, endDate

  switch (period) {
    case 'today':
      startDate = new Date(today)
      endDate = new Date(today)
      break
    case 'week':
      startDate = new Date(today)
      startDate.setDate(today.getDate() - today.getDay())
      endDate = new Date(today)
      break
    case 'month':
      startDate = new Date(today.getFullYear(), today.getMonth(), 1)
      endDate = new Date(today)
      break
    case 'quarter':
      const quarterStartMonth = Math.floor(today.getMonth() / 3) * 3
      startDate = new Date(today.getFullYear(), quarterStartMonth, 1)
      endDate = new Date(today)
      break
    case 'year':
      startDate = new Date(today.getFullYear(), 0, 1)
      endDate = new Date(today)
      break
    default:
      return
  }

  dateRange.value = [startDate, endDate]
  loading.value = false
  // Trigger updates like fetching new chart data
}

const onComparisonChange = () => {
  console.log('Comparison Mode: ', comparePeriods.value)
  // Toggle logic for period comparison
}
</script>

