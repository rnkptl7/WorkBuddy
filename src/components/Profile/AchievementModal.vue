<template>
    <v-row justify="end">
        <v-dialog v-model="dialog" persistent width="500">
            <v-card>
                <div class="pa-5">
                    <h2>Add Achievements</h2>
                    <v-divider class="py-1"></v-divider>
                    <VForm class="form" @submit="updateAchievement">
                        <div
                            class="inputDiv flex-column justify-space-around w-100"
                        >
                            <div class="date_input_wrapper w-50">
                                <label for="titleDate ">Date</label>
                                <input
                                    name="titleDate"
                                    type="date"
                                    class="input w-100"
                                    v-model="achievement.titleDate"
                                />
                                <ErrorMessage
                                    name="title"
                                    class="error_message"
                                />
                            </div>
                        </div>
                        <div class="inputDiv">
                            <input
                                name="title"
                                placeholder="Achievement Title*"
                                type="text"
                                class="input"
                                v-model="achievement.title"
                            />
                            <ErrorMessage name="title" class="error_message" />
                        </div>
                        <div class="inputDiv">
                            <textarea
                                name="titleDescription"
                                placeholder="Description*"
                                type="text"
                                class="input"
                                v-model="achievement.titleDescription"
                            />
                            <ErrorMessage
                                name="titleDescription"
                                class="error_message"
                            />
                        </div>

                        <small>*indicates required field</small>

                        <v-spacer></v-spacer>
                        <div class="d-flex justify-end">
                            <v-btn type="reset" @click="closeModal"
                                >Cancel</v-btn
                            >
                            <v-btn
                                class="me-4 text-white ml-2 btn-submit"
                                type="submit"
                                color="#115173"
                            >
                                Submit
                            </v-btn>
                        </div>
                    </VForm>
                </div>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script setup>
import { useProfileStore } from "../../stores/profileStore";
import { reactive, ref, onMounted, watch } from "vue";
import { useFirestore } from "vuefire";
import { doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { storeToRefs } from "pinia";

const store = useProfileStore();
const { getAchievement } = store;

const { openModal: dialog, userId: userId } = storeToRefs(store);
const db = useFirestore();

let achievement = reactive({
    titleDate: "",
    title: "",
    titleDescription: "",
});

function closeModal() {
    dialog.value = false;
}
async function updateAchievement() {
    const userDoc = doc(db, "users", userId.value);

    await updateDoc(userDoc, {
        achievementList: arrayUnion(achievement),
    });
    await getAchievement();
    achievement = {
        titleDate: "",
        title: "",
        titleDescription: "",
    };
    closeModal();
}
</script>
<style scoped>
.btn {
    display: flex;
    justify-content: center;
    align-items: center;
}

#plus {
    font-size: 2rem;
    font-weight: 300;
    margin-top: -4px;
    padding-right: 2px;
}

.form-heading {
    font-weight: 900;
}

.form-heading::after {
    content: "";
    width: 50%;
    height: 2px;
    background: #000000;
    display: block;
    margin: auto;
}

.form .inputDiv {
    margin: 15px 0;
    display: flex;
}

.form .inputDiv input,
textarea,
.inputDiv select {
    padding: 10px;
    display: block;
    width: 100%;
    outline: none;
    border: 1px solid #0000003d;
}

.form .inputDiv .date_input_wrapper {
    width: 40%;
}

.error_message {
    color: #f44b4b;
}
</style>
