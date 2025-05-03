<template>
  <Card class="w-full">
    <CardHeader class="flex justify-between items-center">
      <div>
        <CardTitle>Top 5 Selling Products</CardTitle>
        <CardDescription>Sorted by sales volume</CardDescription>
      </div>
      <Button size="sm" variant="outline" @click="refreshData">
        <RefreshCw class="w-4 h-4 mr-1" /> Refresh
      </Button>
    </CardHeader>
    <CardContent>
      <div v-if="loading" class="flex justify-center items-center h-40">
        <Loader2 class="animate-spin w-6 h-6 text-gray-400" />
      </div>
      <div v-else class="h-64">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'
import Button from '@/components/ui/button.vue';
import Card from '@/components/ui/card.vue';
import CardHeader from '@/components/ui/CardHeader.vue';
import CardTitle from '@/components/ui/CardTitle.vue';
import CardDescription from '@/components/ui/CardDescription.vue';
import CardContent from '@/components/ui/CardContent.vue';
import { RefreshCw, Loader2 } from 'lucide-vue-next'

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const loading = ref(true)
const chartData = ref({})
const chartOptions = {
  indexAxis: 'y', // horizontal bars
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Units Sold',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Product Name',
      },
    },
  },
}

const fetchData = async () => {
  loading.value = true
  setTimeout(() => {
    chartData.value = {
      labels: ['Smartphone X', 'T-shirt Pro', 'Book: Vue Guide', 'Blender Max', 'Toy Robot'],
      datasets: [
        {
          label: 'Sales Volume',
          data: [150, 120, 110, 95, 80],
          backgroundColor: '#10B981',
        },
      ],
    }
    loading.value = false
  }, 1000)
}

const refreshData = () => {
  fetchData()
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
</style>
