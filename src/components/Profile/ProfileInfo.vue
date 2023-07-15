<template>
    <main class="main-field">
        <PersonalProfile />
        <EmployeeProfile />
        <ProfessionalProfile />
        <OtherProfile />
    </main>
</template>
<script setup>
import PersonalProfile from "../Profile/ProfileInfo/PersonalProfile.vue";
import EmployeeProfile from "../Profile/ProfileInfo/EmployeeProfile.vue";
import ProfessionalProfile from "../Profile/ProfileInfo/ProfessionalProfile.vue";
import OtherProfile from "../Profile/ProfileInfo/OtherProfile.vue";
</script>
