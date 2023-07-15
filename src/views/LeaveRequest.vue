<template>
    <section class="w-100">
        <div class="d-flex">
            <v-btn rounded @click="activeComponent = LMSProfile">Profile</v-btn>
            <v-btn rounded @click="activeComponent = ApprovalsVue">
                Approvals</v-btn
            >
        </div>
        <!-- <KeepAlive> -->
        <component :is="activeComponent" />
        <!-- </KeepAlive> -->
    </section>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import ApprovalsVue from "../components/Approvals.vue";
    import LMSProfile from "../components/LMSProfile.vue";
    const activeComponent = ref(LMSProfile);
</script>

<style scoped></style>
