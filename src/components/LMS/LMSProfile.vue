<template>
    <ApplyLeaveModal
        :dialog="openRequestLeaveDialog"
        @closeLeaveRequestModal="
            openRequestLeaveDialog = !openRequestLeaveDialog
        "
    />
    <section class="LMS-wrapper d-flex flex-column pa-3">
        <!-- Request Leave button -->
        <div class="LMS-button_container d-flex flex-row-reverse">
            <v-btn
                class="my-1 mr-3"
                rounded
                variant="outlined"
                color="blue-darken-3"
                @click="openRequestLeaveDialog = !openRequestLeaveDialog"
            >
                Request for Leave</v-btn
            >
        </div>
        <div
            class="LMS-information_container d-flex flex-row flex-wrap justify-center rounded"
        >
            <!-- Calendar and Leave count wrapper -->
            <div class="LMS-calendar_wrapper d-flex flex-column justify-center">
                <div
                    class="LMS-calendar d-flex justify-center flex-column align-center"
                >
                    <h3>Your Leave Calendar</h3>
                    <VCalendarVue />
                    <div class="d-flex flex-row flex-wrap">
                        <v-chip class="ma-2" color="blue">
                            <!-- <v-avatar left class="blue darken-4"> </v-avatar> -->
                            Approved
                        </v-chip>
                        <v-chip class="ma-2" color="grey">
                            <!-- <v-avatar left class="blue darken-4"> </v-avatar> -->
                            Rejected
                        </v-chip>
                        <v-chip class="ma-2" color="orange">
                            <!-- <v-avatar left class="blue darken-4"> </v-avatar> -->
                            Pending
                        </v-chip>
                    </div>
                </div>
                <div
                    class="LMS-leave_balance mx-auto d-flex flex-column justify-center pa-3 align-lg-center"
                >
                    <div class="leaves_count_wrapper d-flex flex-row flex-wrap">
                        <div class="leaves_count pa-3">
                            <h3>
                                Leaves Left:
                                {{ leaveCountDetails?.leftLeaves }}
                            </h3>
                            <h6>Expires on: January 26th, 2024</h6>
                        </div>
                        <v-divider
                            v-if="!isMobile"
                            :thickness="2"
                            vertical
                        ></v-divider>
                        <div class="leaves_count pa-3">
                            <h3>
                                Leaves Taken:
                                {{ leaveCountDetails?.takenLeaves }}
                            </h3>
                            <h4></h4>
                        </div>
                    </div>
                    <div class="leaves_count pa-3">
                        <h3>
                            Total Allowances:
                            {{ leaveCountDetails?.TOTAL_LEAVES }}
                        </h3>
                        <h6>For Year: 2023-24</h6>
                    </div>
                </div>
            </div>
            <v-divider
                v-if="!isMobile"
                :vertical="true"
                :thickness="2"
                class="ma-5"
            ></v-divider>
            <!-- Pending Leave Requests -->
            <div
                class="LMS-pending_requests d-flex flex-column align-center pa-3"
            >
                <h3>Your Pending Requests:</h3>

                <div
                    class="pendingLeaves_placeholder d-flex flex-row w-100 justify-center align-center"
                    v-if="pendingLeaves.length === 0"
                >
                    <h4>No pending Requests!</h4>
                </div>

                <div class="pending-requests_cards d-flex flex-column" v-else>
                    <template v-for="(item, index) in leaves" :key="index">
                        <LeaveRequestCardVue
                            :leave="item"
                            v-if="item.status == 'pending'"
                        />
                    </template>
                </div>
            </div>
        </div>
        <!-- Leave History Table -->
        <div class="LMS-leave_history d-flex rounded">
            <LeaveHistory :leaveHistory="leaves" />
        </div>
    </section>
</template>

<script setup lang="ts">
// File imports
import LeaveRequestCardVue from "./LeaveRequestCard.vue";
import LeaveHistory from "./LeaveHistory.vue";
import VCalendarVue from "./VCalendar.vue";
import ApplyLeaveModal from "./ApplyLeaveModal.vue";
import { useLeavesStore } from "../../stores/leaves";
import { useCommonStore } from "../../stores/commonStore";

// Vue's imports
import { computed, onMounted, watch } from "vue";
import { reactive, ref } from "vue";
import { collection } from "firebase/firestore";
import { storeToRefs } from "pinia";

const { mobileView: isMobile } = storeToRefs(useCommonStore());
const { leaves, leaveCountDetails } = storeToRefs(useLeavesStore());
const { getLeaves, getLeaveCounterDetails } = useLeavesStore();

let pendingLeaves = computed(() => {
    return leaves.value.filter((leave) => {
        return leave.status == "pending";
    });
});
onMounted(async () => {
    await getLeaves();
    await getLeaveCounterDetails();
});
const openRequestLeaveDialog = ref(false);
</script>

<style scoped>
.LMS-wrapper,
h2,
h3,
h4,
h5 {
    color: var(--primary-color);
}
.LMS_container {
    background: whitesmoke;
}

.v-card {
    box-sizing: content-box;
    border-radius: 5%;
    border: 1px dashed grey;
}
/* Custom small cards for Leaves analytics */
.LMS-leave_balance {
    width: fit-content;
    border-radius: 5%;
    border: 2px dashed var(--secondary-color);
    margin-block: 1rem;
}
.LMS-calendar_wrapper,
.LMS-pending_requests {
    margin: 2rem;
    width: 40%;
}
/* .LMS-information_container, */
.LMS-leave_history,
.LMS-information_container {
    margin: 1rem;
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.15) !important;
}

.LMS-pending_requests {
    max-height: 580px;
}
.pending-requests_cards {
    overflow-y: auto;
}
.pending-requests_cards > .pending_card {
    display: flex;
    flex: 1 1 auto;
}

.pendingLeaves_placeholder {
    margin-block: 1rem;
    border-radius: 5%;
    height: 200px;
    border: 2px dashed var(--secondary-color);
}

.approved,
.rejected,
.pending {
    /* border-radius: 10%; */
    border: 1px solid white;
    margin: 0.3rem;
    padding-inline: 5px;
    padding-block: 1px;
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.approved span,
.rejected span,
.pending span {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-inline: 2px;
}

.approved span {
    background-color: #2563eb;
}

.rejected span {
    background-color: #475569;
}
.pending span {
    background-color: #ca8a04;
}
.approved {
    color: #2563eb;
    border-color: #2563eb;
}
.rejected {
    color: #475569;
    border-color: #475569;
}
.pending {
    color: #ca8a04;
    border-color: #ca8a04;
}

@media screen and (max-width: 840px) {
    .LMS-calendar_wrapper,
    .LMS-pending_requests {
        width: 100%;
        margin: 0 !important;
    }
    .LMS-leave_history,
    .LMS-information_container {
        margin: 0 !important;
    }
}
</style>
