<template>
    <section class="flex-fill">
        <ProfileIcon @toggle="toggleFunc" />
        <AchievementModal />
        <div v-if="toggleValue" class="mt-5 profiles">
            <div class="left-profile">
                <ProfileDetails />
                <ProfileLeaves />
            </div>

            <div class="right-profile"><ProfileTimeline /></div>
        </div>
        <div v-else>
            <ProfileInfo />
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ProfileIcon from "../components/Profile/ProfileIcon.vue";
import AchievementModal from "../components/Profile/AchievementModal.vue";
import ProfileDetails from "../components/Profile/ProfileDetails.vue";
import ProfileTimeline from "../components/Profile/ProfileTimeline.vue";
import ProfileInfo from "../components/Profile/ProfileInfo.vue";
import ProfileLeaves from "../components/Profile/ProfileLeaves.vue";

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
@media screen and (max-width: 900px) {
    .profiles {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .left-profile {
        width: 100%;
    }
    .right-profile {
        display: flex;
        flex-flow: row wrap;
        width: 100%;
        justify-content: flex-end;
    }
}
</style>
