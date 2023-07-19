<template>
    <v-row justify="end">
        <v-dialog v-model="dialog" persistent width="500">
            <template v-slot:activator="{ props }">
                <v-btn
                    variant="outlined"
                    color="#115173"
                    class="btn"
                    v-bind="props"
                >
                    <span id="plus">+ </span> New Ticket
                </v-btn>
            </template>
            <v-card>
                <v-container>
                    <h2>Raise an Issue</h2>
                    <v-divider class="py-1"></v-divider>
                    <VForm
                        class="form"
                        :validation-schema="schema"
                        @submit="createTicket"
                    >
                        <div class="inputDiv">
                            <VField
                                name="category"
                                :bails="false"
                                v-slot="{ field, errors }"
                                v-model="ticketData.category"
                            >
                                <select v-bind="field" class="input">
                                    <option disabled value="">
                                        I need help regarding*
                                    </option>
                                    <option value="Hardware">Hardware</option>
                                    <option value="Software">Software</option>
                                    <option value="HR Queries">
                                        HR Queries
                                    </option>
                                    <option value="Ontime">Ontime</option>
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

                        <div class="inputDiv">
                            <VField
                                name="title"
                                placeholder="Issue in brief*"
                                type="text"
                                class="input"
                                v-model="ticketData.title"
                            />
                            <ErrorMessage name="title" class="error_message" />
                        </div>

                        <div class="inputDiv">
                            <VField
                                name="description"
                                :bails="false"
                                v-slot="{ field, errors }"
                                v-model="ticketData.description"
                            >
                                <textarea
                                    v-bind="field"
                                    class="textarea"
                                    placeholder="Detailed Description*"
                                >
                                </textarea>
                                <div
                                    class="error_message"
                                    v-for="err in errors"
                                    :key="err"
                                >
                                    {{ err }}
                                </div>
                            </VField>
                        </div>

                        <div class="inputDiv">
                            <VField
                                name="priority"
                                :bails="false"
                                v-slot="{ field, errors }"
                                v-model="ticketData.priority"
                            >
                                <select v-bind="field" class="input">
                                    <option disabled value="">
                                        Select Priority*
                                    </option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
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

                        <small>*indicates required field</small>

                        <v-spacer></v-spacer>
                        <div class="d-flex justify-end">
                            <v-btn type="reset" @click="dialog = false"
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
                </v-container>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import moment from "moment";
import { useTicketStore } from "@/stores/ticketStore";
import { useFirestore } from "vuefire";
import {
    collection,
    addDoc,
    doc,
    arrayUnion,
    updateDoc,
} from "firebase/firestore";
import { useToast } from "vue-toast-notification";

const db = useFirestore();

const dialog = ref(false);

const schema = {
    category: "required",
    title: "required",
    description: "required",
    priority: "required",
};

let ticketData = reactive({
    category: "",
    title: "",
    description: "",
    priority: "",
    createdOn: "",
    status: "Open",
    closedBy: "-",
});

const {
    fetchAllTickets,
    fetchByCategory,
    fetchByMonths,
    fetchTicketsByStatus,
    fullName,
    userId,
} = useTicketStore();

async function createTicket(): Promise<void> {
    dialog.value = false;

    ticketData = {
        ...ticketData,
        createdOn: moment(new Date()).format("DD-MM-YYYY"),
    };

    const ticket = await addDoc(collection(db, "tickets"), {
        userId,
        userName: fullName,
        ...ticketData,
    });

    const docRef = doc(db, "users", userId);

    await updateDoc(docRef, {
        tickets: arrayUnion(ticket.id),
    });

    const $toast = useToast();
    $toast.success("Ticket Generated Successfully", {
        position: "top-right",
    });

    ticketData = {
        category: "",
        title: "",
        description: "",
        priority: "",
        createdOn: "",
        status: "Open",
        closedBy: "-",
    };

    fetchTicketsByStatus();
    fetchAllTickets();
    fetchByCategory();
    fetchByMonths();
}
</script>

<style>
.v-card {
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
    background: #0000008d;
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

.error_message {
    color: #f44b4b;
}
</style>
