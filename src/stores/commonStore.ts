import { defineStore } from "pinia";
import { commonStoreState } from "@/types/authTypes"

export const useCommonStore = defineStore("commonStore", {
    state: ():commonStoreState  => {
        return {
            mobileView: false,
            showPassword: true,
            showRegisterPassword: true,
            showConfirmPassword: true,
            overlay: false,
        };
    },
    actions: {
        handleView() {
            this.mobileView = window.innerWidth <= 1250;
        },
        showPasswordChange() {
            this.showPassword = !this.showPassword;
        },
        showConfirmPasswordChange() {
            this.showConfirmPassword = !this.showConfirmPassword;
        },
        showRegisterPasswordChange() {
            this.showRegisterPassword = !this.showRegisterPassword;
        },
    },
});
