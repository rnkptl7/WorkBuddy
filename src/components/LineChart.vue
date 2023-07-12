<template>
    <Line :data="data" :options="options" />
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js'


const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Your Tickets',
      backgroundColor: '#F993A2',
      borderColor: "#F993A2",
      data: [40, 39, 10, 40, 39, 80, 40],
      tension: 0.2,
      fill: "#F993A2",
      pointBackgroundColor: "#F96A65",
      pointHoverBorderWidth: "3"
    }
  ]
}

const options = {
  responsive: true
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
)
</script>