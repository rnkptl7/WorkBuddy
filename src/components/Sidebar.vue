<template>
    <aside class="sidebar-menu">
        Sidebar
        <router-link :to="{ name: 'Home' }"> Home </router-link>
        <router-link :to="{ name: 'Login' }">Login </router-link>
        <router-link :to="{ name: 'Register' }">Register </router-link>
        <router-link :to="{ name: 'Profile' }">My Profile</router-link>
    </aside>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/stores/commonStore";
import { storeToRefs } from "pinia";

const commonStore = useCommonStore();
const { showNav, mobileView } = storeToRefs(commonStore);
</script>

<style scoped>
.sidebar-menu {
    position: fixed;
    height: 90vh;
    width: 15rem;
    background: #f0f3fb;
    box-shadow: 0px 10px 10px -4px black;
}

.position_left {
    display: none;
}

.sidebar-menu a {
    display: block;
    margin: 5px 0;
    padding: 0.7rem 4rem;
    border-radius: 0 10px 10px 0;
    text-decoration: none;
    color: #000000ab;
    font-size: 20px;
}

.sidebar-menu a.router-link-exact-active {
    background-color: var(--primary-color);
    color: var(--white-text);
}

@media screen and (max-width: 1000px) {
    .sidebar-menu {
        left: -30%;
        display: none;
    }

    .showSidebar {
        left: 0%;
        display: block;
    }
}
</style>
