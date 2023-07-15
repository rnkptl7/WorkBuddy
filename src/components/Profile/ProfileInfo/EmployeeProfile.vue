<template>
    <VForm
        :validation-schema="employeeSchema"
        :class="{ editable: !isEdit }"
        @submit="updateEmployeeInfo"
    >
        <fieldset>
            <legend>Employee Details:</legend>
            <div class="legend-input">
                <label for="empID">Employee ID:</label>
                <VField
                    name="empID"
                    type="number"
                    disabled
                    v-model="employee.empID"
                    class="input"
                />
                <ErrorMessage name="empID" class="error_message" />
            </div>
            <div class="legend-input">
                <label for="email">Email ID:</label>
                <VField
                    name="email"
                    type="email"
                    v-model="employee.email"
                    disabled
                    class="input"
                />
                <ErrorMessage name="email" class="error_message" />
            </div>
            <div class="legend-input">
                <label for="department">Department:</label>
                <VField
                    name="department"
                    type="text"
                    v-model="employee.department"
                    disabled
                    class="input"
                />
                <ErrorMessage name="department" class="error_message" />
            </div>
            <div class="legend-input">
                <label for="reporting">Reporting To:</label>
                <VField
                    name="reporting"
                    v-model="employee.reporting"
                    :bails="false"
                    v-slot="{ field, errors }"
                    class="input"
                >
                    <select v-bind="field" class="input" :disabled="isEdit">
                        <option value="" disabled>Select Your Manager</option>
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
                <ErrorMessage name="reporting" class="error_message" />
            </div>
            <div class="legend-input">
                <label for="jdate">Joining Date:</label>
                <VField
                    name="jdate"
                    type="date"
                    class="input"
                    v-model="employee.jdate"
                    disabled
                />
                <ErrorMessage name="jdate" class="error_message" />
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
    getAdmins();
});

const key = localStorage.getItem("userId");
const isAdmin = localStorage.getItem("isAdmin");
const closeForm = () => {
    employee = { ...employeeCopy };
    toggleEdit();
};
const isEdit = ref(true);
const toggleEdit = () => (isEdit.value = !isEdit.value);
const db = useFirestore();

const employeeSchema = {
    empid: "integer",
    email: "email",
    department: "alphaChar",
    reporting: "alphaSpaces",
    jdate: "integer",
};
let employee = reactive({
    email: "",
    empID: "",
    department: "",
    reporting: "",
    jdate: "",
});
let employeeCopy = {};
const adminOption = [];
const priorData = async () => {
    const docSnap = await getDoc(doc(db, "users", key));
    if (docSnap.exists()) {
        employee.email = docSnap.data().register.email || "";
        employee.empID = docSnap.data().register.empID || "";
        employee.department = docSnap.data().register.department || "";
        employee.jdate = docSnap.data().register.jdate || "";
        employee.reporting = docSnap.data().employee.reporting || "";
        employeeCopy = { ...employee };
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
const updateEmployeeInfo = async () => {
    await updateDoc(doc(db, "users", key), {
        employee: { ...employee },
    });
    toggleEdit();
};
</script>

<style scoped>
@import "@/assets/profile.css";
</style>
