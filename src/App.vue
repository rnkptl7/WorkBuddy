<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";

import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();

const { isLoggedIn } = storeToRefs(authStore);
</script>

<template>
  <Navbar></Navbar>
  <div class="main-layout">
    <div class="main-sidebar" v-if="isLoggedIn">
      <Sidebar></Sidebar>
    </div>
    <div :class="[isLoggedIn ? 'main-content-margin' : 'main-content']">
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
  padding: 0 20rem;
}

.main-layout .main-content-margin {
  margin-left: 19rem;
  padding: 10px;
}

@media screen and (max-width: 1130px) {
  .main-layout .main-content {
    padding: 0 5rem;
  }
}
@media screen and (max-width: 630px) {
  .main-layout .main-content {
    padding: 0rem;
  }
}
@media screen and (max-width: 1250px) {
  .main-layout .main-content-margin {
    margin-left: 0rem;
  }
}
</style>
