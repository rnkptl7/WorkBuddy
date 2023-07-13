<template>
  <div class="navbar">
    <div class="logo">
      <h1>HRMS</h1>
    </div>
    <div class="navbar-item">
      <div v-if="isLoggedIn">
        <ul>
          <li>
            <router-link :to="{ name: 'Profile' }">Profile</router-link>
          </li>
          <li>
            <button @click="logout">Logout</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <ul>
          <li>
            <router-link :to="{ name: 'Login' }">Login </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Register' }">Register </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter()

const { isLoggedIn, isAdmin } = storeToRefs(authStore);

const logout = () => {
  sessionStorage.setItem("isLoggedIn", false);
  isLoggedIn.value = false;
  router.replace({ name: "Login" });
}
</script>

<style scoped>
a.router-link-exact-active {
  border-bottom: 2px solid #000000ab;
  background: #00000020;
}

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
}

.navbar .navbar-item ul {
  display: flex;
  list-style: none;
}

.navbar .navbar-item ul li button {
  font-size: 18px;
  color: #000000ab;
  margin-left: 1rem;
}

.navbar .navbar-item ul li a {
  padding: 1.4rem;
  font-size: 18px;
  text-decoration: none;
  color: #000000ab;
}
</style>
