<template>
    <main>
        <div class="avatar-icon ma-5">
            <v-avatar class="v-avatar-image">
                <img
                    v-if="male"
                    class="avatar-img"
                    alt="Avatar"
                    src="../../assets/images/male-user.png"
                />
                <img
                    v-else
                    class="avatar-img"
                    alt="Avatar"
                    src="../../assets/images/female-user.png"
                />
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
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getUserDetail } from "../../api/api";

const isProfileSelected = ref(true);
const isInfoSelected = ref(false);
const emits = defineEmits(["toggle"]);
const toggleInfo = (): void => {
    isInfoSelected.value = true;
    isProfileSelected.value = false;
    emits("toggle", isProfileSelected.value);
};

const toggleProfile = (): void => {
    isInfoSelected.value = false;
    isProfileSelected.value = true;
    emits("toggle", isProfileSelected.value);
};

const fullName = ref("");
const department = ref("");
const role = ref("");
const male = ref(true);
onMounted(async (): Promise<void> => {
    const userId = localStorage.getItem("userId");
    const docSnap = await getUserDetail(userId);
    fullName.value =
        (docSnap.data().register.fullName || "").charAt(0).toUpperCase() +
        `${docSnap.data().register.fullName.slice(1)}`;
    department.value =
        (docSnap.data().register.department || "").charAt(0).toUpperCase() +
        `${docSnap.data().register.department.slice(1)}`;
    role.value =
        (docSnap.data().register.role || "").charAt(0).toUpperCase() +
        `${docSnap.data().register.role.slice(1)}`;
    if (docSnap.data().register.gender == "Male") {
        male.value = true;
    } else {
        male.value = false;
    }
    if (role.value == "Employee") {
        role.value = "Engineer";
    }
    if (role.value == "Admin") {
        department.value = "";
    }
});
</script>
<style scoped>
.v-avatar-image {
    width: 120px;
    height: 120px;
    margin-right: 20px;
}

.avatar-img {
    width: 120px;
    height: 120px;
}
.avatar-name {
    font-size: 30px;
    color: var(--primary-color);
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
button:hover {
    background-color: var(--secondary-color);
}
@media screen and (max-width: 820px) {
    .v-avatar-image {
        width: 100px;
        height: 100px;
        margin-right: 0px;
    }
    .avatar-img {
        width: 100px;
        height: 100px;
    }
    .avatar-name {
        font-size: 25px;
    }
}
@media screen and (max-width: 620px) {
    .button-box {
        display: flex;
        justify-content: center;
    }
}
</style>
