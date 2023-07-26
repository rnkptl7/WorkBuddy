<template>
    <main class="doughnut-container rounded pa-5">
        <div class="chart-title">
            <p class="text-center font-weight-bold text-h6">Leaves Record</p>
            <v-divider class="mt-2"></v-divider>
        </div>
        <div class="doughnut-wrapper">
            <Doughnut :data="chartData" :options="options" />
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref, Ref, computed, onMounted } from "vue";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getUserDetail } from "../../api/api";
ChartJS.register(ArcElement, Tooltip, Legend);

const leftLeaves: Ref<number> = ref();
const takenLeaves: Ref<number> = ref();
const leaveRecord: Ref<number[]> = ref([]);

onMounted(async () => {
    const userId = localStorage.getItem("userId");
    const docSnap = await getUserDetail(userId);
    takenLeaves.value = docSnap.data()?.leavesDetails?.takenLeaves ?? 0;
    leaveRecord.value.push(takenLeaves.value);
    leftLeaves.value = docSnap.data()?.leavesDetails?.leftLeaves ?? 10;
    leaveRecord.value.push(leftLeaves.value);
});

const chartData = computed(() => {
    return {
        labels: ["LeavesTaken", "LeavesLeft"],
        datasets: [
            {
                backgroundColor: ["#F993A2", "#00A9D7"],
                data: Array.from(leaveRecord.value),
            },
        ],
    };
});

const options = {
    responsive: true,
    plugins: {
        legend: {
            labels: {
                font: {
                    family: '"DM Sans", sans-serif',
                    size: 14,
                    weight: "500",
                },
                padding: 20,
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
};
</script>

<style scoped>
.doughnut-wrapper {
    display: flex;
    height: 350px;
    width: 350px;
}
.doughnut-container {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    width: 400px;
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.15);
}
.chart-title {
    color: var(--primary-color);
}
@media screen and (max-width: 1250px) {
    .doughnut-container {
        display: flex;
        margin: auto;
    }
}
@media screen and (max-width: 450px) {
    .doughnut-wrapper {
        display: flex;
        height: 320px;
        width: 320px;
    }
    .doughnut-container {
        width: 350px;
    }
}
</style>
