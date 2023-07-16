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
                <VForm class="form" @submit.prevent="updateTicketStatus">
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
                        <select name="status" v-model="ticketToBeClosed.status">
                            <option value="Open" disabled>Open</option>
                            <option value="Closed" selected>Closed</option>
                        </select>
                    </div>

            <!-- <small>*indicates required field</small> -->

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