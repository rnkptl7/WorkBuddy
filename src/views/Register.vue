<template>
  <div class="registration v-col-8">
    <form @submit.prevent="registerData">
      <v-text-field
        v-model="form.FirstName"
        :counter="10"
        label="Firstname"
        required
      ></v-text-field>

      <v-text-field
        v-model="form.LastName"
        label="Lastname"
        required
      ></v-text-field>

      <v-text-field v-model="form.Email" label="E-mail" required></v-text-field>

      <v-text-field
        v-model="form.Password"
        label="Password"
        required
      ></v-text-field>

      <v-select
        v-model="form.Department"
        label="Department"
        :items="['Frontend', 'Backend', 'HR', 'QA']"
        required
      ></v-select>

      <v-select
        v-model="form.Gender"
        label="Gender"
        :items="['Male', 'Female']"
        required
      ></v-select>

      <v-select
        v-model="form.Role"
        label="Role"
        :items="['Employee', 'Admin']"
        required
      ></v-select>

      <v-date-picker></v-date-picker>

      <v-btn class="me-4" type="submit"> submit </v-btn>
      <v-btn> clear </v-btn>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useFirestore } from "vuefire";
import { getDocs, collection, addDoc } from "firebase/firestore";

const db = useFirestore();

const form = reactive({
  FirstName: "",
  LastName: "",
  Email: "",
  Password: "",
  Department: "",
  Gender: "",
  Role: "",
});

const registerData = () => {
  addDoc(collection(db, "users"), form);
};
</script>

<style scoped></style>
