<template>
    <section class="flex-fill">
        <ProfileIcon @toggle="toggleFunc" />
        <v-divider></v-divider>
        <div v-if="toggleValue" class="profiles">
            <div class="left-profile">
                <ProfileDetails />
            </div>
            <div class="right-profile"><ProfileTimeline /></div>
        </div>
        <div v-else>
            <ProfileInfo />
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";
import ProfileIcon from "../components/Profile/ProfileIcon.vue";
import ProfileDetails from "../components/Profile/ProfileDetails.vue";
import ProfileTimeline from "../components/Profile/ProfileTimeline.vue";
import ProfileInfo from "../components/Profile/ProfileInfo.vue";

const toggleValue = ref(true);
function toggleFunc(isProfileSelected) {
    toggleValue.value = isProfileSelected;
}
</script>
<style scoped>
.left-profile {
    width: 50%;
}
.right-profile {
    display: flex;
    flex-flow: row wrap;
    width: 50%;
    justify-content: flex-end;
}
.profiles {
    display: flex;
    flex-direction: row;
    width: 100%;
}
</style>
<template>
    <div>Profile</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
