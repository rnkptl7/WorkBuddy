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
                <div>
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
            </div>
            <div class="legend-input">
                <label for="gender" class="genderLabel">Gender: </label>
                <div>
                    <VField
                        name="gender"
                        type="text"
                        class="input"
                        disabled
                        v-model="personal.gender"
                    />
                    <ErrorMessage name="gender" class="error_message" />
                </div>
            </div>
            <div class="legend-input">
                <label for="dob">DOB:</label>
                <div>
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
            </div>
            <div class="legend-input">
                <label for="fname">Home Address:</label>
                <div>
                    <VField
                        name="address"
                        placeholder="Enter your address"
                        type="text"
                        class="input"
                        v-model="personal.address"
                        :disabled="isEdit"
                    />
                    <ErrorMessage name="address" class="error_message" />
                </div>
            </div>
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

            <div class="button-box">
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
<script setup lang="ts">
import { reactive, ref, onMounted, computed } from "vue";
import { useFirestore } from "vuefire";
import { Personal } from '@/types/profileTypes';
import {
    doc,
    updateDoc,
    getDoc,
} from "firebase/firestore";

onMounted(() => {
    priorData();
});

const key = localStorage.getItem("userId");
const isAdmin = localStorage.getItem("isAdmin");

let personal: Personal = reactive({
    fullName: "",
    gender: "",
    address: "",
    mobile: 0,
    dob: "",
});

let personalCopy: Partial<Personal> = {};
const db = useFirestore();
const closeForm = () => {
    personal = { ...personalCopy } as Personal;
    toggleEdit();
};

const isEdit = ref(true);
const toggleEdit = () => (isEdit.value = !isEdit.value);
const personalSchema = {
    fullName: "alphaSpaces",
    gender: "gender",
    mobile: "integer|min:10|max:10",
    dob: (value: string): string | boolean => {
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

const maxDate = computed(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
});
const priorData = async (): Promise<void> => {
    const docSnap = await getDoc(doc(db, "users", key));
    if (docSnap.exists()) {
        const personalData = docSnap.data().personal || {};
        const registerData = docSnap.data().register || {};

        personal.fullName = registerData.fullName || "";
        personal.gender = registerData.gender || "";
        personal.dob = personalData.dob || "";
        personal.address = personalData.address || "";
        personal.mobile = personalData.mobile || "";
        personalCopy = { ...personal };
    } else {
        return;
    }
};
const updatePersonalInfo = async (): Promise<void> => {
    await updateDoc(doc(db, "users", key), {
        personal: { ...personal },
    });
    toggleEdit();
};
</script>
<style scoped>
@import "@/assets/profile.css";
</style>
