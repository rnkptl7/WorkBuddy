import { defineStore } from "pinia";

export const useCommonStore = defineStore("commonStore", {
    state: () => {
        return {
            mobileView: false,
            showNav: false,
            showPassword: true,
            showRegisterPassword: true,
            showConfirmPassword: true,
            openModal: false,
        };
    },
    actions: {
        handleView() {
            console.log("Resize");
            this.mobileView = window.innerWidth <= 1000;
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
