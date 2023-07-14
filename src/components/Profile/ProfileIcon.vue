<template>
    <main>
        <div class="avatar-icon ma-5">
            <v-avatar size="150px" class="mx-10">
                <v-img
                    alt="Avatar"
                    src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                ></v-img>
            </v-avatar>
            <div class="user-name m-5">
                <p class="text-h3">
                    {{ userName }}
                </p>
                <p class="text-h5">{{ deptName }}</p>
            </div>
        </div>
        <div class="ma-5">
            <v-slide-group>
                <v-btn
                    class="ma-2"
                    rounded
                    :class="isProfileSelected ? 'selected-button' : undefined"
                    @click="toggleProfile"
                >
                    Profile
                </v-btn>
                <v-btn
                    class="ma-2"
                    rounded
                    :class="isInfoSelected ? 'selected-button' : undefined"
                    @click="toggleInfo"
                >
                    Personal Info
                </v-btn>
            </v-slide-group>
        </div>
    </main>
</template>
<script setup>
import { ref } from "vue";
const userName = "Aman Prasad";
const deptName = "VueJs Trainee";
const isProfileSelected = ref(true);
const isInfoSelected = ref(false);
const emits = defineEmits(["toggle"]);

const toggleInfo = () => {
    isInfoSelected.value = true;
    isProfileSelected.value = false;
    emits("toggle", isProfileSelected.value);
};
const toggleProfile = () => {
    isInfoSelected.value = false;
    isProfileSelected.value = true;
    emits("toggle", isProfileSelected.value);
};
</script>
<style scoped>
.avatar-icon {
    display: flex;
    align-items: center;
}
.selected-button {
    color: orangered;
}
</style>
