// import { ref, computed } from 'vue'
import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
    state: () => {
        return {
            isLoggedIn: Boolean(localStorage.getItem("isLoggedIn")),
            isAdmin: localStorage.getItem("isAdmin") || false,
            fullname: localStorage.getItem("fullName"),
        };
    },
    actions: {
        isAuthenticated() {
            const loggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
            const userId = localStorage.getItem("userId");

            this.isLoggedIn = loggedIn;
            return (
                loggedIn !== null &&
                loggedIn !== undefined &&
                loggedIn !== "" &&
                loggedIn &&
                userId
            );
        },
    },
});
