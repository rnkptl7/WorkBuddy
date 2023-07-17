// import { ref, computed } from 'vue'
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            isLoggedIn: Boolean(localStorage.getItem("isLoggedIn")),
            isAdmin: localStorage.getItem("isAdmin"),
            fullname: localStorage.getItem("fullName"),
            userId: localStorage.getItem("userId")
      }
    },
    actions: {
        isAuthenticated() {
            const loggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
        this.isLoggedIn = loggedIn;
            return (
              loggedIn !== null &&
              loggedIn !== undefined &&
              loggedIn !== "" &&
              loggedIn
            );
          },
    }
  })