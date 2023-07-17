import { defineStore } from "pinia";
import { useFirestore } from "vuefire";
import { doc, getDoc } from "firebase/firestore";

export const useProfileStore = defineStore("profileStore", {
    state: () => {
        return {
            openModal: false,
            userId: localStorage.getItem("userId"),
            achievements: [],
            leftLeaves: "",
            takenLeaves: "",
            leaveRecord: [],
        };
    },
    actions: {
        async getAchievement() {
            const db = useFirestore();
            const docSnap = await getDoc(doc(db, "users", this.userId));
            if (docSnap.exists()) {
                this.achievements = docSnap.data().achievementList || [];
                this.achievements.sort(function (a, b) {
                    return new Date(a.titleDate) - new Date(b.titleDate);
                });
            }
        },
        async getLeavesRecord() {
            const db = useFirestore();
            const docSnap = await getDoc(doc(db, "users", this.userId));
            if (docSnap.exists()) {
                this.leftLeaves = docSnap.data().leavesDetails.leftLeaves || "";
                this.leaveRecord.push(this.leftLeaves);
                this.takenLeaves =
                    docSnap.data().leavesDetails.leftLeaves || "";
                this.leaveRecord.push(this.takenLeaves);
            }
        },
    },
});
