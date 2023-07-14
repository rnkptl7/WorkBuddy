<template>
    <VForm
        :validation-schema="professionalSchema"
        @submit="updateProfessionalInfo"
    >
        <fieldset>
            <legend>Professional Details:</legend>
            <div class="legend-input">
                <label for="qualification">Qualification :</label>
                <VField
                    name="qualification"
                    :bails="false"
                    v-slot="{ field, errors }"
                    v-model="professional.qualification"
                >
                    <select v-bind="field" class="input">
                        <option disabled value="">Select Your Degree ></option>
                        <option value="btech">B.E/B.Tech</option>
                        <option value="mtech">M.Tech</option>
                        <option value="diploma">Diploma</option>
                        <option value="hsc/ssc">HSC/SSC</option>
                    </select>
                    <div class="error_message" v-for="err in errors" :key="err">
                        {{ err }}
                    </div>
                </VField>
            </div>
            <div class="legend-input">
                <label for="cdate">Career Start Date:</label>
                <VField
                    name="cdate"
                    type="date"
                    class="input"
                    v-model="professional.cdate"
                />
            </div>
            <div class="legend-input">
                <label for="totalExp">Total Experience:</label>
                <VField
                    name="totalExp"
                    type="number"
                    class="input"
                    v-model="professional.totalExp"
                    disabled
                />
            </div>
            <div class="button-box">
                <v-slide-group v-if="true">
                    <v-btn
                        class="ma-2"
                        rounded
                        type="submit"
                        @click="updateProfessionalInfo"
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
const professionalSchema = {
    qualification: "required|alphaSpaces",
    cdate: "required",
    totalExp: "required",
};
const professional = {
    qualification: "",
    cdate: "",
    totalExp: "",
};
const updateProfessionalInfo = async () => {
    await updateDoc(doc(db, "users", key), {
        professional: { ...professional },
    });
};
</script>
<style scoped>
@import "@/assets/profile.css";
</style>
