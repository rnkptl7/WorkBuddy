<template>
    <Doughnut :data="chartData" :options="options" />
</template>
    
<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia';
import { useTicketStore } from '@/stores/ticketStore';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend);

const { fetchByCategory } = useTicketStore();
const { ticketsByCategory } = storeToRefs(useTicketStore());

async function fetchData(): Promise<void> {
    await fetchByCategory();
}
fetchData();

const chartData = computed(() => {
    return {
            labels: ['Hardware', 'Software', "Ontime", "HR"],
            datasets: [
            {
                backgroundColor: ['#00A9D7', '#1CD0BB', '#F993A2', '#FFA400'],
                data: Array.from(ticketsByCategory.value)
            }
        ]
    }
})

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
        },
        tooltip: {
            titleFont: {
                size: 15,
                family: '"DM Sans", sans-serif'
            },
            bodyFont: {
                size: 14,
                family: '"DM Sans", sans-serif'
            }
        }
    }
}

</script>
    