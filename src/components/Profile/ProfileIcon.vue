<template>
    <main>
        <div class="avatar-icon ma-5">
            <v-avatar class="v-avatar-image mx-10">
                <v-img
                    alt="Avatar"
                    src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                ></v-img>
            </v-avatar>
            <div class="user-name m-5">
                <p class="avatar-name">
                    {{ fullName }}
                </p>
                <p class="avatar-dept">{{ department }} {{ role }}</p>
            </div>
        </div>
        <div class="ma-5">
            <div class="button-box mb-2">
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
            </div>
            <v-divider color="blue" thickness="3"></v-divider>
        </div>
    </main>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useFirestore } from "vuefire";
import { doc, getDoc } from "firebase/firestore";

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

const fullName = ref("");
const department = ref("");
const role = ref("");

onMounted(async () => {
    const key = localStorage.getItem("userId");
    const db = useFirestore();
    const docSnap = await getDoc(doc(db, "users", key));
    if (docSnap.exists()) {
        fullName.value = docSnap.data().register.fullName || "";
        department.value =
            (docSnap.data().register.department || "").charAt(0).toUpperCase() +
            `${docSnap.data().register.department.slice(1)}`;
        role.value =
            (docSnap.data().register.role || "").charAt(0).toUpperCase() +
            `${docSnap.data().register.role.slice(1)}`;
    }
});
</script>
<style scoped>
.v-avatar-image {
    width: 120px;
    height: 120px;
}
.avatar-name {
    font-size: 30px;
}
.avatar-dept {
    font-size: 20px;
    color: var(--primary-color);
}
.avatar-icon {
    display: flex;
    align-items: center;
}
.selected-button {
    color: var(--primary-color);
    background: var(--secondary-color);
}
@media screen and (max-width: 820px) {
    .v-avatar-image {
        width: 100px;
        height: 100px;
    }
    .avatar-name {
        font-size: 25px;
    }
}
@media screen and (max-width: 540px) {
    .v-avatar-image {
        width: 80px;
        height: 80px;
    }
    .button-box {
        display: flex;
        justify-content: center;
    }
}
</style>
