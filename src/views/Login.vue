<template>
  <div class="registration">
    <div class="form-wrapper">
      <h1 class="form-heading">Login Here</h1>
      <VForm class="form" :validation-schema="schema" @submit="submitData">
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

        <v-btn class="me-4 btn-submit" type="submit">Login</v-btn>
        <v-btn type="reset">Clear</v-btn>
      </VForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useFirestore } from "vuefire";
import { collection, getDocs, query, where } from "firebase/firestore";
import router from "@/router";

import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const db = useFirestore();

const { isLoggedIn, fullname } = storeToRefs(authStore);

const form = reactive({
  email: "",
  password: "",
});

const schema = {
  email: "required|email",
  password: "required|min:8|max:12|regex:^(?=.*\\d)(?=.*[^\\w\\d\\s]).+$",
};

const submitData = async () => {
  console.log("submit");

  const querySnapshot = await getDocs(collection(db, "users"));
  let userData;
  querySnapshot.forEach((doc) => {
    let { register } = doc.data();
    console.log(register);
    if (form.email === register.email && form.password === register.password) {
      localStorage.setItem("userId", doc.id);
      localStorage.setItem("firstname", register.firstName);
      localStorage.setItem("lastname", register.lastName);
      userData = doc.data();
    }
  });

  if (userData) {
    localStorage.setItem("isLoggedIn", true);
    isLoggedIn.value = true;
    fullname.value = `${userData.register.firstName} ${userData.register.lastName}`;
    router.replace({ name: "Home" });
  } else {
    alert("Invalid Credentials");
  }
};
</script>

<style scoped>
@import "../assets/main.css";
.registration {
  height: 50vh;
}
</style>
