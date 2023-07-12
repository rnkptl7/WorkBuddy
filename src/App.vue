<script setup lang="ts">
    import Navbar from "./components/Navbar.vue";
    import Sidebar from "./components/Sidebar.vue";
</script>

<template>
    <Navbar></Navbar>
    <div class="main-layout">
        <div class="main-sidebar">
            <Sidebar></Sidebar>
        </div>
        <router-view v-slot="{ Component }">
            <component :is="Component"></component>
        </router-view>
    </div>
</template>

<style scoped>
    .main-layout {
        display: flex;
        width: 100%;
        /* 100vw or 100% */
    }
</style>
