<template>
  <div class="registration">
    <div>
      <h1 class="form-heading">Login Here</h1>
      <VForm class="form" :validation-schema="schema" @submit="submitData">

        <div class="inputDiv">
          <VField name="email" placeholder="Email*" type="email" class="input" v-model="form.Email" />
          <ErrorMessage name="email" class="error_message" />
        </div>

        <div class="inputDiv">
          <VField name="password" placeholder="Password*" type="password" class="input" v-model="form.Password" />
          <ErrorMessage name="password" class="error_message" />
        </div>

        <v-btn class="me-4 btn-submit" type="submit"> Login </v-btn>
        <v-btn type="reset">Clear</v-btn>
      </VForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useFirestore } from "vuefire";
import { collection, getDocs } from "firebase/firestore";
import router from "@/router";

import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const db = useFirestore();

const { isLoggedIn, isAdmin } = storeToRefs(authStore);

const form = reactive({
  Email: "",
  Password: "",
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
    let { Email, Password } = doc.data();
    if (form.Email === Email && form.Password === Password) {
      sessionStorage.setItem("userId", doc.id);
      userData = doc.data();
    }
  });

  if (userData) {
    sessionStorage.setItem("isLoggedIn", true);
    isLoggedIn.value = true;
    router.replace({ name: "Home" });
  } else {
    alert("Invalid Credentials");
  }
};
</script>

<style scoped>
.registration {
  height: 50vh;
}

.btn-submit {
  background: #0000003d;
}
</style>
