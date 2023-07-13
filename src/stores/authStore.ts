// import { ref, computed } from 'vue'
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            isLoggedIn: Boolean(sessionStorage.getItem("isLoggedIn")),
            isAdmin: sessionStorage.getItem("isAdmin"),
      }
    },
    actions: {
        isAuthenticated() {
            const loggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));
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