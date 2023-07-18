<template>
    <section class="d-flex flex-row flex-fill w-100">
        <!-- Pending Leave Requests -->
        <div
            class="admin-pending_requests d-flex flex-fill flex-column align-center pa-3 w-100"
        >
            <h3>Your Pending Requests:</h3>
            <div class="pending-requests_cards">
                <template
                    v-for="(item, index) in leavesStore.allPendingLeaves"
                    :key="index"
                >
                    <LeaveRequestCard
                        :leave="item"
                        :isAdmin="isAdmin"
                        v-if="item.status === 'pending'"
                    />
                </template>
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
    import { useAuthStore } from "../stores/authStore";
    import { storeToRefs } from "pinia";

    const leavesStore = useLeavesStore();
    const { isAdmin, allPendingLeaves } = storeToRefs(leavesStore);
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

    @media screen and (max-width: 950px) {
        .pending-requests_cards {
            grid-template-columns: auto;
        }
    }
</style>
