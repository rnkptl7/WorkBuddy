<template>
    <section class="leave-request-section-wrapper border my-3">
        <div class="d-flex border ma-2">
            <v-btn class="mx-2" rounded @click="activeComponent = LMSProfile"
                >Profile</v-btn
            >
            <v-btn class="mx-2" rounded @click="activeComponent = ApprovalsVue">
                Approvals</v-btn
            >
        </div>
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
</style>
