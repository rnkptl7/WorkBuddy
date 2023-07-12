<template>
  <div class="registration">
    <form @submit.prevent="submitData">
      <v-text-field v-model="form.Email" label="E-mail" required></v-text-field>

      <v-text-field
        v-model="form.Password"
        label="Password"
        required
      ></v-text-field>

      <v-btn class="me-4" type="submit"> Submit </v-btn>
      <v-btn>Clear</v-btn>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useFirestore } from "vuefire";
import { collection, getDocs } from "firebase/firestore";
import router from "@/router";

const db = useFirestore();

const form = reactive({
  Email: "",
  Password: "",
});

const submitData = async () => {
  console.log("submit");

  const querySnapshot = await getDocs(collection(db, "users"));
  let userData;
  querySnapshot.forEach((doc) => {
    let { Email, Password } = doc.data();
    // console.log(doc.id, " => ", doc.data().Password);
    // console.log(Email, Password);
    if (form.Email === Email && form.Password === Password) {
      userData = doc.data();
    }
  });

  if (userData) {
    sessionStorage.setItem("isLoggedIn", true);
    router.replace({ name: "Home" });
  } else {
    alert("Invalid Credentials");
  }
};
</script>

<style scoped>
.registration {
  display: grid;
  place-items: center;
  height: 50vh;
}
.registration form {
  width: 30rem;
}
</style>
