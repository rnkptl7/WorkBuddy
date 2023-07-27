<template>
    <v-row justify="end">
        <v-dialog v-model="dialog" persistent width="500">
            <v-card>
                <div class="pa-5">
                    <h2 class="achievement-header">Add Achievements</h2>
                    <v-divider class="py-1"></v-divider>
                    <VForm
                        class="form"
                        @submit="updateAchievement"
                        :validation-schema="achievementSchema"
                    >
                        <div class="inputDiv">
                            <div class="date_input_wrapper w-100">
                                <label for="titleDate "
                                    >Achievement Date:</label
                                >
                                <VField
                                    name="titleDate"
                                    type="date"
                                    class="input w-50"
                                    v-model="achievement.titleDate"
                                    :max="useMaxDate"
                                />
                                <ErrorMessage
                                    name="titleDate"
                                    class="error_message"
                                />
                            </div>
                            <div class="inputDiv">
                                <VField
                                    name="title"
                                    placeholder="Achievement Title*"
                                    type="text"
                                    class="input"
                                    v-model="achievement.title"
                                    required
                                />
                                <ErrorMessage
                                    name="title"
                                    class="error_message"
                                />
                            </div>
                            <div class="inputDiv">
                                <VField
                                    name="titleDescription"
                                    v-slot="{ field, errors }"
                                    :bails="false"
                                    v-model="achievement.titleDescription"
                                >
                                    <textarea
                                        v-bind="field"
                                        class="textarea"
                                        placeholder="Detailed Description*"
                                    ></textarea>
                                    <div
                                        class="error_message"
                                        v-for="err in errors"
                                        :key="err"
                                    >
                                        {{ err }}
                                    </div>
                                </VField>
                            </div>
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

<script setup lang="ts">
import { useProfileStore } from "../../stores/profileStore";
import { reactive, computed, ref, Ref } from "vue";
import { storeToRefs } from "pinia";
import { Achievement } from "../../types/profileTypes";
import { useMaxDate } from "../../composables/maxdate";
import { updateUserDetail, getAchievement } from "../../api/api";
import { arrayUnion } from "firebase/firestore";

const userId = localStorage.getItem("userId");
const store = useProfileStore();
let { achievements: achievements, openModal: dialog } = storeToRefs(store);

function closeModal(): void {
    dialog.value = false;
}

const achievementSchema = {
    title: "required|alphaSpaces",
    titleDescription: "required|alphaSpaces",
    titleDate: (value: string): string | boolean => {
        if (!value) {
            return "Title's Date is required";
        } else {
            const inputDate = new Date(value);
            const today = new Date();
            const dateInFutureError = "Date cannot be in the future";
            if (inputDate > today) {
                return dateInFutureError;
            } else {
                return true;
            }
        }
    },
};

let achievement: Achievement = reactive({
    titleDate: null,
    title: "",
    titleDescription: "",
});

async function updateAchievement(): Promise<void> {
    await updateUserDetail(userId, {
        achievementList: arrayUnion(achievement),
    });
    const docSnap = await getAchievement();
    achievements.value = docSnap.data().achievementList || [];
    achievements.value.sort(
        (asc: { titleDate: Date }, desc: { titleDate: Date }) =>
            new Date(asc.titleDate).getTime() -
            new Date(desc.titleDate).getTime()
    );
    achievement = {
        titleDate: null,
        title: "",
        titleDescription: "",
    };
    closeModal();
}
</script>

<style scoped>
.achievement-header {
    color: #115173;
}
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
