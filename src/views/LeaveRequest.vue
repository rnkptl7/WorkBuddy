<template>
    <section class="leave-request-section-wrapper my-3">
        <template v-if="isAdmin">
            <div class="lr-section-navigation d-flex ma-3">
                <v-btn
                    class="mx-2 selected-button"
                    rounded
                    @click="activeComponent = LMSProfile"
                >
                    Your Leaves
                </v-btn>
                <v-btn
                    class="mx-2 selected-button"
                    rounded
                    @click="activeComponent = ApprovalsVue"
                >
                    Approvals
                </v-btn>
            </div>
            <v-divider class="mx-3"></v-divider>
        </template>
        <component class="my-2" :is="activeComponent" />
    </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import ApprovalsVue from "../components/LMS/Approvals.vue";
import LMSProfile from "../components/LMS/LMSProfile.vue";
const activeComponent = ref(LMSProfile);
import { useLeavesStore } from "../stores/leaves";
const leavesStore = useLeavesStore();
const { isAdmin } = storeToRefs(leavesStore);
onMounted(async () => {
    await leavesStore.getLeaves();
});
</script>

<style scoped>
.leave-request-section-wrapper {
    width: min(1200px, 100%);
    margin-inline: auto;
}
.selected-button {
    color: var(--primary-color);
    background: var(--secondary-color);
}
</style>
