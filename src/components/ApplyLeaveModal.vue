<template>
    <v-row justify="end">
        <v-dialog v-model="props.dialog" persistent width="500">
            <!-- <template v-slot:activator="{ props }">
                <v-btn
                    variant="outlined"
                    color="grey-darken-3"
                    class="btn my-3"
                    v-bind="props"
                >
                    <span id="plus">+ </span> Request For Leave
                </v-btn>
            </template> -->
            <v-card>
                <div class="pa-5">
                    <h2>Request for Leave</h2>
                    <v-divider class="py-1"></v-divider>
                    <VForm class="form">
                        <div class="inputDiv">
                            <select name="category" class="input">
                                <option value="" disabled selected>
                                    Leave Category*
                                </option>
                                <option value="Hardware">Unplanned</option>
                                <option value="Software">Planned</option>
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
                                @click.prevent="closeModal"
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
    import { ref } from "vue";
    const dialog = ref(false);
    const props = defineProps(["dialog"]);
    const emits = defineEmits(["closeLeaveRequestModal"]);

    function closeModal() {
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
