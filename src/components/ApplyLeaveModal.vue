<template>
    <v-row justify="end">
        <v-dialog v-model="props.dialog" persistent width="500">
            <v-card>
                <div class="pa-5">
                    <h2>Request for Leave</h2>
                    <v-divider class="py-1"></v-divider>
                    <VForm class="form" @submit.prevent="submitRequest">
                        <div class="inputDiv">
                            <select
                                name="category"
                                class="input"
                                v-model="leaveRequestInput.leaveCategory"
                            >
                                <option value="" disabled selected>
                                    Leave Category*
                                </option>
                                <option value="Unplanned">Unplanned</option>
                                <option value="Planned">Planned</option>
                            </select>
                            <ErrorMessage
                                name="category"
                                class="error_message"
                            />
                        </div>

                        <div class="inputDiv">
                            <input
                                name="title"
                                placeholder="Leave message*"
                                type="text"
                                class="input"
                                v-model="leaveRequestInput.leaveMessage"
                            />
                            <ErrorMessage name="title" class="error_message" />
                        </div>

                        <div
                            class="inputDiv flex-column justify-space-around w-100"
                        >
                            <div class="date_input_wrapper w-50">
                                <label for="startDate ">Start Date</label>
                                <input
                                    name="startDate"
                                    placeholder="Leave message*"
                                    type="date"
                                    class="input w-100"
                                    v-model="leaveRequestInput.startDate"
                                />
                                <ErrorMessage
                                    name="title"
                                    class="error_message"
                                />
                            </div>
                            <div class="date_input_wrapper w-50">
                                <label for="endDate">End Date</label>
                                <input
                                    name="startDate"
                                    placeholder=""
                                    type="date"
                                    class="input w-100"
                                    v-model="leaveRequestInput.endDate"
                                />
                                <ErrorMessage
                                    name="title"
                                    class="error_message"
                                />
                            </div>
                        </div>

                        <div class="inputDiv">
                            <textarea
                                name="description"
                                placeholder="Description*"
                                type="text"
                                class="input"
                                v-model="leaveRequestInput.description"
                            />
                            <ErrorMessage
                                name="description"
                                class="error_message"
                            />
                        </div>

                        <div class="inputDiv">
                            <input
                                name="title"
                                placeholder="Requesting To*"
                                type="email"
                                class="input"
                                v-model="leaveRequestInput.requestingToEmail"
                            />
                            <ErrorMessage name="title" class="error_message" />
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
    import {
        addDoc,
        arrayUnion,
        collection,
        doc,
        setDoc,
        updateDoc,
    } from "firebase/firestore";
    import { reactive, ref } from "vue";
    import { useFirestore } from "vuefire";
    import { useLeavesStore } from "../stores/leaves";

    const { getLeaves, userId } = useLeavesStore();

    // Database reference
    const db = useFirestore();

    const dialog = ref(false);
    const props = defineProps(["dialog"]);
    const emits = defineEmits(["closeLeaveRequestModal"]);

    let leaveRequestInput = reactive({
        leaveCategory: "",
        leaveMessage: "",
        description: "",
        startDate: new Date(),
        endDate: new Date(),
        requestingToEmail: "",
        status: undefined,
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
            userId: userId,
        });

        // creating reference to users collection's document with specified id
        const user = doc(db, "users", userId);

        await updateDoc(user, {
            leaveRequestIds: arrayUnion(leave.id),
        });

        leaveRequestInput = {
            leaveCategory: "",
            leaveMessage: "",
            description: "",
            startDate: new Date(),
            endDate: new Date(),
            requestingToEmail: "",
            status: "",
        };
        getLeaves();
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
