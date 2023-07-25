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
                <div>
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
            </div>
            <div class="legend-input">
                <label for="pan">PAN No:</label>
                <div>
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
                        class="input"
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
import { reactive, ref, onMounted } from "vue";
import { Other } from "../../../types/profileTypes";
import { updateUserDetail, getUserDetail } from "../../../api/api";

onMounted(() => {
    priorData();
});

const userId = localStorage.getItem("userId");
const closeForm = () => {
    other = { ...otherCopy } as Other;
    toggleEdit();
};
const isEdit = ref(true);
const toggleEdit = () => (isEdit.value = !isEdit.value);

const otherSchema = {
    aadhaar: "numeric|min:12|max:12",
    pan: "alphaNum|min:10|max:10",
    nationality: "alphaSpaces",
};

let other: Other = reactive({
    aadhaar: "",
    pan: "",
    nationality: "",
});

let otherCopy = {};

const priorData = async (): Promise<void> => {
    const docSnap = await getUserDetail(userId);
    const otherData = docSnap.data()?.other;
    other.aadhaar = otherData?.aadhaar || "";
    other.pan = otherData?.pan || "";
    other.nationality = otherData?.nationality || "";
    otherCopy = { ...other };
};

const updateOtherInfo = async (): Promise<void> => {
    await updateUserDetail(userId, {
        other,
    });
    toggleEdit();
};
</script>
<style scoped>
@import "@/assets/profile.css";
</style>
