import { defineStore, storeToRefs } from "pinia";
import { useFirestore } from "vuefire";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    Timestamp,
    where,
} from "firebase/firestore";
import { ref } from "vue";
import moment from "moment";
import { useAuthStore } from "./authStore";

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

    const leaves = ref([]); // For Users
    let leavesDates = ref([]); // For VCalendar
    let allPendingLeaves = ref([]);
    // TODO: Make this dynamic from userProfileStore
    const leaveCountDetails = ref({
        TOTAL_LEAVES: 10,
        takenLeaves: 4,
        leftLeaves: 6,
    }); // Leaves count of Users

    async function getLeaves() {
        // It will fetch leaves Collection from firebase with specified Parameter
        const response = await getDocs(
            query(
                collection(database, "leaves"),
                where("userId", "==", userId.value)
            )
        );
        // Emptying Containers to fetch updated changes
        leaves.value = [];
        leavesDates.value = [];

        // Mapping response and manipulating data for better representation
        response.forEach((doc: any) => {
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
                startDate: formatDate(leaveItem.startDate).format("DD-MM-YYYY"),
                endDate: formatDate(leaveItem.endDate).format("DD-MM-YYYY"),
            };

            leavesDates.value.push(leavesForCalendar);
            leaves.value.push(leaveItem);
        });
        console.log(leaveCountDetails.value.TOTAL_LEAVES);
    }

    async function getAllPendingLeaves() {
        const response = await getDocs(
            query(
                collection(database, "leaves"),
                where("status", "==", "pending")
            )
        );
        allPendingLeaves.value = [];

        response.forEach((doc: any) => {
            let leaveItem = doc.data();
            leaveItem = {
                ...leaveItem,
                id: doc.id,
                startDate: formatDate(leaveItem.startDate).format("DD-MM-YYYY"),
                endDate: formatDate(leaveItem.endDate).format("DD-MM-YYYY"),
            };

            // Data for VCalendar
            allPendingLeaves.value.push(leaveItem);
        });
    }

    async function getLeaveCounterDetails() {
        const db = useFirestore();
        const docSnap = await getDoc(doc(db, "users", userId.value));
        if (docSnap.exists()) {
            leaveCountDetails.value = {
                TOTAL_LEAVES: docSnap.data()?.leavesDetails?.TOTAL_LEAVES ?? 10,
                takenLeaves: docSnap.data()?.leavesDetails?.takenLeaves ?? 0,
                leftLeaves: docSnap.data()?.leavesDetails?.leftLeaves ?? 10,
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
