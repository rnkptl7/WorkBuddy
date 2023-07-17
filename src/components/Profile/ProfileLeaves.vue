<template>
    <main class="doughnut-wrapper">
        <Doughnut :data="chartData" :options="options" />
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
        takenLeaves.value = docSnap.data()?.leavesDetails?.takenLeaves || "";
        leaveRecord.value.push(takenLeaves.value);
        leftLeaves.value = docSnap.data()?.leavesDetails?.leftLeaves || "";
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

@media screen and (max-width: 1250px) {
    .doughnut-wrapper {
        display: flex;
        margin: auto;
    }
}
</style>
