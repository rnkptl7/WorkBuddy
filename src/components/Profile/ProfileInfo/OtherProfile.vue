<template>
    <VForm
        :validation-schema="otherSchema"
        :class="{ editable: !isEdit }"
        @submit="updateOtherInfo"
    >
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
                    :disabled="isEdit"
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
                    :disabled="isEdit"
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
                        :disabled="isEdit"
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

let personalCopy = {};
const db = useFirestore();
const closeForm = () => {
    other = { ...otherCopy };
    toggleEdit();
};
const isEdit = ref(true);
const toggleEdit = () => (isEdit.value = !isEdit.value);

const otherSchema = {
    aadhaar: "integer",
    pan: "alphaNum",
    nationality: "alphaSpaces",
};

let other = reactive({
    aadhaar: "",
    pan: "",
    nationality: "",
});
let otherCopy = {};
const priorData = async () => {
    const docSnap = await getDoc(doc(db, "users", key));
    if (docSnap.exists()) {
        console.log(docSnap.data().other);
        other.aadhaar = docSnap.data().other.aadhaar || "";
        other.pan = docSnap.data().other.pan || "";
        other.nationality = docSnap.data().other.nationality || "";
        otherCopy = { ...other };
    } else {
        return;
    }
};
const updateOtherInfo = async () => {
    console.log(other, "otheerrr");
    await updateDoc(doc(db, "users", key), {
        other: { ...other },
    });
    toggleEdit();
};
</script>
<style scoped>
@import "@/assets/profile.css";
</style>
