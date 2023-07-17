import { defineStore } from "pinia";
import { useFirestore } from "vuefire";
import { doc, getDoc } from "firebase/firestore";

export const useProfileStore = defineStore("profileStore", {
    state: () => {
        return {
            openModal: false,
            userId: localStorage.getItem("userId"),
            achievements: [],
        };
    },
    actions: {
        async getAchievement() {
            const db = useFirestore();
            const docSnap = await getDoc(doc(db, "users", this.userId));
            if (docSnap.exists()) {
                this.achievements = docSnap.data().achievementList || [];
            }
        },
    },
});
