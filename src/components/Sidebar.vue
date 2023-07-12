<template>
  <aside class="sidebar-menu">
    <router-link :to="{ name: 'Home' }"> Home </router-link>
    <router-link :to="{ name: 'Login' }">Login </router-link>
    <router-link :to="{ name: 'Register' }">Register </router-link>
  </aside>
</template>

<script setup lang="ts"></script>

<style scoped>
.sidebar-menu {
  position: fixed;
  height: 90vh;
  width: 18rem;
  background: #f0f3fb;
}

.sidebar-menu a {
  display: block;
  margin: 5px 0;
  padding: 1rem;
  border-radius: 0 10px 10px 0;
  text-decoration: none;
  color: #000000ab;
}

.sidebar-menu a.router-link-exact-active {
  background-color: rgb(162, 253, 255);
}
</style>
