<template>
    <div class="registration">
        <div class="form-wrapper">
            <h1 class="form-heading">Register Here</h1>
            <VForm
                class="form"
                :validation-schema="schema"
                @submit="registerData"
            >
                <div class="d-flex justify-space-between">
                    <div class="inputDiv w-50 mb-0">
                        <VField
                            name="firstname"
                            placeholder="Firstname*"
                            type="text"
                            class="input"
                            v-model="form.firstName"
                        />
                        <ErrorMessage name="firstname" class="error_message" />
                    </div>

                    <div class="inputDiv w-50 mb-0">
                        <VField
                            name="lastname"
                            placeholder="Lastname*"
                            type="text"
                            class="input lastnameInput"
                            v-model="form.lastName"
                        />
                        <ErrorMessage name="lastname" class="error_message" />
                    </div>
                </div>

                <div class="inputDiv">
                    <VField
                        name="email"
                        placeholder="Email*"
                        type="email"
                        class="input"
                        v-model="form.email"
                    />
                    <ErrorMessage name="email" class="error_message" />
                </div>

                <div class="inputDiv">
                    <VField
                        name="password"
                        placeholder="Password*"
                        type="password"
                        class="input"
                        v-model="form.password"
                    />
                    <ErrorMessage name="password" class="error_message" />
                </div>

                <div class="inputDiv">
                    <VField
                        name="confirmPassword"
                        placeholder="Confirm Password*"
                        type="password"
                        class="input"
                    />
                    <ErrorMessage
                        name="confirmPassword"
                        class="error_message"
                    />
                </div>

                <div class="form-group">
                    <div>
                        <label for="gender" class="genderLabel"
                            >Gender:*
                        </label>
                        <label class="radioLabel">
                            <VField
                                type="radio"
                                name="gender"
                                value="Male"
                                v-model="form.gender"
                            />
                            Male
                        </label>
                        <label class="radioLabel">
                            <VField
                                type="radio"
                                name="gender"
                                value="Female"
                                v-model="form.gender"
                            />
                            Female
                        </label>
                    </div>
                    <ErrorMessage name="gender" class="error_message" />
                </div>

                <div class="inputDiv">
                    <VField
                        name="role"
                        :bails="false"
                        v-slot="{ field, errors }"
                        v-model="form.role"
                    >
                        <select v-bind="field" class="input">
                            <option disabled value="">Select a role*</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                        <div
                            class="error_message"
                            v-for="err in errors"
                            :key="err"
                        >
                            {{ err }}
                        </div>
                    </VField>
                </div>

                <div class="inputDiv">
                    <VField
                        name="department"
                        :bails="false"
                        v-slot="{ field, errors }"
                        v-model="form.department"
                    >
                        <select v-bind="field" class="input">
                            <option disabled value="">
                                Select Your Department*
                            </option>
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="hr">DevOps</option>
                            <option value="qa">QA</option>
                        </select>
                        <div
                            class="error_message"
                            v-for="err in errors"
                            :key="err"
                        >
                            {{ err }}
                        </div>
                    </VField>
                </div>

                <v-btn class="me-4 btn-submit" type="submit"> Submit </v-btn>
                <v-btn type="reset">Clear</v-btn>
            </VForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useFirestore } from "vuefire";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "vue-router";

const db = useFirestore();
const router = useRouter();

const schema = {
    firstname: "required|alphaChar",
    lastname: "required|alphaChar",
    email: "required|email",
    password: "required|min:8|max:12|regex:^(?=.*\\d)(?=.*[^\\w\\d\\s]).+$",
    confirmPassword: "required|confirmed:@password",
    role: "select",
    department: "department",
    gender: "gender",
};

const form = reactive({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    department: "",
    gender: "",
    role: "",
});

const uniqueID = () => {
    return Date.now().toString().slice(6);
};

const registerData = async () => {
    console.log("Register");

    const data = await addDoc(collection(db, "users"), {
        register: { ...form, empID: uniqueID() },
    });
    if (data.id) {
        router.replace({ name: "Login" });
    }
};
</script>

<style scoped>
@import "../assets/main.css";

select,
.form-group {
    color: var(--input-text);
}

.lastnameInput {
    border-left: none !important;
}
</style>
