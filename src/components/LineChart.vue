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
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Your Tickets',
      backgroundColor: '#F993A2',
      borderColor: "#F993A2",
      data: [0, 0, 8, 30, 10, 40, 39, 10, 40, 39, 70, 40],
      tension: 0.1,
      fill: "#F993A2",
      pointBackgroundColor: "#F96A65",
      pointHoverBorderWidth: "3"
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
        legend: {
            labels: {
                font: {
                    family: '"DM Sans", sans-serif',
                    size: 14,
                    weight: "500"
                }
            }
        }
    },
  scales: {
    x: {
      ticks: {
        font: {
          family: '"DM Sans", sans-serif',
          size: 14,
          weight: '500'
        }
      }
    },
    y: {
      ticks: {
        font: {
          family: '"DM Sans", sans-serif',
          size: 14,
          weight: '500'
        }
      }
    }
  }
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
)
</script>