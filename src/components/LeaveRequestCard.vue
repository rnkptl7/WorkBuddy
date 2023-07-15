<template>
    <div
        class="leave-detail_card d-flex flex-fill align-center justify-space-between border rounded-lg my-2"
    >
        <div class="ld-card_logo ma-2 d-flex flex-column align-start">
            <h3>From</h3>
            <span>
                {{ leave.startDate }}
            </span>
            <h3>To</h3>
            <span>
                {{ leave.endDate }}
            </span>
        </div>
        <div class="ld-card-body d-flex flex-column ma-2">
            <h3>{{ leave.leaveMessage }}</h3>
            <div class="ld-category d-flex flex-row">
                <span
                    class="border rounded-pill px-2 text-caption text-uppercase"
                    >{{ leave.leaveCategory }}</span
                >
            </div>
            <div class="ld-card-body_description">
                <p>{{ trmimedDescrition }}</p>
            </div>
        </div>
        <div>
            <v-btn
                rounded
                v-if="isAdmin"
                color="green"
                @click="adminActions({ action: 'approve' })"
                >Approve</v-btn
            >
            <v-btn
                rounded
                v-if="isAdmin"
                color="red"
                @click="adminActions({ action: 'reject' })"
                >Reject</v-btn
            >
        </div>
    </div>
</template>

<script setup lang="ts">
    import { arrayUnion, doc, updateDoc } from "firebase/firestore";
    import moment from "moment";
    import { computed, ref } from "vue";
    import { useFirestore } from "vuefire";
    const { leave, isAdmin } = defineProps(["leave", "isAdmin"]);
    import { useLeavesStore } from "../stores/leaves";

    const logoDateString = computed(() => {
        const date = formatDate(leave.startDate);
        return {
            date: `${date[0]}`,
            month: `${date[1]}`,
            year: `${date[2]}`,
        };
    });

    // Helper function to convert timestamp to specified format
    // TODO: Move to reusable function
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

    async function adminActions({ action }) {
        // return async function () {
        const db = useFirestore();
        const leaveReferance = doc(db, "leaves", leave.id);
        console.log(action);
        await updateDoc(leaveReferance, {
            status: action === "approve" ? "Approved" : "rejected",
        });
        await useLeavesStore().getLeaves();
        // };
    }
</script>

<style scoped>
    .leave-detail_card {
        background-color: #f0f3fb;
        min-width: 300px;
        height: fit-content;
    }
    .ld-category > span {
        background-color: rgb(255, 240, 220);
        color: orangered;
    }
    .ld-card_logo > h3 {
        /* width: 70px; */
    }
</style>
