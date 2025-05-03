<template>
  <Card class="w-full h-full">
    <CardHeader class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <PackageCheck class="text-primary" />
        <CardTitle>Inventory Status</CardTitle>
      </div>
      <Button variant="outline" size="sm" @click="fetchInventoryData">
        <RefreshCcw class="w-4 h-4 mr-1" /> Refresh
      </Button>
    </CardHeader>

    <CardContent v-if="!loading">
      <Bar
        :data="chartData"
        :options="chartOptions"
        @click="handleChartClick"
        class="w-full h-[300px]"
      />
    </CardContent>

    <CardContent v-else>
      <div class="h-[300px] flex items-center justify-center">
        <Loader2 class="animate-spin h-6 w-6 text-muted-foreground" />
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { RefreshCcw, Loader2, PackageCheck } from 'lucide-vue-next'
import CardContent from '@/components/ui/CardContent.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import Card from '@/components/ui/card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import Button from '@/components/ui/button.vue';

// ✅ Import the correct component from vue-chartjs
import { Bar } from 'vue-chartjs'

// ✅ Import and register necessary Chart.js components
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const loading = ref(true)
const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Stock Count',
      backgroundColor: '#4f46e5',
      borderRadius: 6,
      data: []
    }
  ]
})

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { mode: 'index', intersect: false }
  },
  onClick: (_, elements) => {
    if (elements.length > 0) {
      handleChartClick()
    }
  }
})

const fetchInventoryData = async () => {
  loading.value = true
  setTimeout(() => {
    chartData.value.labels = ['Laptops', 'Phones', 'Accessories', 'Monitors', 'Printers']
    chartData.value.datasets[0].data = [120, 90, 150, 60, 40]
    loading.value = false
  }, 1000) // Simulated API call
}

const router = useRouter()
const handleChartClick = () => {
  router.push('/inventory')
}

onMounted(() => {
  fetchInventoryData()
})
</script>
