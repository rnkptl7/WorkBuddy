<template>
  <div class="navbar">
    <router-link :to="{ name: 'Home' }"> Home </router-link>
    <router-link :to="{ name: 'Register' }">Register </router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.navbar {
}
</style>
