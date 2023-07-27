<template>
    <div class="registration">
        <div class="form-wrapper">
            <h1 class="form-heading">Login Here</h1>
            <VForm
                class="form"
                :validation-schema="schema"
                @submit="submitData"
            >
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
                        :type="showPassword ? 'password' : 'text'"
                        class="input"
                        v-model="form.password"
                    />
                    <span class="passwordSpan">
                        <img
                            v-if="showPassword"
                            src="../assets/images/hide.png"
                            alt="hide password"
                            @click="showPasswordChange"
                        />
                        <img
                            v-else
                            src="../assets/images/show.png"
                            alt="show password"
                            @click="showPasswordChange"
                        />
                    </span>
                    <ErrorMessage name="password" class="error_message" />
                </div>

                <div class="d-flex justify-space-between flex-wrap-reverse">
                    <div>
                        <v-btn class="me-4 btn-submit" type="submit"
                            >Login</v-btn
                        >
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
import { reactive } from "vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import router from "@/router";

import { useAuthStore } from "@/stores/authStore";
import { useCommonStore } from "@/stores/commonStore";
import { storeToRefs } from "pinia";
import { Ilogin } from "@/types/authTypes";
import { getUsers } from "@/api/api";

const authStore = useAuthStore();
const commonStore = useCommonStore();
const $toast = useToast();

const { isLoggedIn, fullName, isAdmin, userId } = storeToRefs(authStore);
const { showPassword } = storeToRefs(commonStore);
const { showPasswordChange } = commonStore;

const form: Ilogin = reactive({
    email: "",
    password: "",
});

const schema = {
    email: "required|email",
    password: "required",
};

const submitData = async (): Promise<void> => {
    const querySnapshot = await getUsers();

    let userData: any;
    querySnapshot.forEach((doc) => {
        let { register } = doc.data();
        if (
            form.email === register.email &&
            form.password === register.password
        ) {
            localStorage.setItem("userId", doc.id);
            userId.value = doc.id;
            localStorage.setItem("fullName", register.fullName);
            userData = doc.data();
        }
    });

    if (userData) {
        $toast.success("Logged In Successfully", {
            position: "top-right",
        });

        if (userData.register.role === "admin") {
            localStorage.setItem("isAdmin", true);
            isAdmin.value = true;
        }
        localStorage.setItem("isLoggedIn", true);
        isLoggedIn.value = true;
        fullName.value = userData.register.fullName;
        router.replace({ name: "Home" });
    } else {
        alert("Invalid Credentials");
    }
};
</script>

<style scoped>
/* form */
.form-heading {
    font-weight: 900;
}

.registration {
    display: grid;
    place-items: center;
    height: 50vh;
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
