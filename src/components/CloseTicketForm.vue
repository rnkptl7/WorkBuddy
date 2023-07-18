<template>
    <v-row justify="end">
      <v-dialog
        v-model="showCloseTicketForm"
        persistent
        width="500"
      >
        <v-card>
          <v-container>
              <h2>Ticket Raised By {{ ticketToBeClosed.userName }}</h2>
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
                      v-slot="{ field, errors }"
                      v-model="ticketToBeClosed.status"
                    >
                      <select v-bind="field" class="input" name="status">
                        <option disabled value="">Open</option>
                        <option value="Closed">Closed</option>
                      </select>
                      <div class="error_message" v-for="err in errors" :key="err">
                        Status should be Closed to terminate a ticket
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
    const { showCloseTicketForm, ticketToBeClosed, fullName } = storeToRefs(useTicketStore());
    const { fetchTicketsByStatus } = useTicketStore(); 
    import { useFirestore } from "vuefire";
    import { doc, updateDoc } from 'firebase/firestore';
    import { useToast } from "vue-toast-notification";

    const db = useFirestore();

    const schema = {
        status: "required",
    }

    async function updateTicketStatus(): Promise<void> {
        
        if (ticketToBeClosed.value.status === "Closed") {
            const docRef = doc(db, "tickets", ticketToBeClosed.value.id);

            await updateDoc(docRef, {
                status: "Closed",
                closedBy: fullName.value
            });

            const $toast = useToast();
            $toast.success("Ticket Closed Successfully", {
              position: "top-right",
            });

            fetchTicketsByStatus();
        }

        showCloseTicketForm.value = false;
    }
</script>