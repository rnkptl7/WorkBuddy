<template>
  <div class="navbar">
    <div class="logo">
      <h1>HRMS</h1>
    </div>
    <div class="navbar-item">
      <div v-if="isLoggedIn">
        <ul>
          <li>
            <router-link :to="{ name: 'Profile' }">
              <span class="d-flex mr-2"
                ><img src="../assets/images/profile.png" alt=""
              /></span>
              {{ fullname }}</router-link
            >
          </li>
          <li>
            <button @click="logout">Logout</button>
          </li>
          <li v-if="mobileView" class="hamburgerMenu">
            <img
              v-show="!showNav"
              src="../assets/images/menu.png"
              alt="hamburger-menu"
              @click="showNav = !showNav"
            />
            <img
              v-show="showNav"
              class="closeIcon"
              src="../assets/images/close.png"
              alt="close-menu"
              @click="showNav = !showNav"
            />
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
import { useCommonStore } from "@/stores/commonStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const commonStore = useCommonStore();
const router = useRouter();

const { isLoggedIn, fullname } = storeToRefs(authStore);
const { mobileView, showNav } = storeToRefs(commonStore);

const logout = () => {
  localStorage.setItem("isLoggedIn", false);
  localStorage.setItem("userId", null);
  localStorage.removeItem("isAdmin");
  localStorage.setItem("fullName", null);
  isLoggedIn.value = false;
  fullname.value = "";
  router.replace({ name: "Login" });
};

commonStore.handleView();
window.addEventListener("resize", commonStore.handleView);
</script>

<style scoped>
@import "../assets/main.css";
a.router-link-exact-active {
  border-bottom: 2px solid var(--primary-color);
  background: var(--secondary-color);
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
  z-index: 10;
}

.navbar .logo {
  padding: 15px 30px;
  color: var(--primary-color);
}

.navbar .navbar-item ul {
  display: flex;
  list-style: none;
  align-items: center;
}

.navbar .navbar-item ul li {
  font-size: 20px;
  color: var(--primary-color);
  margin: 0 0.7rem;
}

.navbar .navbar-item ul li a {
  font-size: 20px;
  text-decoration: none;
  color: var(--primary-color);
  padding: 1.4rem;
  display: flex;
  align-items: center;
}

.hamburgerMenu {
  width: 30px;
  cursor: pointer;
}

img {
  width: 27px;
  display: flex;
  margin-left: 10px;
}

.closeIcon {
  width: 20px;
}

@media screen and (max-width: 575px) {
  .navbar .navbar-item ul li {
    margin: 0 0.2rem;
  }
  .navbar .navbar-item ul li a {
    padding: 1rem;
  }
}

@media screen and (max-width: 520px) {
  .navbar {
    padding: 14px 7px;
  }

  .navbar .logo {
    padding: 10px 5px;
  }
  .navbar .navbar-item ul li {
    margin: 0 0.2rem;
  }
  .navbar .navbar-item ul li a {
    padding: 0.2rem;
  }

  img {
    width: 21px;
  }
}
</style>
