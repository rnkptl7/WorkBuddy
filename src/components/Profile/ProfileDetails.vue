<template>
    <main class="profile-details">
        <v-card class="ma-5 card" width="10rem">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h5 mb-1">
                        {{ empID }}
                    </v-list-item-title>
                    <v-list-item-subtitle>Employee ID</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" width="10rem">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h5 mb-1">
                        {{ department }}
                    </v-list-item-title>
                    <v-list-item-subtitle>Department</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" width="10rem">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h5 mb-1">
                        {{ role }}
                    </v-list-item-title>
                    <v-list-item-subtitle>Role</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" width="10rem" v-if="TOTAL_LEAVES">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h5 mb-1">
                        {{ TOTAL_LEAVES }}
                    </v-list-item-title>
                    <v-list-item-subtitle>Total Allowance</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" width="10rem" v-if="leftLeaves">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h5 mb-1">
                        {{ leftLeaves }}
                    </v-list-item-title>
                    <v-list-item-subtitle>Leaves Left</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" width="10rem" v-if="takenLeaves">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h5 mb-1">
                        {{ takenLeaves }}
                    </v-list-item-title>
                    <v-list-item-subtitle>Leaves Taken</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" width="10rem" v-if="totalExp">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h5 mb-1">
                        {{ totalExp }}
                    </v-list-item-title>
                    <v-list-item-subtitle
                        >Total Experience
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" width="10rem" v-if="jdate">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h5 mb-1">
                        {{ jdate }}
                    </v-list-item-title>
                    <v-list-item-subtitle>Joining Date</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" width="10rem" v-if="cdate">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h5 mb-1">
                        {{ cdate }}
                    </v-list-item-title>
                    <v-list-item-subtitle
                        >Carrer Start Date</v-list-item-subtitle
                    >
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
        totalExp.value = docSnap.data().register.totalExp || "";
        TOTAL_LEAVES.value = docSnap.data().leavesDetails.TOTAL_LEAVES || "";
        takenLeaves.value = docSnap.data().leavesDetails.takenLeaves || "";
        leftLeaves.value = docSnap.data().leavesDetails.leftLeaves || "";
    }
});
</script>
<style scoped>
.v-card {
    background: #f0f3fb;
    border-radius: 5%;
    border-left: 5px solid orange;
}
.profile-details {
    display: flex;
    flex-flow: row wrap;
}
</style>
