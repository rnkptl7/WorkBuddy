<template>
    <!-- <v-row justify="end"> -->
    <v-dialog v-model="props.dialog" persistent width="600">
        <v-card pa-5>
            <v-container class="pa-3">
                <!-- <div class="pa-5"> -->
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
            <!-- </div> -->
        </v-card>
    </v-dialog>
    <!-- </v-row> -->
</template>

<script setup lang="ts">
    import {
        addDoc,
        arrayUnion,
        collection,
        doc,
        setDoc,
        updateDoc,
    } from "firebase/firestore";
    import { storeToRefs } from "pinia";
    import { reactive, ref } from "vue";
    import { useFirestore } from "vuefire";
    import { useLeavesStore } from "../stores/leaves";
    import { useAuthStore } from "../stores/authStore";
    import moment from "moment";
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
        startDate: (value) => {
            if (value) {
                const date = new Date(value);
                let yesterday = new Date();
                let tomorrow = new Date();
                if (leaveRequestInput.leaveCategory == "Unplanned") {
                    tomorrow.setDate(tomorrow.getDate() + 2);
                    yesterday.setDate(yesterday.getDate() - 1);
                } else if (leaveRequestInput.leaveCategory == "Planned") {
                    yesterday.setDate(yesterday.getDate() + 3);
                    return date > yesterday
                        ? true
                        : `Start Date should above ${moment(yesterday).format(
                              "DD-MM-YYYY"
                          )}`;
                }
                return date > yesterday && date <= tomorrow
                    ? true
                    : `Start Date should between ${moment(yesterday).format(
                          "DD-MM-YYYY"
                      )} and ${moment(tomorrow).format("DD-MM-YYYY")}`;
            } else {
                return "Please choose a Start Date.";
            }
        },
        endDate: (value) => {
            if (value) {
                const date = new Date(value);
                let yesterday = new Date(leaveRequestInput.startDate);
                let tomorrow = new Date(leaveRequestInput.startDate);
                // Define the minimum and maximum dates

                if (leaveRequestInput.startDate > date) {
                    return "End date should be greater than Start date.";
                } else {
                    if (leaveRequestInput.leaveCategory == "Unplanned") {
                        // console.log(leaveRequestInput.leaveCategory);
                        tomorrow.setDate(tomorrow.getDate() + 3);
                        yesterday.setDate(yesterday.getDate() + 1);
                    } else if (leaveRequestInput.leaveCategory == "Planned") {
                        tomorrow.setDate(
                            tomorrow.getDate() +
                                leaveCountDetails.value.leftLeaves
                        );
                        console.log(tomorrow);
                        return date <= tomorrow
                            ? true
                            : `End Date should below ${moment(tomorrow).format(
                                  "DD-MM-YYYY"
                              )}`;
                    }
                    return date >= yesterday && date <= tomorrow
                        ? true
                        : `End Date should between ${moment(yesterday).format(
                              "DD-MM-YYYY"
                          )} and ${moment(tomorrow).format("DD-MM-YYYY")}`;
                }
            } else {
                return "Please choose a End Date.";
            }
        },
        requestingToEmail: "required|email",
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
    });

    function closeModal() {
        emits("closeLeaveRequestModal", false);
    }

    async function submitRequest() {
        console.log(new Date(leaveRequestInput.startDate));
        // Adding a document to leaves collection
        const leave = await addDoc(collection(db, "leaves"), {
            ...leaveRequestInput,
            startDate: new Date(leaveRequestInput.startDate),
            endDate: new Date(leaveRequestInput.endDate),
            status: "pending",
            userId: userId.value,
        });

        // creating reference to users collection's document with specified id
        const user = doc(db, "users", userId.value);

        await updateDoc(user, {
            leaveRequestIds: arrayUnion(leave.id),
        });

        await updateDoc(user, {
            leavesDetails: {
                TOTAL_LEAVES: leaveCountDetails.value.TOTAL_LEAVES,
                takenLeaves: leaveCountDetails.value.takenLeaves + 1,
                leftLeaves: leaveCountDetails.value.leftLeaves - 1,
            },
        });

        leavesStore.leaveCountDetails = {
            TOTAL_LEAVES: leavesStore.leaveCountDetails.TOTAL_LEAVES,
            takenLeaves: leavesStore.leaveCountDetails.takenLeaves + 1,
            leftLeaves: leavesStore.leaveCountDetails.leftLeaves - 1,
        };
        getLeaves();
        leaveRequestInput = {
            leaveCategory: "",
            leaveMessage: "",
            description: "",
            startDate: new Date(),
            endDate: new Date(),
            requestingToEmail: "",
            status: undefined,
            createdBy: fullName.value,
        };
        emits("closeLeaveRequestModal", false);
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
        /* display: flex;
        flex-direction: column; */
    }
    form {
        width: 92%;
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

    @media screen and (max-width: 600px) {
        form {
            width: 88%;
        }
    }
    @media screen and (max-width: 430px) {
        form {
            width: 85%;
        }
    }
</style>
