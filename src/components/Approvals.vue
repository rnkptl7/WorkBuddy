<template>
    <section class="d-flex flex-row flex-fill w-100">
        <!-- Pending Leave Requests -->
        <div
            class="LMS-pending_requests d-flex flex-fill flex-column align-center pa-3 w-75"
        >
            <h3>Your Pending Requests:</h3>
            <div class="pending-requests_cards d-flex flex-column">
                <div v-for="(item, index) in leavesStore.leaves" :key="index">
                    <LeaveRequestCard
                        :leave="item"
                        :isAdmin="true"
                        v-if="item.status === 'pending'"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { collection, getDocs, query, where } from "firebase/firestore";
    import { onMounted, ref } from "vue";
    import { useFirestore } from "vuefire";
    import LeaveRequestCard from "../components/LeaveRequestCard.vue";
    import { useLeavesStore } from "../stores/leaves";

    const leavesStore = useLeavesStore();
</script>

<style scoped>
    .LMS-pending_requests {
    }
</style>
