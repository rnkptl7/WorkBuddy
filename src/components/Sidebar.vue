<template>
  <aside class="sidebar-menu menu">
    <router-link :to="{ name: 'Home' }" exact> Home </router-link>
    <router-link :to="{ name: 'Profile' }">Profile </router-link>
    <router-link :to="{ name: 'leaveRequest' }">Leaves</router-link>
    <router-link :to="{ name: 'Department' }" exact> Department</router-link>
    <router-link :to="{ name: 'Help' }">Help Me </router-link>
  </aside>
  <v-overlay v-model="overlay">
    <div class="sidebar-overlay">
      <div class="d-flex justify-space-between align-center px-3 py-5">
        <h1>WorkBuddy</h1>
        <img
          class="closeIcon"
          src="../assets/images/close.png"
          alt="close-menu"
          @click="overlay = !overlay"
        />
      </div>
      <div class="menu">
        <router-link :to="{ name: 'Home' }" exact> Home </router-link>
        <router-link :to="{ name: 'Profile' }">Profile </router-link>
        <router-link :to="{ name: 'leaveRequest' }">Leaves</router-link>
        <router-link :to="{ name: 'Department' }" exact>
          Department
        </router-link>
        <router-link :to="{ name: 'Help' }">Help Me </router-link>
      </div>
    </div>
  </v-overlay>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/stores/commonStore";
import { storeToRefs } from "pinia";

const commonStore = useCommonStore();

const { overlay } = storeToRefs(commonStore);
</script>

<style scoped>
.sidebar-menu {
  position: fixed;
  z-index: 10;
  height: 90vh;
  width: 15rem;
  background: #f0f3fb;
  box-shadow: var(--sidebar-shadow);
}

.position_left {
  display: none;
}

.menu a {
  display: block;
  padding: 0.7rem 4rem;
  text-decoration: none;
  color: var(--primary-color);
  font-size: 20px;
}

.sidebar-menu a:nth-of-type(1) {
  margin-top: 0;
}

.menu a.router-link-exact-active {
  border-right: 5px solid var(--primary-color);
  background: var(--secondary-color);
  color: var(--primary-color);
  font-weight: 500;
}

.closeIcon {
  width: 20px;
  cursor: pointer;
}

.v-navigation-drawer {
  background: var(--white-text);
}

h1 {
  color: var(--primary-color);
}

.sidebar-overlay {
  height: 100vh;
  background-color: var(--white-text);
  width: 260px;
}

@media screen and (max-width: 1250px) {
  .sidebar-menu {
    display: none;
  }
}
</style>
