<template>
  <div class="navbar">
    <div class="logo">
      <h1>HRMS</h1>
    </div>
    <div class="navbar-item">
      <ul>
        <li>
          <router-link :to="{ name: 'Profile' }">Profile</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();

const { isLoggedIn, isAdmin } = storeToRefs(authStore);
</script>

<style scoped>
.navbar {
  background: #f0f3fb;
  height: 10vh;
  position: sticky;
  top: 0;
  display: flex;
  padding: 20px 30px;
  justify-content: space-between;
  align-items: center;
}

.navbar .logo {
  padding: 15px 30px;
  border-bottom: 3px solid #e4e4e594;
}

.navbar .navbar-item ul {
  list-style: none;
}

.navbar .navbar-item ul li a {
  font-size: 20px;
  text-decoration: none;
  color: #000000ab;
}
</style>
