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
                <div>
                    <VField
                        name="empID"
                        type="number"
                        disabled
                        v-model="employee.empID"
                        class="input"
                    />
                    <ErrorMessage name="empID" class="error_message" />
                </div>
            </div>
            <div class="legend-input">
                <label for="email">Email ID:</label>
                <div>
                    <VField
                        name="email"
                        type="email"
                        v-model="employee.email"
                        disabled
                        class="input"
                    />
                    <ErrorMessage name="email" class="error_message" />
                </div>
            </div>
            <div class="legend-input">
                <label for="department">Department:</label>
                <div>
                    <VField
                        name="department"
                        type="text"
                        v-model="employee.department"
                        disabled
                        class="input"
                    />
                    <ErrorMessage name="department" class="error_message" />
                </div>
            </div>
            <div class="legend-input">
                <label for="reporting">Reporting To:</label>
                <div>
                    <VField name="reporting" :bails="false" v-slot="{ errors }">
                        <input
                            list="reportingOptions"
                            id="reporting"
                            name="reporting"
                            v-model="employee.reporting"
                            :disabled="isEdit"
                            class="input"
                        />
                        <datalist id="reportingOptions">
                            <option
                                v-for="option in adminOption"
                                :value="option.value"
                                :key="option.id"
                            >
                                {{ option.label }}
                            </option>
                        </datalist>
                        <div
                            class="error_message"
                            v-for="err in errors"
                            :key="err"
                        >
                            {{ err }}
                        </div>
                    </VField>
                    <ErrorMessage name="reporting" class="error_message" />
                </div>
            </div>

            <div class="legend-input">
                <label for="jdate">Joining Date:</label>
                <div>
                    <VField
                        name="jdate"
                        type="date"
                        class="input"
                        v-model="employee.jdate"
                        :disabled="isEdit"
                        :max="useMaxDate"
                    />
                    <ErrorMessage name="jdate" class="error_message" />
                </div>
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
import { reactive, ref, Ref, onMounted, computed } from "vue";
import { Employee } from "../../../types/profileTypes";
import { updateUserDetail, getUserDetail, getAdmins } from "../../../api/api";
import { useMaxDate } from "../../../composables/maxdate";

const userId = localStorage.getItem("userId");
const isEdit = ref(true);
const toggleEdit = () => {
    isEdit.value = !isEdit.value;
};
const closeForm = () => {
    employee = { ...employeeCopy } as Employee;
    toggleEdit();
};
const adminOption: Ref<Object[]> = ref([]);

onMounted(() => {
    priorData();
    getAdmin();
});

const employeeSchema = {
    empid: "integer",
    email: "email",
    reporting: "alphaSpaces",
    jdate: (value: string): string | boolean => {
        const inputDate = new Date(value);
        const today = new Date();
        const dateInFutureError = "Date cannot be in the future";
        if (inputDate > today) {
            return dateInFutureError;
        } else {
            return true;
        }
    },
};
let employee: Employee = reactive({
    email: "",
    empID: "",
    department: "",
    reporting: "",
    jdate: null,
});

let employeeCopy: Partial<Employee> = {};

const getAdmin = async () => {
    const querySnap = await getAdmins(userId);
    adminOption.value = querySnap.docs.map((doc) => ({
        id: doc.data().register.empID,
        label: doc.data().register.fullName,
        value: doc.data().register.fullName,
    }));
};

const priorData = async (): Promise<void> => {
    const docSnap = await getUserDetail(userId);
    const { register, employee: employeeData } = docSnap.data();
    employee.email = register.email || "";
    employee.empID = register.empID || "";
    employee.department = register.department || "";
    employee.jdate = employeeData?.jdate || "";
    employee.reporting = employeeData?.reporting || "";
    employeeCopy = { ...employee };
};

const updateEmployeeInfo = async () => {
    await updateUserDetail(userId, {
        employee,
    });
    toggleEdit();
};
</script>

<style scoped>
@import "@/assets/profile.css";
</style>
