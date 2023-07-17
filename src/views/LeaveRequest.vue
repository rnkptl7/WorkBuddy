<template>
    <section class="leave-request-section-wrapper my-3">
        <div class="lr-section-navigation d-flex ma-3">
            <v-btn
                class="mx-2 selected-button"
                rounded
                @click="activeComponent = LMSProfile"
            >
                Profile
            </v-btn>
            <v-btn
                class="mx-2 selected-button"
                rounded
                @click="activeComponent = ApprovalsVue"
            >
                Approvals
            </v-btn>
            <!-- 
            <v-btn class="mx-2" rounded>Profile</v-btn>
            <v-btn class="mx-2" rounded> Approvals</v-btn> -->
        </div>
        <v-divider class="mx-3"></v-divider>
        <!-- <KeepAlive> -->
        <component class="my-2" :is="activeComponent" />
        <!-- </KeepAlive> -->
    </section>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import ApprovalsVue from "../components/Approvals.vue";
    import LMSProfile from "../components/LMSProfile.vue";
    const activeComponent = ref(LMSProfile);
</script>

<style scoped>
    .leave-request-section-wrapper {
        width: min(1200px, 100%);
        margin-inline: auto;
    }
    .lr-section-navigation {
        /* box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.15) !important; */
    }
    .selected-button {
        color: var(--primary-color);
        background: var(--secondary-color);
    }
</style>
