<template>
    <Doughnut :data="data" :options="options" />
</template>
    
<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

const data = {
    labels: ['Hardware', 'Software', "Ontime", "HR"],
    datasets: [
    {
        backgroundColor: ['#00A9D7', '#1CD0BB', '#F993A2', '#FFA400'],
        data: [40, 30, 20, 15]
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
                },
                padding: 20
            }
        }
    }
}

</script>
    