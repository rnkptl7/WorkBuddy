<template>
  <div class="registration">
    <div>
      <h1 class="form-heading">Register Here</h1>
      <VForm class="form" :validation-schema="schema" @submit="registerData">
        <div class="d-flex justify-space-between">
          <div class="inputDiv w-50 mb-0">
            <VField
              name="firstname"
              placeholder="Firstname*"
              type="text"
              class="input"
              v-model="form.FirstName"
            />
            <ErrorMessage name="firstname" class="error_message" />
          </div>

          <div class="inputDiv w-50 mb-0">
            <VField
              name="lastname"
              placeholder="Lastname*"
              type="text"
              class="input"
              v-model="form.LastName"
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
            v-model="form.Email"
          />
          <ErrorMessage name="email" class="error_message" />
        </div>

        <div class="inputDiv">
          <VField
            name="password"
            placeholder="Password*"
            type="password"
            class="input"
            v-model="form.Password"
          />
          <ErrorMessage name="password" class="error_message" />
        </div>

        <div class="inputDiv">
          <VField
            name="confirmPassword"
            placeholder="Confirm Password*"
            type="password"
            class="input"
            v-model="form.confirmPassword"
          />
          <ErrorMessage name="confirmPassword" class="error_message" />
        </div>

        <div class="form-group">
          <div>
            <label for="gender" class="genderLabel">Gender:* </label>
            <label class="radioLabel">
              <VField
                type="radio"
                name="gender"
                value="Male"
                v-model="form.Gender"
              />
              Male
            </label>
            <label class="radioLabel">
              <VField
                type="radio"
                name="gender"
                value="Female"
                v-model="form.Gender"
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
            v-model="form.Role"
          >
            <select v-bind="field" class="input">
              <option disabled value="">Select a role*</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
            <div class="error_message" v-for="err in errors" :key="err">
              {{ err }}
            </div>
          </VField>
        </div>

        <div class="inputDiv">
          <VField
            name="department"
            :bails="false"
            v-slot="{ field, errors }"
            v-model="form.Department"
          >
            <select v-bind="field" class="input">
              <option disabled value="">Select Your Department*</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="hr">HR</option>
              <option value="qa">QA</option>
            </select>
            <div class="error_message" v-for="err in errors" :key="err">
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

const db = useFirestore();

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
  FirstName: "",
  LastName: "",
  Email: "",
  Password: "",
  Department: "",
  Gender: "",
  Role: "",
});

const registerData = () => {
  console.log("Register");
  addDoc(collection(db, "users"), form);
};
</script>

<style scoped>
.btn-submit {
  background: #0000003d;
}
</style>
