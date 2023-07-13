<template>
    <section class="LMS-wrapper d-flex flex-column pa-3 mx-auto">
        <!-- Request Leave button -->
        <div class="LMS-button_container my-2 d-flex flex-row-reverse">
            <v-btn
                class="my-3"
                rounded
                variant="outlined"
                color="grey-darken-3"
                @click="openRequestLeaveDialog = !openRequestLeaveDialog"
                >Request for Leave</v-btn
            >
            <ApplyLeaveModal
                :dialog="openRequestLeaveDialog"
                @closeLeaveRequestModal="
                    openRequestLeaveDialog = !openRequestLeaveDialog
                "
            />
        </div>
        <div
            class="LMS-information_container d-flex flex-row flex-wrap justify-space-around rounded-lg pa-3 w-100"
        >
            <!-- Calendar and Leave count wrapper -->
            <div
                class="LMS-calendar_wrapper d-flex flex-column justify-space-around justify-lg-center"
            >
                <div class="LMS-calendar d-flex justify-center">
                    <VCalendarVue />
                </div>
                <div
                    class="LMS-leave_balance ma-3 d-flex flex-column align-space-between justify-center"
                >
                    <div class="leaves_count_wrapper d-flex flex-row flex-wrap">
                        <div class="leaves_count pa-3">
                            <h3>Leaves Left: 8</h3>
                            <h6>Expires on: January 26th, 2024</h6>
                        </div>
                        <div class="leaves_count pa-3">
                            <h3>Leaves Taken: 2</h3>
                            <h4></h4>
                        </div>
                    </div>
                    <div class="leaves_count pa-3">
                        <h3>Total Allowances: 10</h3>
                        <h6>For Year: 2023-24</h6>
                    </div>
                </div>
            </div>
            <!-- Pending Leave Requests -->
            <div
                class="LMS-pending_requests d-flex flex-column align-center pa-3"
            >
                <h3>Your Pending Requests:</h3>
                <div class="pending-requests_cards d-flex flex-column">
                    <LeaveRequestCardVue />
                    <LeaveRequestCardVue />
                    <LeaveRequestCardVue />
                    <LeaveRequestCardVue />
                    <LeaveRequestCardVue />
                    <LeaveRequestCardVue />
                    <LeaveRequestCardVue />
                </div>
            </div>
        </div>
        <!-- Leave History -->
        <LeaveHistory />
    </section>
</template>

<script setup lang="ts">
    import LeaveRequestCardVue from "../components/LeaveRequestCard.vue";
    import LeaveHistory from "../components/LeaveHistory.vue";
    import VCalendarVue from "../components/VCalendar.vue";
    import ApplyLeaveModal from "../components/ApplyLeaveModal.vue";
    import { reactive, ref } from "vue";

    const openRequestLeaveDialog = ref(false);
</script>

<style scoped>
    .LMS-wrapper {
        width: 80%;
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
    .LMS-leave_balance .leaves_count {
        border-radius: 5%;
        border: 1px dashed grey;
        margin-block: 1rem;
    }
    .leaves_count_wrapper {
        /* width: fit-content; */
    }
    .LMS-pending_requests {
        width: 50%;
        max-height: 580px;
    }
    .pending-requests_cards {
        overflow-y: auto;
    }
    .pending-requests_cards > .pending_card {
        display: flex;
        flex: 1 1 auto;
    }
</style>
