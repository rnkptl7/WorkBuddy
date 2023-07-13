<template>
    <main>
        <div class="personal-info">
            <VForm
                class="form-fields"
                :validation-schema="personalSchema"
                @submit="personalInfo"
            >
                <fieldset>
                    <legend>Personal Details:</legend>
                    <div class="legend-input">
                        <label for="fname">Full Name:</label>
                        <VField
                            name="name"
                            placeholder="Enter your fullname"
                            type="text"
                            class="input"
                            v-model="personal.Fullname"
                        />
                    </div>
                    <div class="legend-input">
                        <label for="gender" class="genderLabel">Gender: </label>
                        <label class="radioLabel d-flex">
                            <VField
                                type="radio"
                                name="gender"
                                value="Male"
                                v-model="personal.Gender"
                            />
                            Male
                        </label>
                        <label class="radioLabel d-flex">
                            <VField
                                type="radio"
                                name="gender"
                                value="Female"
                                v-model="personal.Gender"
                            />
                            Female
                        </label>
                    </div>
                    <div class="legend-input">
                        <label for="dob">DOB*</label>
                        <VField
                            name="dob"
                            type="date"
                            class="input"
                            v-model="personal.DOB"
                        />
                    </div>
                    <div class="legend-input">
                        <label for="fname">Home Address:</label>
                        <VField
                            name="address"
                            placeholder="Enter your address"
                            type="text"
                            class="input"
                            v-model="personal.Address"
                        />
                    </div>
                    <div class="legend-input">
                        <label for="fname">Mobile Number:</label>
                        <VField
                            name="mobile"
                            placeholder="Enter your number"
                            type="number"
                            class="input"
                            v-model="personal.Mobile"
                        />
                    </div>
                    <div class="button-box">
                        <v-slide-group v-if="true">
                            <v-btn
                                class="ma-2"
                                rounded
                                type="submit"
                                @click="personalInfo(key, personal)"
                            >
                                Submit
                            </v-btn>
                        </v-slide-group>
                    </div>
                </fieldset>
            </VForm>
            <VForm class="form-fields">
                <!-- -------------------------------------------------------------------------------- -->
                <fieldset>
                    <legend>Employee Details:</legend>
                    <div class="legend-input">
                        <label for="empid">Employee ID:</label>
                        <VField name="empid" type="number" disabled />
                    </div>
                    <div class="legend-input">
                        <label for="email">Email ID:</label>
                        <VField name="email" type="email" />
                    </div>
                    <div class="legend-input">
                        <label for="password">Password:</label>
                        <VField name="password" type="password" class="input" />
                    </div>
                    <div class="legend-input">
                        <label for="reporting">Reporting To:</label>
                        <VField
                            name="reporting"
                            :bails="false"
                            v-slot="{ field, errors }"
                        >
                            <select v-bind="field" class="input">
                                <option disabled value="">
                                    Select Your Manager >
                                </option>
                                <option value="frontend">Frontend</option>
                                <option value="backend">Backend</option>
                                <option value="hr">HR</option>
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
                    <div class="legend-input">
                        <label for="jdate">Joining Date:</label>
                        <VField name="jdate" type="date" class="input" />
                    </div>
                    <div class="button-box">
                        <v-slide-group v-if="true">
                            <v-btn class="ma-2" rounded> Submit </v-btn>
                            <v-btn class="ma-2" rounded> Edit Info </v-btn>
                        </v-slide-group>
                    </div>
                </fieldset>
                <!-- -------------------------------------------------------------------------------- -->
                <fieldset>
                    <legend>Professional Details:</legend>
                    <div class="legend-input">
                        <label for="qualification">Qualification :</label>
                        <VField
                            name="qualification"
                            :bails="false"
                            v-slot="{ field, errors }"
                        >
                            <select v-bind="field" class="input">
                                <option disabled value="">
                                    Select Your Degree >
                                </option>
                                <option value="btech">B.E/B.Tech</option>
                                <option value="mtech">M.Tech</option>
                                <option value="diploma">Diploma</option>
                                <option value="hsc/ssc">HSC/SSC</option>
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
                    <div class="legend-input">
                        <label for="cdate">Career Start Date:</label>
                        <VField name="cdate" type="date" class="input" />
                    </div>
                    <div class="legend-input">
                        <label for="total-exp">Total Experience:</label>
                        <VField
                            name="age"
                            type="number"
                            class="input"
                            disabled
                        />
                    </div>
                    <div class="button-box">
                        <v-slide-group v-if="true">
                            <v-btn class="ma-2" rounded type="submit">
                                Submit
                            </v-btn>
                            <v-btn class="ma-2" rounded> Edit Info </v-btn>
                        </v-slide-group>
                    </div>
                </fieldset>
                <!-- -------------------------------------------------------------------------------- -->

                <fieldset>
                    <legend>Other Details:</legend>
                    <div class="legend-input">
                        <label for="aadhaar">Aadhaar Number:</label>
                        <VField
                            name="aadhaar"
                            placeholder="Enter your UID"
                            type="number"
                            class="input"
                        />
                    </div>
                    <div class="legend-input">
                        <label for="pan">PAN No:</label>
                        <VField
                            name="pan"
                            placeholder="Enter your PAN"
                            type="text"
                            class="input"
                        />
                    </div>
                    <div class="legend-input">
                        <label for="qualification">Qualification :</label>
                        <VField
                            name="qualification"
                            :bails="false"
                            v-slot="{ field, errors }"
                        >
                            <input
                                list="countries"
                                id="country"
                                name="country"
                            />
                            <datalist id="countries">
                                <option value="Australia"></option>
                                <option value="Canada"></option>
                                <option value="France"></option>
                                <option value="Germany"></option>
                                <option value="Japan"></option>
                                <option value="India"></option>
                                <option value="Pakistan"></option>
                                <option value="United Kingdom"></option>
                                <option value="USA"></option>
                            </datalist>
                            <div
                                class="error_message"
                                v-for="err in errors"
                                :key="err"
                            >
                                {{ err }}
                            </div>
                        </VField>
                    </div>
                    <div class="button-box">
                        <v-slide-group v-if="true">
                            <v-btn class="ma-2" rounded> Submit </v-btn>
                            <v-btn class="ma-2" rounded> Edit Info </v-btn>
                        </v-slide-group>
                    </div>
                </fieldset>
            </VForm>
        </div>
    </main>
</template>
<script setup>
import { reactive } from "vue";
import { useFirestore } from "vuefire";
import { getDocs, collection, addDoc } from "firebase/firestore";
const key = "iDjXXxd0BnMqBgLBgMBc";
const personalSchema = {
    fullname: "required|alphaSpaces",
    gender: "gender",
    address: "alphaNum",
    number: "integer",
};

const personal = reactive({
    Fullname: "",
    Gender: "",
    DOB: "",
    Address: "",
    Mobile: "",
});

const db = useFirestore();

const personalInfo = async (documentId, fieldKey) => {
    console.log(key, fieldKey, "-----===========-------------");
    const documentRef = db.collection("users").doc(documentId);

    try {
        await documentRef.update({
            [fieldKey]: personal.value,
        });
        console.log("Field updated successfully!");
    } catch (error) {
        console.error("Error updating field:", error);
    }
};
</script>
<style scoped>
.form-fields {
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
}
fieldset {
    padding: 10px 20px;
    width: 40%;
    margin: 20px;
}

legend {
    background: orange;
    padding: 5px 10px;
    border-radius: 10px;
}

.legend-input {
    margin: 15px 0;
    display: flex;
}
.legend-input label {
    width: 20%;
}
.legend-input input,
select {
    width: 70%;
    border-bottom: 1px solid orange;
    padding: 5px 10px;
    margin-left: 10px;
    outline: none;
}
.button-box {
    display: flex;
    justify-content: center;
}
:disabled {
    cursor: not-allowed;
}
.error_message {
    color: red;
    position: relative;
}
</style>
