<template>
    <VForm
        :validation-schema="professionalSchema"
        :class="{ editable: !isEdit }"
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
                    <select v-bind="field" class="input" :disabled="isEdit">
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
                    :disabled="isEdit"
                />
            </div>
            <div class="legend-input">
                <label for="totalExp">Total Experience:</label>
                <VField
                    name="totalExp"
                    type="number"
                    class="input"
                    disabled
                    v-model="professional.totalExp"
                />
            </div>
            <div class="button-box" v-if="isAdmin == 'admin'">
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

const db = useFirestore();
const closeForm = () => {
    professional = { ...professionalCopy };
    toggleEdit();
};
const isEdit = ref(true);
const toggleEdit = () => (isEdit.value = !isEdit.value);
const professionalSchema = {
    qualification: "alphaSpaces",
    totalExp: "required",
    cdate: (value) => {
        const inputDate = new Date(value);
        const today = new Date();
        const lastDate = new Date("1923-12-31");
        const dateInFutureError = "Date cannot be in the future";
        const dateInPastError = "Date cannot be earlier than 01-01-1924";
        if (inputDate >= jdate) {
            return dateInFutureError;
        } else if (inputDate <= lastDate) {
            return dateInPastError;
        } else {
            return true;
        }
    },
};
let jdate;
let professional = reactive({
    qualification: "",
    cdate: "",
    totalExp: "",
});
let professionalCopy = {};
const priorData = async () => {
    const docSnap = await getDoc(doc(db, "users", key));
    if (docSnap.exists()) {
        console.log(docSnap.data().professional);
        jdate = docSnap.data().register.jdate;
        professional.cdate = docSnap.data().professional.cdate || "";
        professional.totalExp = docSnap.data().professional.totalExp || "";
        professional.qualification =
            docSnap.data().professional.qualification || "";
        professionalCopy = { ...professional };
    } else {
        return;
    }
};
const updateProfessionalInfo = async () => {
    await updateDoc(doc(db, "users", key), {
        professional: { ...professional },
    });
    toggleEdit();
};
</script>
<style scoped>
@import "@/assets/profile.css";
</style>
