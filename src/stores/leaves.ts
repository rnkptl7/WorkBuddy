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
    // console.log(date._d, "");
    return date;
}

export const useLeavesStore = defineStore("leaves", () => {
    const userId = ref("8myANlkdZmLQ3qccNAeE");
    const database = useFirestore();
    const leaves = ref([]);
    let leavesDates = ref([]);
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
            const leavesForCalendar = {
                status: leaveItem.status,
                start: formatDate(leaveItem.startDate)._d,
                end: formatDate(leaveItem.endDate)._d,
            };
            leaveItem = {
                ...leaveItem,
                id: doc.id,
                startDate: formatDate(leaveItem.startDate).format("DD-MM-YYYY"),
                endDate: formatDate(leaveItem.endDate).format("DD-MM-YYYY"),
            };
            // console.log(leavesForCalendar, "====inside store====");

            leavesDates.value.push(leavesForCalendar);
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
