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
import { ref, computed, onMounted } from "vue";
import { useFirestore } from "vuefire";
import { doc, getDoc } from "firebase/firestore";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const userId = localStorage.getItem("userId");
const leftLeaves = ref("");
const takenLeaves = ref("");
const leaveRecord = ref([]);

onMounted(async () => {
    const db = useFirestore();
    const docSnap = await getDoc(doc(db, "users", userId));
    if (docSnap.exists()) {
        takenLeaves.value = docSnap.data()?.leavesDetails?.takenLeaves || 0;
        leaveRecord.value.push(takenLeaves.value);
        leftLeaves.value = docSnap.data()?.leavesDetails?.leftLeaves || 10;
        leaveRecord.value.push(leftLeaves.value);
    }
    console.log(Array.from(leaveRecord.value));
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
    height: 400px;
    width: 350px;
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
</style>
