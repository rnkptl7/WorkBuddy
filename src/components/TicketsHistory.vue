<template>
  <v-data-table
    v-model:expanded="expanded"
    :headers="ticketsHeaders"
    :items="closedTickets"
    item-value="id"
    show-expand
    class="pb-1 rounded"
  >
    <template v-slot:top>
      <v-toolbar flat color="#F0F3FB">
        <v-toolbar-title>
            <div>
              <h3>Closed Tickets</h3>
            </div>
        </v-toolbar-title>
      </v-toolbar>
    </template>

    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          {{ item.raw.description }}
        </td>
      </tr>
    </template>
    
  </v-data-table>
</template>

<script setup>
  import TicketForm from './TicketForm.vue';
  import { ref, reactive } from 'vue';
  import moment from 'moment'
  import { storeToRefs } from 'pinia';
  import { useTicketStore } from '@/stores/ticketStore';
  import { useFirestore, useCollection } from "vuefire";
  import { collection, addDoc, getDocs, query, doc, getDoc, arrayUnion, updateDoc, where } from 'firebase/firestore';

  const { closedTickets } = storeToRefs(useTicketStore());
  
  const expanded = ref([]);

  const ticketsHeaders = ref([
    { title: 'Ticket ID', key: 'id' },
    { title: 'Title', key: 'title' },
    { title: 'Created On', key: 'createdOn' },
    { title: 'Category', key: 'category' },
    { title: 'Priority', key: 'priority' },
    { title: 'Closed By', key: 'closedBy' },
    { title: '', key: 'data-table-expand' },
  ]);
</script>

<style>
.title-wrapper .btn {
  margin-right: 2rem;
}

.v-toolbar-title__placeholder {
  overflow: visible !important;
}
</style>
