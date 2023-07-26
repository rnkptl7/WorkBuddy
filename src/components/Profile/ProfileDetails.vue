<template>
    <main class="profile-details">
        <template v-for="(detail, title) in profileDetails" :key="detail">
            <v-card class="ma-5 card" v-if="detail !== ''">
                <v-list-item three-line>
                    <v-list-item-content class="ma-5">
                        <v-list-item-title class="mb-1">
                            {{ detail }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{ formatTitle(title) }}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </template>
    </main>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { getUserDetail } from "../../api/api";
import { ProfileDetails } from "../../types/profileTypes";

let profileDetails: ProfileDetails = reactive({
    department: "",
    empID: "",
    role: "",
    totalLeaves: "",
    takenLeaves: "",
    leftLeaves: "",
    carrerStartDate: "",
    joiningDate: "",
    totalExperience: "",
});

const formatTitle = (title: string) => {
    if (title == "empID") {
        return "Employee ID";
    }
    const updatedTitle = title.replace(/([A-Z])/g, " $1").trim();
    return updatedTitle.charAt(0).toUpperCase() + updatedTitle.slice(1);
};

onMounted(async () => {
    const userId = localStorage.getItem("userId");
    const docSnap = await getUserDetail(userId);
    const register = docSnap.data().register || {};
    const leavesDetails = docSnap.data().leavesDetails || {};
    const employee = docSnap.data().employee || {};
    const professional = docSnap.data().professional || {};

    profileDetails.empID = register.empID || "";
    profileDetails.department =
        (register.department || "").charAt(0).toUpperCase() +
        register.department?.slice(1);
    profileDetails.role =
        (register.role || "").charAt(0).toUpperCase() + register.role?.slice(1);
    profileDetails.totalLeaves = leavesDetails.TOTAL_LEAVES ?? 10;
    profileDetails.takenLeaves = leavesDetails.takenLeaves ?? 0;
    profileDetails.leftLeaves = leavesDetails.leftLeaves ?? 10;
    profileDetails.joiningDate = employee.jdate || "";
    profileDetails.carrerStartDate = professional.cdate || "";
    profileDetails.totalExperience = professional.totalExp || "";
});
</script>

<style scoped>
.v-list-item-title {
    color: #115173;
    font-size: 1.25rem;
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
