import { defineStore } from "pinia";

export const useProfileStore = defineStore("profileStore", {
    state: () => {
        return {
            userID: parse(localStorage.getItem("userId")),
        };
    },
    actions: {},
});
