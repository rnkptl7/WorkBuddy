import { defineStore, storeToRefs } from "pinia";
import { Ref, ref } from "vue";
import { useAuthStore } from "./authStore";
import { leaves, leavesDates, leaveCounterDetails } from "@/types/leaves";
import {
    fetchAllPendingLeaves,
    fetchLeavesBalance,
    fetchLeavesByUsersId,
} from "../api/api";
import formatDate from "../helper/dateFormater";

export const useLeavesStore = defineStore("leaves", () => {
    const authStore = useAuthStore();
    const { isAdmin, userId } = storeToRefs(authStore);

    /**
     * leaves: To display User's leaves;
     * leavesDates: To represent in VCalendar;
     * allPendingLeaves: For admin users only;
     * leaveCountDetails: To track available leave balance;
     */
    const leaves: Ref<leaves[]> = ref([]);
    const leavesDates: Ref<leavesDates[]> = ref([]);
    const allPendingLeaves: Ref<leaves[]> = ref([]);
    const leaveCountDetails: Ref<leaveCounterDetails> = ref({
        TOTAL_LEAVES: 10,
        takenLeaves: 0,
        leftLeaves: 10,
    });

    async function getLeaves(): Promise<void> {
        const response = await fetchLeavesByUsersId(userId.value as string);
        leaves.value = [];
        leavesDates.value = [];

        if (response) {
            response.forEach((doc) => {
                let leaveItem = doc.data();

                // Data for VCalendar
                const leavesForCalendar = {
                    status: leaveItem.status,
                    start: formatDate(leaveItem.startDate),
                    end: formatDate(leaveItem.endDate),
                };
                leaveItem = {
                    ...leaveItem,
                    id: doc.id,
                    startDate: formatDate(leaveItem.startDate, "DD-MM-YYYY"),
                    endDate: formatDate(leaveItem.endDate, "DD-MM-YYYY"),
                };

                leavesDates.value.push(leavesForCalendar);
                leaves.value.push(leaveItem as leaves);
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
                    startDate: formatDate(leaveItem.startDate, "DD-MM-YYYY"),
                    endDate: formatDate(leaveItem.endDate, "DD-MM-YYYY"),
                };
                allPendingLeaves.value.push(leaveItem);
            });
    }

    async function getLeaveCounterDetails(): Promise<void> {
        const docSnap = await fetchLeavesBalance(userId.value as string);
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
