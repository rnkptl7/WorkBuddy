<template>
    <main class="profile-details">
        <v-card class="ma-5 card">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h6 mb-1">
                        {{ empID }}
                    </v-list-item-title>
                    <v-list-item-subtitle>Employee ID</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h6 mb-1">
                        {{ department }}
                    </v-list-item-title>
                    <v-list-item-subtitle>Department</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h6 mb-1">
                        {{ role }}
                    </v-list-item-title>
                    <v-list-item-subtitle>Role</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" v-if="TOTAL_LEAVES">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h6 mb-1">
                        {{ TOTAL_LEAVES }}
                    </v-list-item-title>
                    <v-list-item-subtitle>Total Allowance</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" v-if="leftLeaves">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h6 mb-1">
                        {{ leftLeaves }}
                    </v-list-item-title>
                    <v-list-item-subtitle>Leaves Left</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" v-if="takenLeaves">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h6 mb-1">
                        {{ takenLeaves }}
                    </v-list-item-title>
                    <v-list-item-subtitle>Leaves Taken</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" v-if="jdate">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h6 mb-1">
                        {{ jdate }}
                    </v-list-item-title>
                    <v-list-item-subtitle>Joining Date</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" v-if="cdate">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h6 mb-1">
                        {{ cdate }}
                    </v-list-item-title>
                    <v-list-item-subtitle
                        >Carrer Start Date</v-list-item-subtitle
                    >
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" v-if="totalExp">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h6 mb-1">
                        {{ totalExp }}
                    </v-list-item-title>
                    <v-list-item-subtitle
                        >Total Experience
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
    </main>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useFirestore } from "vuefire";
import { doc, getDoc } from "firebase/firestore";

const department = ref("");
const empID = ref("");
const role = ref("");
const totalExp = ref("");
const cdate = ref("");
const jdate = ref("");
const TOTAL_LEAVES = ref("");
const takenLeaves = ref("");
const leftLeaves = ref("");

onMounted(async () => {
    const key = localStorage.getItem("userId");
    const db = useFirestore();
    const docSnap = await getDoc(doc(db, "users", key));
    if (docSnap.exists()) {
        empID.value = docSnap.data().employee.empID || "";
        department.value =
            (docSnap.data().register.department || "").charAt(0).toUpperCase() +
            `${docSnap.data().register.department.slice(1)}`;
        role.value =
            (docSnap.data().register.role || "").charAt(0).toUpperCase() +
            `${docSnap.data().register.role.slice(1)}`;
        jdate.value = docSnap.data().employee.jdate || "";
        cdate.value = docSnap.data().professional.cdate || "";
        totalExp.value = docSnap.data().professional.totalExp || "";
        TOTAL_LEAVES.value = docSnap.data().leavesDetails.TOTAL_LEAVES || "";
        takenLeaves.value = docSnap.data().leavesDetails.takenLeaves || "";
        leftLeaves.value = docSnap.data().leavesDetails.leftLeaves || "";
        console.log(totalExp, "pppppppxxxxxxxxxxxxxxxxxxxxxpppEEX");
    }
});
</script>
<style scoped>
.profile-details {
    display: flex;
    justify-content: flex-start;
}
.v-list-item-title {
    color: #115173;
}
.v-card {
    background: #f0f3fb;
    border-radius: 5%;
    border-left: 5px solid var(--primary-color);
    width: 10rem;
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.15);
}
.profile-details {
    display: flex;
    flex-flow: row wrap;
}
@media screen and (max-width: 420px) {
    .v-card {
        width: 8rem;
    }
}
@media screen and (max-width: 1250px) {
    .profile-details {
        display: flex;
        justify-content: center;
    }
}
</style>
