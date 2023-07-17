<template>
    <VForm
        :class="{ editable: !isEdit }"
        :validation-schema="professionalSchema"
        @submit="updateProfessionalInfo"
    >
        <fieldset>
            <legend>Professional Details:</legend>
            <div class="legend-input">
                <label for="qualification">Qualification:</label>
                <VField name="qualification" :bails="false" v-slot="{ errors }">
                    <input
                        list="qualification"
                        id="country"
                        name="qualification"
                        v-model="professional.qualification"
                        :disabled="isEdit"
                        class="input"
                    />
                    <datalist id="qualification">
                        <option value="M.Tech"></option>
                        <option value="B.Tech/B.E"></option>
                        <option value="Diploma"></option>
                        <option value="HSC/SSC"></option>
                    </datalist>
                    <div class="error_message" v-for="err in errors" :key="err">
                        {{ err }}
                    </div>
                </VField>
            </div>
            <div class="legend-input">
                <label for="cdate">Career Start Date:</label>
                <div>
                    <VField
                        name="cdate"
                        type="date"
                        class="input"
                        v-model="professional.cdate"
                        :disabled="isEdit"
                    />
                    <ErrorMessage name="cdate" class="error_message" />
                </div>
            </div>

            <div class="legend-input">
                <label for="totalExp">Total Experience:</label>
                <VField
                    name="totalExp"
                    type="integer"
                    class="input"
                    disabled
                    v-model="professional.totalExp"
                />
            </div>
            <ErrorMessage name="totalExp" class="error_message" />

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
import { reactive, ref, onMounted, computed, watch } from "vue";
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
    cdate: (value) => {
        const inputDate = new Date(value);
        const joiningDate = new Date(jdate);
        const dateInFutureError = "Date cannot be ahead of Joining Date";
        if (inputDate > joiningDate) {
            return dateInFutureError;
        }
        return true;
    },
};

function calculateExperience() {
    const experience = new Date(professional.experience);
    const expInMilliSecond = Date.now() - experience.getTime();
    const expDate = new Date(expInMilliSecond);
    const calculatedExperience = Math.abs(expDate.getUTCFullYear() - 1970);
    professional.experience = calculatedExperience;
}
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
        jdate = docSnap.data().employee.jdate;
        console.log(jdate, "///////////");
        professional.cdate = docSnap.data().professional.cdate || "";
        professional.totalExp = docSnap.data().professional.totalExp || "";
        professional.qualification =
            docSnap.data().professional.qualification || "";
        professionalCopy = { ...professional };
    } else {
        return;
    }
};

watch(
    () => professional.cdate,
    (newValue) => {
        const diff = new Date() - new Date(newValue);
        const seconds = diff / 1000;
        const years = Math.floor(seconds / 31536000);
        const months = Math.floor((seconds % 31536000) / 86400 / 30);
        professional.totalExp = `${years}Y ${months}M`;
    },
    { deep: true }
);

const updateProfessionalInfo = async () => {
    console.log("::::::::::::::::");
    console.log("Updating");
    await updateDoc(doc(db, "users", key), {
        professional,
    });
    toggleEdit();
    console.log(professional, "::::::::::::::::");
};
</script>
<style scoped>
@import "@/assets/profile.css";
</style>
