<template>
    <div
        class="leave-detail_card d-flex flex-column align-center rounded-lg my-2 pa-3"
    >
        <div class="d-flex flex-row w-100">
            <div class="ld-card_logo d-flex flex-column align-start">
                <h3>From</h3>
                <span>
                    {{ leave.startDate }}
                </span>
                <h3>To</h3>
                <span>
                    {{ leave.endDate }}
                </span>
            </div>

            <div class="ld-card-body d-flex flex-column mx-4 mb-5">
                <h3>{{ leave.leaveMessage }}</h3>
                <h5 class="mt-1" v-if="isAdmin">
                    Created By: {{ leave.createdBy }}
                </h5>
                <div class="ld-category d-flex flex-row my-3">
                    <span
                        class="border rounded-pill px-2 text-caption text-uppercase"
                        >{{ leave.leaveCategory }}</span
                    >
                </div>

                <div class="ld-card-body_description">
                    <p>{{ trmimedDescrition }}</p>
                </div>
            </div>
        </div>
        <div>
            <v-btn rounded color="blue" @click="dialog = true"
                >View Details</v-btn
            >

            <v-dialog v-model="dialog" persistent width="500">
                <v-card>
                    <div class="pa-5">
                        <div class="ld-card-body">
                            <div
                                class="d-flex flex-row justify-space-between align-center"
                            >
                                <div
                                    class="ld-category d-flex flex-row align-center"
                                >
                                    <h2>{{ leave.leaveMessage }}</h2>
                                    <span
                                        class="border rounded-pill px-2 text-caption text-uppercase mx-2"
                                        >{{ leave.leaveCategory }}</span
                                    >
                                </div>
                                <i
                                    class="fa fa-times"
                                    aria-hidden="true"
                                    @click="dialog = false"
                                ></i>
                            </div>

                            <div
                                class="ld-card_logo d-flex flex-row align-center"
                            >
                                <h3>From</h3>
                                <span>
                                    {{ leave.startDate }}
                                </span>
                                <h3>To</h3>
                                <span>
                                    {{ leave.endDate }}
                                </span>
                            </div>
                            <h5 v-if="isAdmin">
                                Created By: {{ leave.createdBy }}
                            </h5>
                            <div class="ld-modal-card-body_description">
                                <p>Description:- {{ leave.description }}</p>
                            </div>
                        </div>
                        <div class="d-flex flex-row-reverse" v-if="isAdmin">
                            <v-btn
                                rounded
                                color="green"
                                @click="adminActions({ action: 'approve' })"
                                class="ml-3"
                                >Approve</v-btn
                            >
                            <v-btn
                                rounded
                                color="red"
                                @click="adminActions({ action: 'reject' })"
                                >Reject</v-btn
                            >
                        </div>
                    </div>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import { doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useFirestore } from "vuefire";
import { useLeavesStore } from "../../stores/leaves";
import { useAuthStore } from "../../stores/authStore";
import { updateLeaveDetail, updateUserDetail } from "../../api/api";

const { leave, isAdmin } = defineProps(["leave", "isAdmin"]);
const dialog = ref(false);
const authStore = useAuthStore();
const leavesStore = useLeavesStore();
const { fullName } = storeToRefs(authStore);
const { userId, leaveCountDetails } = storeToRefs(leavesStore);

const logoDateString = computed(() => {
    const date = formatDate(leave.startDate);
    return {
        date: `${date[0]}`,
        month: `${date[1]}`,
        year: `${date[2]}`,
    };
});

// Helper function to convert timestamp to specified format
function formatDate(data) {
    const seconds = data.seconds;
    const nanoseconds = data.nanoseconds;
    const date = moment
        .unix(seconds)
        .add(nanoseconds / 1000000, "milliseconds");

    return date.format("Do MMM YYYY").split(" ");
}
const trmimedDescrition = computed(() => {
    return leave?.description?.slice(0, 50) + "...";
});

// Admin actions---------------
async function adminActions({ action }) {
    await updateLeaveDetail(leave.id, {
        status: action === "approve" ? "Approved" : "rejected",
        approvedBy: fullName.value,
    });
    // Updation of Leave Balance
    if (action == "reject") {
        await updateUserDetail(userId.value, {
            leavesDetails: {
                TOTAL_LEAVES: leaveCountDetails.value.TOTAL_LEAVES,
                takenLeaves:
                    leaveCountDetails.value.takenLeaves - leave.totalDays,
                leftLeaves:
                    leaveCountDetails.value.leftLeaves + leave.totalDays,
            },
        });
        leavesStore.leaveCountDetails = {
            TOTAL_LEAVES: leavesStore.leaveCountDetails.TOTAL_LEAVES,
            takenLeaves:
                leavesStore.leaveCountDetails.takenLeaves - leave.totalDays,
            leftLeaves:
                leavesStore.leaveCountDetails.leftLeaves + leave.totalDays,
        };
    }

    // Fetching again to make realtime user experience
    await leavesStore.getLeaves();
    await leavesStore.getAllPendingLeaves();
    dialog.value = false;
}
</script>

<style scoped>
.leave-detail_card {
    background-color: #f0f3fb;
    height: fit-content;
}
.ld-category > span {
    background-color: rgb(255, 240, 220);
    color: orangered;
}
p {
    word-break: break-all;
}
.ld-card_logo {
    min-width: fit-content;
}
.ld-card_logo h3,
.ld-card_logo span {
    margin-inline-end: 10px;
}
</style>
