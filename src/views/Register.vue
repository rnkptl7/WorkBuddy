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
                            v-model="firstName"
                        />
                        <ErrorMessage name="firstname" class="error_message" />
                    </div>

                    <div class="inputDiv w-50 mb-0">
                        <VField
                            name="lastname"
                            placeholder="Lastname*"
                            type="text"
                            class="input lastnameInput"
                            v-model="lastName"
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

                <div class="inputDiv passwordWrapper">
                    <VField
                        name="password"
                        placeholder="Password*"
                        :type="showRegisterPassword ? 'password' : 'text'"
                        class="input"
                        v-model="form.password"
                    />
                    <span class="passwordSpan">
                        <img
                            v-if="showRegisterPassword"
                            src="../assets/images/hide.png"
                            alt="hide password"
                            @click="showRegisterPasswordChange"
                        />
                        <img
                            v-else
                            src="../assets/images/show.png"
                            alt="show password"
                            @click="showRegisterPasswordChange"
                        />
                    </span>
                    <ErrorMessage name="password" class="error_message" />
                </div>

                <div class="inputDiv passwordWrapper">
                    <VField
                        name="confirmPassword"
                        placeholder="Confirm Password*"
                        :type="showConfirmPassword ? 'password' : 'text'"
                        class="input"
                    />
                    <span class="passwordSpan">
                        <img
                            v-if="showConfirmPassword"
                            src="../assets/images/hide.png"
                            alt="hide password"
                            @click="showConfirmPasswordChange"
                        />
                        <img
                            v-else
                            src="../assets/images/show.png"
                            alt="show password"
                            @click="showConfirmPasswordChange"
                        />
                    </span>
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
                            <option value="manager">Manager</option>
                            <option value="trainee">Trainee</option>
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
                            <option value="devops">DevOps</option>
                            <option value="ui-ux">UI/UX</option>
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

                <div class="d-flex justify-space-between flex-wrap-reverse">
                    <div>
                        <v-btn class="me-4 btn-submit" type="submit">
                            Submit
                        </v-btn>
                        <v-btn type="reset">Clear</v-btn>
                    </div>
                    <p class="text-medium-emphasis mb-2">
                        *indicates required field
                    </p>
                </div>
            </VForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, Ref } from "vue";
import { useFirestore } from "vuefire";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "vue-router";
import { useCommonStore } from "@/stores/commonStore";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { IRegister } from "@/types/authTypes";
import { registerUser } from "@/api/api";

const commonStore = useCommonStore();
const db = useFirestore();
const router = useRouter();
const $toast = useToast();

const { showConfirmPassword, showRegisterPassword } = storeToRefs(commonStore);
const { showConfirmPasswordChange, showRegisterPasswordChange } = commonStore;

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

const firstName: Ref<string> = ref("");
const lastName: Ref<string> = ref("");

const form: IRegister = reactive({
    email: "",
    password: "",
    department: "",
    gender: "",
    role: "",
});

const uniqueID = (): string => {
    return Date.now().toString().slice(6);
};

const registerData = async (): Promise<void> => {
    const fullName = `${firstName.value} ${lastName.value}`;

    let userId = await registerUser({ ...form, empID: uniqueID(), fullName });
    if (userId) {
        $toast.success("Registered Successfully", {
            position: "top-right",
        });
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

/* form */
.form-heading {
    font-weight: 900;
}

.registration {
    display: grid;
    place-items: center;
    height: 80vh;
}

.registration h1 {
    text-align: center;
    margin-bottom: 20px;
    color: var(--primary-color);
}

.registration form {
    width: 30rem;
}

.form .inputDiv {
    margin: 15px 0;
}

.form .inputDiv input,
.inputDiv select {
    padding: 10px;
    display: block;
    width: 100%;
    outline: none;
    border: 1px solid var(--primary-color);
}

.btn-submit {
    width: 6rem;
    font-size: 16px;
    text-align: center;
    color: var(--white-text);
    background: var(--primary-color);
}

.error_message {
    color: #f44b4b;
}

@media screen and (max-width: 630px) {
    .registration {
        max-width: 38rem;
    }

    .registration form {
        width: 100%;
    }

    .registration .form-wrapper {
        width: 80%;
    }
}
</style>
