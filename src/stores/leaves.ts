import { defineStore, storeToRefs } from "pinia";
import { useFirestore } from "vuefire";
import { Timestamp } from "firebase/firestore";
import { Ref, ref } from "vue";
import moment from "moment";
import { useAuthStore } from "./authStore";
import { leaves, leavesDates } from "@/types/leaves";
import {
    fetchAllPendingLeaves,
    fetchLeavesBalance,
    fetchLeavesByUsersId,
} from "../api/api";

function formatDate(data: Timestamp) {
    const seconds = data.seconds;
    const nanoseconds = data.nanoseconds;
    const date = moment
        .unix(seconds)
        .add(nanoseconds / 1000000, "milliseconds");
    return date;
}

export const useLeavesStore = defineStore("leaves", () => {
    const authStore = useAuthStore();
    const { isAdmin, userId } = storeToRefs(authStore);
    // Setting connection to firebase
    const database = useFirestore();

    const leaves: Ref<leaves[]> = ref([]); // For Users
    let leavesDates: Ref<leavesDates[]> = ref([]); // For VCalendar
    let allPendingLeaves: Ref<leaves[]> = ref([]);

    const leaveCountDetails = ref({
        TOTAL_LEAVES: 10,
        takenLeaves: 0,
        leftLeaves: 10,
    }); // Leaves count of Users

    async function getLeaves(): Promise<void> {
        const response = await fetchLeavesByUsersId(userId.value);
        // Emptying Containers to fetch updated changes
        leaves.value = [];
        leavesDates.value = [];

        // Mapping response and manipulating data for better representation
        if (response) {
            response.forEach((doc) => {
                let leaveItem = doc.data();

                // Data for VCalendar
                const leavesForCalendar = {
                    status: leaveItem.status,
                    start: formatDate(leaveItem.startDate)._d,
                    end: formatDate(leaveItem.endDate)._d,
                };
                leaveItem = {
                    ...leaveItem,
                    id: doc.id,
                    startDate: formatDate(leaveItem.startDate).format(
                        "DD-MM-YYYY"
                    ),
                    endDate: formatDate(leaveItem.endDate).format("DD-MM-YYYY"),
                };

                leavesDates.value.push(leavesForCalendar);
                leaves.value.push(leaveItem);
            });
        }
    }

    async function getAllPendingLeaves(): Promise<void> {
        const response = await fetchAllPendingLeaves();
        allPendingLeaves.value = [];
        if (response)
            response.forEach((doc: any) => {
                let leaveItem = doc.data();
                leaveItem = {
                    ...leaveItem,
                    id: doc.id,
                    startDate: formatDate(leaveItem.startDate).format(
                        "DD-MM-YYYY"
                    ),
                    endDate: formatDate(leaveItem.endDate).format("DD-MM-YYYY"),
                };

                // Data for VCalendar
                allPendingLeaves.value.push(leaveItem);
            });
    }

    async function getLeaveCounterDetails(): Promise<void> {
        const docSnap = await fetchLeavesBalance(userId.value);
        if (docSnap?.exists()) {
            leaveCountDetails.value = {
                TOTAL_LEAVES: docSnap.data().leavesDetails.TOTAL_LEAVES ?? 10,
                takenLeaves: docSnap.data().leavesDetails.takenLeaves ?? 0,
                leftLeaves: docSnap.data().leavesDetails.leftLeaves ?? 10,
            };
        }
    }

    return {
        leaves,
        leavesDates,
        leaveCountDetails,
        allPendingLeaves,
        userId,
        isAdmin,
        getLeaves,
        getAllPendingLeaves,
        getLeaveCounterDetails,
    };
});
