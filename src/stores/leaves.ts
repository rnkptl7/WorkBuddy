import { defineStore } from "pinia";
import { useFirestore } from "vuefire";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ref } from "vue";
import moment from "moment";

// TODO: Move to reusable function
function formatDate(data) {
    const seconds = data.seconds;
    const nanoseconds = data.nanoseconds;
    const date = moment
        .unix(seconds)
        .add(nanoseconds / 1000000, "milliseconds");

    return date.format("DD/MM/YYYY");
}

export const useLeavesStore = defineStore("leaves", () => {
    const userId = ref("8myANlkdZmLQ3qccNAeE");
    const database = useFirestore();
    const leaves = ref([]);
    const leavesDates = ref([]);
    async function getLeaves() {
        const leaveHistoryList = await getDocs(
            query(
                collection(database, "leaves"),
                where("userId", "==", userId.value)
            )
        );
        leaves.value = [];
        leavesDates.value = [];
        leaveHistoryList.forEach((doc: any) => {
            let leaveItem = doc.data();
            leaveItem = {
                ...leaveItem,
                id: doc.id,
                startDate: formatDate(leaveItem.startDate),
                endDate: formatDate(leaveItem.endDate),
            };
            leavesDates.value.push({
                startDate: new Date(2023, 6, 16),
                endDate: new Date(2023, 6, 15),
            });
            leaves.value.push(leaveItem);
        });
    }
    return {
        leaves,
        leavesDates,
        userId,
        getLeaves,
    };
});
