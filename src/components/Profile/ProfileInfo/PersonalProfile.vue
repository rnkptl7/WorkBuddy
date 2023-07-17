<template>
    <VForm
        :validation-schema="personalSchema"
        :class="{ editable: !isEdit }"
        @submit="updatePersonalInfo"
    >
        <fieldset>
            <legend>Personal Details:</legend>
            <div class="legend-input">
                <label for="fname">Full Name:</label>
                <VField
                    name="name"
                    placeholder="Enter your fullName"
                    type="text"
                    class="input"
                    v-model="personal.fullName"
                    disabled
                />
                <ErrorMessage name="name" class="error_message" />
            </div>
            <div class="legend-input">
                <label for="gender" class="genderLabel">Gender: </label>
                <VField
                    name="gender"
                    type="text"
                    class="input"
                    disabled
                    v-model="personal.gender"
                />
                <ErrorMessage name="gender" class="error_message" />
            </div>
            <div class="legend-input">
                <label for="dob">DOB:</label>
                <VField
                    name="dob"
                    placeholder=" "
                    type="date"
                    class="input"
                    v-model="personal.dob"
                    :max="maxDate"
                    :disabled="isEdit"
                />
                <ErrorMessage name="dob" class="error_message" />
            </div>
            <div class="legend-input">
                <label for="fname">Home Address:</label>
                <VField
                    name="address"
                    placeholder="Enter your address"
                    type="text"
                    class="input"
                    v-model="personal.address"
                    :disabled="isEdit"
                />
            </div>
            <ErrorMessage name="address" class="error_message" />
            <div class="legend-input">
                <label for="fname">Mobile No:</label>
                <div>
                    <VField
                        name="mobile"
                        placeholder="Enter your number"
                        type="number"
                        class="input"
                        v-model="personal.mobile"
                        :disabled="isEdit"
                    />
                    <ErrorMessage name="mobile" class="error_message" />
                </div>
            </div>

            <div class="button-box" v-if="true">
                <v-slide-group>
                    <v-btn
                        v-if="isEdit"
                        class="ma-2"
                        rounded
                        @click="toggleEdit"
                        id="editBtn"
                    >
                        Edit
                    </v-btn>
                    <template v-else>
                        <v-btn class="ma-2" @click="closeForm" rounded>
                            Close
                        </v-btn>
                        <v-btn class="ma-2" rounded type="submit">
                            Submit
                        </v-btn>
                    </template>
                </v-slide-group>
            </div>
        </fieldset>
    </VForm>
</template>
<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import { useFirestore } from "vuefire";
import {
    doc,
    setDoc,
    updateDoc,
    getDoc,
    collection,
    where,
    query,
    getDocs,
} from "firebase/firestore";

onMounted(() => {
    priorData();
});

const key = localStorage.getItem("userId");
const isAdmin = localStorage.getItem("isAdmin");

let personalCopy = {};
const db = useFirestore();
const closeForm = () => {
    personal = { ...personalCopy };
    toggleEdit();
};
const isEdit = ref(true);
const toggleEdit = () => (isEdit.value = !isEdit.value);
const personalSchema = {
    fullName: "alphaSpaces",
    gender: "gender",
    mobile: "integer|min:10|max:10",
    dob: (value) => {
        const inputDate = new Date(value);
        const today = new Date();
        const lastDate = new Date("1923-12-31");
        const dateInFutureError = "Date cannot be in the future";
        const dateInPastError = "Date cannot be earlier than 01-01-1924";
        if (inputDate >= today) {
            return dateInFutureError;
        } else if (inputDate <= lastDate) {
            return dateInPastError;
        } else {
            return true;
        }
    },
};
let personal = reactive({
    fullName: "",
    gender: "",
    address: "",
    mobile: "",
    dob: "",
});
const maxDate = computed(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
});
const priorData = async () => {
    const docSnap = await getDoc(doc(db, "users", key));
    if (docSnap.exists()) {
        const personalData = docSnap.data().personal || {};
        const registerData = docSnap.data().register || {};

        personal.fullName =
            personalData.fullName || registerData.fullName || "";
        personal.gender = personalData.gender || registerData.gender || "";
        personal.dob = personalData.dob || registerData.dob || "";
        personal.address = personalData.address || registerData.address || "";
        personal.mobile = personalData.mobile || registerData.mobile || "";
        personalCopy = { ...personal };
    } else {
        return;
    }
};
const updatePersonalInfo = async () => {
    await updateDoc(doc(db, "users", key), {
        personal: { ...personal },
    });
    toggleEdit();
};
</script>
<style scoped>
@import "@/assets/profile.css";
</style>
