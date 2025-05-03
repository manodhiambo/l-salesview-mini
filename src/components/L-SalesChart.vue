<template>
  <Card class="w-full h-full">
    <CardContent>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold">Sales Performance</h2>
        <Button size="sm" @click="refreshData">
          <RefreshCw class="w-4 h-4 mr-1" /> Refresh
        </Button>
      </div>
      <div>
        <Line :data="chartData" :options="chartOptions" v-if="!loading" />
        <Skeleton v-else class="h-[300px] w-full" />
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';
import Button from '@/components/ui/button.vue';
import Card from '@/components/ui/card.vue';
import CardContent from '@/components/ui/CardContent.vue';
import { RefreshCw } from 'lucide-vue-next';
import Skeleton from '@/components/ui/skeleton.vue';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const chartData = ref(null);
const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: { display: true },
    title: { display: false }
  },
  scales: {
    x: { display: true },
    y: { display: true }
  }
});

const loading = ref(true);

const fetchData = async () => {
  loading.value = true;
  // Mock data fetch
  await new Promise(r => setTimeout(r, 1000));
  chartData.value = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Sales (KES)',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000)),
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };
  loading.value = false;
};

const refreshData = () => fetchData();

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
</style>
