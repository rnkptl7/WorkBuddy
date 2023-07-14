<template>
    <VForm :validation-schema="otherSchema" @submit="updateOtherInfo">
        <fieldset>
            <legend>Other Details:</legend>
            <div class="legend-input">
                <label for="aadhaar">Aadhaar Number:</label>
                <VField
                    name="aadhaar"
                    placeholder="Enter your UID"
                    type="number"
                    class="input"
                    v-model="other.aadhaar"
                />
                <ErrorMessage name="aadhaar" class="error_message" />
            </div>
            <div class="legend-input">
                <label for="pan">PAN No:</label>
                <VField
                    name="pan"
                    placeholder="Enter your PAN"
                    type="text"
                    class="input"
                    v-model="other.pan"
                />
                <ErrorMessage name="pan" class="error_message" />
            </div>
            <div class="legend-input">
                <label for="nationality">Nationality:</label>
                <VField name="nationality" :bails="false" v-slot="{ errors }">
                    <input
                        list="nationality"
                        id="country"
                        name="nationality"
                        v-model="other.nationality"
                    />
                    <datalist id="nationality">
                        <option value="Australia"></option>
                        <option value="Canada"></option>
                        <option value="France"></option>
                        <option value="Germany"></option>
                        <option value="Japan"></option>
                        <option value="India"></option>
                        <option value="Pakistan"></option>
                        <option value="United Kingdom"></option>
                        <option value="USA"></option>
                    </datalist>
                    <div class="error_message" v-for="err in errors" :key="err">
                        {{ err }}
                    </div>
                </VField>
            </div>
            <div class="button-box">
                <v-slide-group v-if="true">
                    <v-btn
                        class="ma-2"
                        rounded
                        type="submit"
                        @click="updateOtherInfo"
                    >
                        Submit
                    </v-btn>
                    <v-btn class="ma-2" rounded> Edit Info </v-btn>
                </v-slide-group>
            </div>
        </fieldset>
    </VForm>
</template>
<script setup>
import { reactive } from "vue";
import { useFirestore } from "vuefire";
import { doc, setDoc, updateDoc } from "firebase/firestore";

const key = localStorage.getItem("userId");
const db = useFirestore();

const otherSchema = {
    aadhaar: "required|integer",
    pan: "required|alphaNum",
    nationality: "alphaSpaces",
};

const other = {
    aadhaar: "",
    pan: "",
    nationality: "",
};
const updateOtherInfo = async () => {
    console.log(other, "otheerrr");
    await updateDoc(doc(db, "users", key), {
        other: { ...other },
    });
};
</script>
<style scoped>
@import "@/assets/profile.css";
</style>
