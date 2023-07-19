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
      <transition name="route" mode="out-in" appear>
        <router-view v-slot="{ Component }">
          <component :is="Component"></component>
        </router-view>
      </transition>
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
  margin-left: 15rem;
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

.route-enter-from {
  opacity: 0;
  transform: translateX(-200px);
}
.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(0px);
}
</style>
