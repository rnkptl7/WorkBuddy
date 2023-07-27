<template>
    <section class="d-flex flex-row flex-fill w-100">
        <!-- Pending Leave Requests -->
        <div
            class="admin-pending_requests d-flex flex flex-column align-center pa-3 w-100"
        >
            <h3>Your Pending Requests:</h3>
            <div
                class="pendingLeaves_placeholder d-flex flex-row justify-center align-center"
                v-if="leavesStore.allPendingLeaves.length === 0"
            >
                <h4>No pending Requests!</h4>
            </div>
            <div class="pending-requests_cards">
                <template
                    v-for="(item, index) in leavesStore.allPendingLeaves"
                    :key="index"
                >
                    <LeaveRequestCard
                        :leave="item"
                        :isAdmin="leavesStore.isAdmin"
                        v-if="item.status === 'pending'"
                    />
                </template>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useFirestore } from "vuefire";
import LeaveRequestCard from "./LeaveRequestCard.vue";
import { useLeavesStore } from "../../stores/leaves";
import { useAuthStore } from "../../stores/authStore";
import { storeToRefs } from "pinia";

const leavesStore = useLeavesStore();
onMounted(async () => {
    await leavesStore.getAllPendingLeaves();
});
</script>

<style scoped>
.pending-requests_cards {
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 4rem;
}
.pending-requests_cards,
h2,
h3,
h4,
h5 {
    color: var(--primary-color);
}

.pendingLeaves_placeholder {
    margin-block: 1rem;
    border-radius: 5%;
    height: 200px;
    border: 2px dashed var(--secondary-color);
    width: max(250px, 40%);
}

@media screen and (max-width: 950px) {
    .pending-requests_cards {
        grid-template-columns: auto;
    }
}
</style>
