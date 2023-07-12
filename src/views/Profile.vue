<template>
    <section>
        <ProfileIcon @toggle="toggleFunc" />
        <div class="profiles">
            <div class="left-profile">
                <v-divider></v-divider>
                <ProfileDetails v-if="toggleValue" />
                <ProfileInfo v-else />
            </div>
            <div class="right-profile"><ProfileTimeline /></div>
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";
import ProfileIcon from "../components/ProfileIcon.vue";
import ProfileDetails from "../components/ProfileDetails.vue";
import ProfileInfo from "../components/ProfileInfo.vue";
import ProfileTimeline from "../components/ProfileTimeline.vue";
const toggleValue = ref(true);
function toggleFunc(isProfileSelected) {
    toggleValue.value = isProfileSelected;
}
</script>
<style scoped>
.left-profile {
    display: flex;
    flex-flow: row wrap;
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
