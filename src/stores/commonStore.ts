import { defineStore } from 'pinia';

export const useCommonStore = defineStore('commonStore', {
    state: () => {
        return {
            mobileView: false,
            showNav: false,
      }
    },
    actions: {
        handleView() {
            console.log("Resize");
            this.mobileView = window.innerWidth <= 1000;
        },
    }
  })