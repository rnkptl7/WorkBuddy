<template>
    <v-row justify="end">
      <v-dialog
        v-model="showCloseTicketForm"
        persistent
        width="500"
      >
        <v-card>
          <v-container>
              <h2>Ticket Raised By {{ userName }}</h2>
              <v-divider class="py-1"></v-divider>
                <VForm class="form" :validation-schema="schema" @submit="updateTicketStatus">
                    <div class="inputDiv">
                        <input type="text" :value="ticketToBeClosed.category" disabled >
                    </div>

                    <div class="inputDiv">
                        <input type="text" :value="ticketToBeClosed.title" disabled>
                    </div>

                    <div class="inputDiv">
                        <textarea type="text" :value="ticketToBeClosed.description" disabled> </textarea>
                    </div>

                    <div class="inputDiv">
                        <input type="text" :value="ticketToBeClosed.createdOn" disabled>
                    </div>

                    <div class="inputDiv">
                        <input type="text" :value="ticketToBeClosed.priority" disabled>
                    </div>

                    <div class="inputDiv">
                        <VField
                        name="status"
                        :bails="false"
                        v-slot="{ field }"
                        v-model="ticketToBeClosed.status"
                        >
                        <select v-bind="field" class="input">
                            <option disabled value="">Open</option>
                            <option value="Closed">Close</option>
                        </select>
                        <div class="error_message">
                            Status should be Close to terminate a ticket
                        </div>
                        </VField>
                </div>

            <v-spacer></v-spacer>
            <div class="d-flex justify-end">
              <v-btn type="reset" @click="showCloseTicketForm = false">Cancel</v-btn>
              <v-btn class="me-4 text-white ml-2 btn-submit" type="submit" color="#115173"> Terminate Ticket </v-btn>
            </div>
            </VForm>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useTicketStore } from '@/stores/ticketStore';
    const { showCloseTicketForm, ticketToBeClosed, userName } = storeToRefs(useTicketStore());
    const { fetchTicketsByStatus } = useTicketStore(); 
    import { useFirestore } from "vuefire";
    import { doc, updateDoc } from 'firebase/firestore';

    const db = useFirestore();

    const schema = {
        status: "required"
    }

    async function updateTicketStatus() {
        console.log("status", ticketToBeClosed);
        console.log("username", userName.value);
        
        
        if (ticketToBeClosed.value.status === "Closed") {
            const docRef = doc(db, "tickets", ticketToBeClosed.value.id);

            await updateDoc(docRef, {
                status: "Closed",
                closedBy: userName.value
            });

            fetchTicketsByStatus();
        }

        showCloseTicketForm.value = false;
    }
</script>