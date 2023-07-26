import { defineStore } from "pinia";
import { ProfileStoreState } from "@/types/profileTypes";

export const useProfileStore = defineStore("profileStore", {
    state: (): ProfileStoreState => ({
        openModal: false,
        achievements: [],
    }),
});
