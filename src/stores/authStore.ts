import { defineStore } from "pinia";
import { authState } from "@/types/authTypes"

export const useAuthStore = defineStore("authStore", {
    state: (): authState => {
        return {
            isLoggedIn: Boolean(localStorage.getItem("isLoggedIn")),
            isAdmin: Boolean(localStorage.getItem("isAdmin")),
            fullName: localStorage.getItem("fullName"),
            userId: localStorage.getItem("userId"),
        };
    },
    actions: {
        isAuthenticated(): Boolean {
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
