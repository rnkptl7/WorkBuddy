<template>
    <v-dialog v-model="props.dialog" persistent width="600">
        <v-card pa-5>
            <v-container class="pa-3">
                <h2>Request for Leave</h2>
                <v-divider class="py-1"></v-divider>
                <VForm
                    class="form"
                    @submit="submitRequest"
                    :validation-schema="validationSchema"
                >
                    <div class="inputDiv">
                        <vField
                            name="leaveCategory"
                            :bails="false"
                            class="input"
                            v-slot="{ field, errors }"
                            v-model="leaveRequestInput.leaveCategory"
                        >
                            <select
                                name="category"
                                class="input"
                                v-bind="field"
                            >
                                <option value="" disabled selected>
                                    Leave Category*
                                </option>
                                <option value="Unplanned">Unplanned</option>
                                <option value="Planned">Planned</option>
                            </select>
                            <div
                                class="error_message"
                                v-for="err in errors"
                                :key="err"
                            >
                                {{ err }}
                            </div>
                        </vField>
                    </div>

                    <div class="inputDiv">
                        <vField
                            name="leaveMessage"
                            placeholder="Leave message*"
                            type="text"
                            class="input"
                            :validateOnInput="true"
                            v-model="leaveRequestInput.leaveMessage"
                        />
                        <ErrorMessage
                            name="leaveMessage"
                            class="error_message"
                        />
                    </div>

                    <div
                        class="inputDiv flex-column justify-space-around w-100"
                    >
                        <div class="date_input_wrapper w-50">
                            <label>Start Date</label>
                            <vField
                                name="startDate"
                                placeholder="‎"
                                type="date"
                                class="input w-100"
                                v-model="leaveRequestInput.startDate"
                                :min="min_date"
                            />
                            <ErrorMessage
                                name="startDate"
                                class="error_message"
                            />
                        </div>

                        <div class="date_input_wrapper w-50">
                            <label>End Date</label>

                            <vField
                                name="endDate"
                                placeholder="‎"
                                type="date"
                                class="input w-100"
                                v-model="leaveRequestInput.endDate"
                                :min="min_date"
                            />
                            <ErrorMessage
                                name="endDate"
                                class="error_message"
                            />
                        </div>
                    </div>

                    <div class="inputDiv">
                        <vField
                            name="description"
                            :bails="false"
                            v-slot="{ field, errors }"
                            v-model="leaveRequestInput.description"
                        >
                            <textarea
                                type="text"
                                placeholder="Description*"
                                id="description"
                                class="input"
                                name="description"
                                rows="3"
                                v-bind="field"
                            />
                            <div
                                class="error_message"
                                v-for="err in errors"
                                :key="err"
                            >
                                {{ err }}
                            </div>
                        </vField>
                    </div>

                    <div class="inputDiv">
                        <vField
                            name="requestingToEmail"
                            placeholder="Requesting to Email*"
                            type="email"
                            class="input"
                            v-model="leaveRequestInput.requestingToEmail"
                        />
                        <ErrorMessage
                            name="requestingToEmail"
                            class="error_message"
                        />
                    </div>

                    <small>*indicates required field</small>

                    <v-spacer></v-spacer>
                    <div class="d-flex justify-end">
                        <v-btn type="reset" @click="closeModal">Cancel</v-btn>
                        <v-btn
                            class="me-4 text-white ml-2 btn-submit"
                            type="submit"
                            color="#115173"
                        >
                            Submit
                        </v-btn>
                    </div>
                </VForm>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import moment from "moment";
import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { storeToRefs } from "pinia";
import { computed, reactive, ref } from "vue";
import { useFirestore } from "vuefire";
import { useLeavesStore } from "../../stores/leaves";
import { useAuthStore } from "../../stores/authStore";
import { addLeaveDetail, updateUserDetail } from "../../api/api";
import { totalmem } from "os";
const authStore = useAuthStore();
const leavesStore = useLeavesStore();
const { fullName } = storeToRefs(authStore);
const { getLeaves } = leavesStore;
const { leaveCountDetails, userId } = storeToRefs(leavesStore);

// Database reference
const db = useFirestore();
const today = new Date();

const dialog = ref(false);
const props = defineProps(["dialog"]);
const emits = defineEmits(["closeLeaveRequestModal"]);
const validationSchema = reactive({
    leaveCategory: "required",
    leaveMessage: "required",
    description: "required|min:30",
    startDate: (value: string) => {
        if (value) {
            // Unplanned category
            const selectedDate = Math.floor(
                new Date(value).getTime() / (1000 * 60 * 60 * 24)
            );
            if (leaveRequestInput.leaveCategory == "Unplanned") {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 2);
                return selectedDate <=
                    Math.floor(tomorrow.getTime() / (1000 * 60 * 60 * 24))
                    ? true
                    : `Start Date should less than ${moment(tomorrow).format(
                          "DD-MM-YYYY"
                      )}`;
            }
            // Planned Category
            else if (leaveRequestInput.leaveCategory == "Planned") {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() + 2);
                return selectedDate >
                    Math.floor(yesterday.getTime() / (1000 * 60 * 60 * 24))
                    ? true
                    : `Start Date should above ${moment(yesterday).format(
                          "DD-MM-YYYY"
                      )}`;
            } else {
                return "Select category for accurate date's details!";
            }
        } else {
            return "Please select appropriate starting date!";
        }
    },
    endDate: (value: string) => {
        if (value) {
            if (leaveRequestInput.startDate) {
                const selectedDate = Math.floor(
                    new Date(value).getTime() / (1000 * 60 * 60 * 24)
                );

                // Unplanned category
                if (leaveRequestInput.leaveCategory == "Unplanned") {
                    const yesterday = new Date(leaveRequestInput.startDate);
                    const tomorrow = new Date(leaveRequestInput.startDate);
                    tomorrow.setDate(tomorrow.getDate() + 2);
                    const requestingDays =
                        selectedDate -
                        Math.floor(yesterday.getTime()) / (1000 * 3600 * 24) +
                        1;
                    if (requestingDays > leaveCountDetails.value.leftLeaves) {
                        leaveCountDetails.value.leftLeaves == 0
                            ? `You dont't have that much leaves left!`
                            : `You can request upto ${leaveCountDetails.value.leftLeaves} days.`;
                    } else
                        return selectedDate >=
                            Math.floor(
                                yesterday.getTime() / (1000 * 60 * 60 * 24)
                            ) &&
                            selectedDate <=
                                Math.floor(
                                    tomorrow.getTime() / (1000 * 60 * 60 * 24)
                                )
                            ? true
                            : `End Date should be between ${moment(
                                  yesterday
                              ).format("DD-MM-YYYY")} and ${moment(
                                  tomorrow
                              ).format("DD-MM-YYYY")}`;
                }
                // Planned Category
                else if (leaveRequestInput.leaveCategory == "Planned") {
                    const yesterday = new Date(leaveRequestInput.startDate);
                    const tomorrow = new Date(leaveRequestInput.startDate);
                    tomorrow.setDate(tomorrow.getDate() + 2);

                    const requestingDays =
                        selectedDate -
                        Math.floor(
                            new Date(leaveRequestInput.startDate).getTime() /
                                (1000 * 3600 * 24)
                        ) +
                        1;

                    if (requestingDays > leaveCountDetails.value.leftLeaves) {
                        return leaveCountDetails.value.leftLeaves == 0
                            ? `You dont't have that much leaves left!`
                            : `You can request upto ${leaveCountDetails.value.leftLeaves} days.`;
                    } else
                        return selectedDate >=
                            Math.floor(
                                yesterday.getTime() / (1000 * 60 * 60 * 24)
                            )
                            ? true
                            : `End Date should not less than ${moment(
                                  yesterday
                              ).format("DD-MM-YYYY")}`;
                } else {
                    return "Select category for accurate date's details!";
                }
            } else {
                return "Please select start date first!";
            }
        } else {
            return "Please select appropriate starting date!";
        }
    },
    requestingToEmail: "required|email",
});

const min_date = computed(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
});

let leaveRequestInput = reactive({
    leaveCategory: "",
    leaveMessage: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    requestingToEmail: "",
    status: undefined,
    createdBy: fullName.value,
    totalDays: 0,
});

function closeModal() {
    emits("closeLeaveRequestModal", false);
}

async function submitRequest() {
    const startDate = new Date(leaveRequestInput.startDate);
    const endDate = new Date(leaveRequestInput.endDate);

    const totalDays =
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1;
    // Adding a document to leaves collection

    const leaveId = await addLeaveDetail({
        ...leaveRequestInput,
        startDate: startDate,
        endDate: endDate,
        status: "pending",
        userId: userId.value,
        totalDays: totalDays,
    });

    // creating reference to users collection's document with specified id
    await updateUserDetail(userId.value, {
        leaveRequestIds: arrayUnion(leaveId),
        leavesDetails: {
            TOTAL_LEAVES: leaveCountDetails.value.TOTAL_LEAVES || 10,
            takenLeaves: leaveCountDetails.value.takenLeaves + totalDays,
            leftLeaves: leaveCountDetails.value.leftLeaves - totalDays,
        },
    });

    leavesStore.leaveCountDetails = {
        TOTAL_LEAVES: leavesStore.leaveCountDetails.TOTAL_LEAVES,
        takenLeaves: leavesStore.leaveCountDetails.takenLeaves + totalDays,
        leftLeaves: leavesStore.leaveCountDetails.leftLeaves - totalDays,
    };

    await getLeaves();

    leaveRequestInput = {
        leaveCategory: "",
        leaveMessage: "",
        description: "",
        startDate: new Date(),
        endDate: new Date(),
        requestingToEmail: "",
        status: undefined,
        createdBy: fullName.value,
        totalDays: 0,
    };
    emits("closeLeaveRequestModal", false);
}
</script>

<style scoped>
h2,
h3 {
    color: var(--primary-color);
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
