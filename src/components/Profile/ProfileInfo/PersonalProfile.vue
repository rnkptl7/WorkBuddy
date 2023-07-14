<template>
    <VForm :validation-schema="personalSchema" @submit="updatePersonalInfo">
        <fieldset>
            <legend>Personal Details:</legend>
            <div class="legend-input">
                <label for="fname">Full Name:</label>
                <VField
                    name="name"
                    placeholder="Enter your fullname"
                    type="text"
                    class="input"
                    v-model="personal.fullname"
                />
            </div>
            <div class="legend-input">
                <label for="gender" class="genderLabel">Gender: </label>
                <label class="radioLabel d-flex">
                    <VField
                        type="radio"
                        name="gender"
                        value="Male"
                        v-model="personal.gender"
                    />
                    Male
                </label>
                <label class="radioLabel d-flex">
                    <VField
                        type="radio"
                        name="gender"
                        value="Female"
                        v-model="personal.gender"
                    />
                    Female
                </label>
            </div>
            <div class="legend-input">
                <label for="dob">DOB*</label>
                <VField
                    name="dob"
                    type="date"
                    class="input"
                    v-model="personal.dob"
                />
            </div>
            <div class="legend-input">
                <label for="fname">Home Address:</label>
                <VField
                    name="address"
                    placeholder="Enter your address"
                    type="text"
                    class="input"
                    v-model="personal.address"
                />
            </div>
            <div class="legend-input">
                <label for="fname">Mobile Number:</label>
                <VField
                    name="mobile"
                    placeholder="Enter your number"
                    type="number"
                    class="input"
                    v-model="personal.mobile"
                />
            </div>
            <div class="button-box">
                <v-slide-group v-if="true">
                    <v-btn
                        class="ma-2"
                        rounded
                        type="submit"
                        @click="updatePersonalInfo"
                    >
                        Submit
                    </v-btn>
                </v-slide-group>
            </div>
        </fieldset>
    </VForm>
</template>
<script setup>
import { reactive } from "vue";
import { useFirestore } from "vuefire";
import { doc, setDoc, updateDoc } from "firebase/firestore";
const key = "8myANlkdZmLQ3qccNAeE";
const db = useFirestore();

const personalSchema = {
    fullname: "required|alphaSpaces",
    gender: "gender",
    address: "alphaNum",
    mobile: "integer",
    dob: "required",
};
const personal = {
    fullname: "",
    gender: "",
    address: "",
    mobile: "",
    dob: "",
};
const updatePersonalInfo = async () => {
    await updateDoc(doc(db, "users", key), {
        personal: { ...personal },
    });
};
</script>
<style scoped>
@import "@/assets/profile.css";
</style>
