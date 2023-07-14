<template>
    <VForm :validation-schema="employeeSchema" @submit="updateEmployeeInfo">
        <!-- -------------------------------------------------------------------------------- -->
        <fieldset>
            <legend>Employee Details:</legend>
            <div class="legend-input">
                <label for="empID">Employee ID:</label>
                <VField name="empID" type="number" disabled />
            </div>
            <div class="legend-input">
                <label for="email">Email ID:</label>
                <VField name="email" type="email" v-model="employee.email" />
            </div>
            <div class="legend-input">
                <label for="password">Password:</label>
                <VField
                    name="password"
                    type="password"
                    class="input"
                    v-model="employee.password"
                />
            </div>
            <div class="legend-input">
                <label for="reporting">Reporting To:</label>
                <VField
                    name="reporting"
                    v-model="employee.reporting"
                    :bails="false"
                    v-slot="{ field, errors }"
                >
                    <select v-bind="field" class="input">
                        <option disabled value="">Select Your Manager ></option>
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="hr">HR</option>
                        <option value="qa">QA</option>
                    </select>
                    <div class="error_message" v-for="err in errors" :key="err">
                        {{ err }}
                    </div>
                </VField>
            </div>
            <div class="legend-input">
                <label for="jdate">Joining Date:</label>
                <VField
                    name="jdate"
                    type="date"
                    class="input"
                    v-model="employee.jdate"
                />
            </div>
            <div class="button-box">
                <v-slide-group v-if="true">
                    <v-btn
                        class="ma-2"
                        rounded
                        type="submit"
                        @click="updateEmployeeInfo"
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

const key = "ZUZRVEM3jGq0wOFbajx7";
const db = useFirestore();

const employeeSchema = {
    empid: "required|integer",
    email: "required|email",
    password: "required",
    reporting: "alphaSpaces",
    jdate: "integer",
};
const employee = {
    email: "",
    password: "",
    reporting: "",
    jdate: "",
};
const updateEmployeeInfo = async () => {
    await updateDoc(doc(db, "users", key), {
        employee: { ...employee },
    });
};
</script>
<style scoped>
@import "@/assets/profile.css";
</style>