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
    <div class="main-content">
      <router-view v-slot="{ Component }">
        <component :is="Component"></component>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  width: 100vw;
}

.main-layout .main-content {
  margin-left: 19rem;
}
</style>
