<template>
    <main class="main-field">
        <PersonalProfile />
        <EmployeeProfile />
        <ProfessionalProfile />
        <OtherProfile />
    </main>
</template>
<script setup lang="ts">
import PersonalProfile from "../Profile/ProfileInfo/PersonalProfile.vue";
import EmployeeProfile from "../Profile/ProfileInfo/EmployeeProfile.vue";
import ProfessionalProfile from "../Profile/ProfileInfo/ProfessionalProfile.vue";
import OtherProfile from "../Profile/ProfileInfo/OtherProfile.vue";
</script>
<style scoped>
.main-field {
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
}
</style>
