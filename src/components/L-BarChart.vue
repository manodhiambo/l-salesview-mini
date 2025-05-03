<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <canvas ref="barChart"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart } from 'chart.js'

const barChart = ref(null)
const chartData = {
  labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
  datasets: [
    {
      label: 'Sales Volume',
      data: [120, 150, 80, 200, 130],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }
  ]
}

onMounted(() => {
  const ctx = barChart.value.getContext('2d')
  new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
      scales: {
        x: {
          beginAtZero: true
        }
      }
    }
  })
})
</script>

<style scoped>
canvas {
  width: 100%;
  height: 300px;
}
</style>

