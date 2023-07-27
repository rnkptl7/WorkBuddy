<template>
    <Line :data="chartData" :options="options" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Line } from "vue-chartjs";
import { storeToRefs } from "pinia";
import { useTicketStore } from "@/stores/ticketStore";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from "chart.js";

const { fetchByMonths } = useTicketStore();
const { ticketsByMonth } = storeToRefs(useTicketStore());

async function fetchData(): Promise<void> {
    await fetchByMonths();
}
fetchData();

const chartData = computed(() => {
    return {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        datasets: [
            {
                label: "Total Tickets",
                backgroundColor: "#F993A2",
                borderColor: "#F993A2",
                data: Array.from(ticketsByMonth.value),
                tension: 0.1,
                fill: "#F993A2",
                pointBackgroundColor: "#F96A65",
                pointHoverBorderWidth: "3",
            },
        ],
    };
});

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                font: {
                    family: '"DM Sans", sans-serif',
                    size: 14,
                    weight: "500",
                },
            },
        },
        tooltip: {
            titleFont: {
                size: 15,
                family: '"DM Sans", sans-serif',
            },
            bodyFont: {
                size: 14,
                family: '"DM Sans", sans-serif',
            },
        },
    },
    scales: {
        x: {
            ticks: {
                font: {
                    family: '"DM Sans", sans-serif',
                    size: 14,
                    weight: "500",
                },
            },
        },
        y: {
            ticks: {
                font: {
                    family: '"DM Sans", sans-serif',
                    size: 14,
                    weight: "500",
                },
            },
        },
    },
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);
</script>
