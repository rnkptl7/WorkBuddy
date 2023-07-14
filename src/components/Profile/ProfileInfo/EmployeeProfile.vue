<template>
    <VForm :validation-schema="employeeSchema" @submit="updateEmployeeInfo">
        <fieldset>
            <legend>Employee Details:</legend>
            <div class="legend-input">
                <label for="empID">Employee ID:</label>
                <VField
                    name="empID"
                    type="number"
                    disabled
                    v-model="employee.empID"
                />
            </div>
            <div class="legend-input">
                <label for="email">Email ID:</label>
                <VField
                    name="email"
                    type="email"
                    v-model="employee.email"
                    disabled
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
                        <option
                            v-for="option in adminOption"
                            :value="option.value"
                            :key="option.id"
                        >
                            {{ option.label }}
                        </option>
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
import { reactive, onMounted } from "vue";
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

const key = localStorage.getItem("userId");

const db = useFirestore();
onMounted(() => {
    priorData();
    getAdmins();
});
const employeeSchema = {
    empid: "required|integer",
    email: "required|email",
    password: "required",
    reporting: "alphaSpaces",
    jdate: "integer",
};
const employee = reactive({
    email: "",
    empID: "",
    password: "",
    reporting: "",
    jdate: "",
});

const updateEmployeeInfo = async () => {
    await updateDoc(doc(db, "users", key), {
        employee: { ...employee },
    });
};
const adminOption = [];
const priorData = async () => {
    const docSnap = await getDoc(doc(db, "users", key));
    if (docSnap.exists()) {
        employee.email = docSnap.data().register.email;
        employee.empID = docSnap.data().register.empID;
    } else {
        return;
    }
};
const getAdmins = async () => {
    const q = query(
        collection(db, "users"),
        where("register.role", "==", "admin")
    );
    const querySnap = await getDocs(q);

    querySnap.forEach((doc) => {
        adminOption.push({
            id: doc.data().register.empID,
            label: `${doc.data().register.firstName} ${
                doc.data().register.lastName
            }`,
            value: `${doc.data().register.firstName} ${
                doc.data().register.lastName
            }`,
        });
    });
};
</script>

<style scoped>
@import "@/assets/profile.css";
</style>
