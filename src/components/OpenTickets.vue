<template>
    <div class="table-wrapper rounded">
        <v-toolbar flat color="#F0F3FB">
            <v-toolbar-title>
                <div class="d-flex justify-space-between w-100 align-center title-wrapper">
                    <h3>Open Tickets</h3>
                    <TicketForm />
                </div>
            </v-toolbar-title>
        </v-toolbar>
        <v-table
            fixed-header
            max-height="300px"
        >
            <thead>
            <tr>
                <th class="text-left"> Ticket ID </th>
                <th class="text-left"> Title </th>
                <th class="text-left"> Created On </th>
                <th class="text-left"> Category </th>
                <th class="text-left"> Priority </th>
                <th class="text-left"> Description </th>
                <th class="text-left" v-if="isAdmin"> Raised By </th>
                <th class="text-left" v-if="isAdmin"> Review </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="item in openTickets"
                :key="item.id"
            >
                <td>{{ item.id.slice(0, 5) }}..</td>
                <td>{{ item.title }}</td>
                <td>{{ item.createdOn }}</td>
                <td>{{ item.category }}</td>
                <td>{{ item.priority }}</td>
                <td>{{ item.description.slice(0, 15) }}...</td>
                <td v-if="isAdmin">{{ item.userName }}</td>
                <td v-if="isAdmin">
                    <img class="close-ticket" src="../assets/images/CloseTicket.png" @click="closeTicket(item)"/>
                </td>
            </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script setup lang="ts">
    import TicketForm from './TicketForm.vue';
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useTicketStore } from '@/stores/ticketStore';
    const { openTickets, showCloseTicketForm, ticketToBeClosed } = storeToRefs(useTicketStore());    

    const isAdmin = ref(localStorage.getItem('isAdmin'));

    function closeTicket(ticket) {
        showCloseTicketForm.value = true;
        ticketToBeClosed.value = ticket;
    }
</script>

<style scoped>
.title-wrapper .btn {
  margin-right: 2rem;
}

.v-table {
    box-shadow: none !important;
    margin-bottom: 1.5rem !important;
}

.close-ticket {
    width: 25px;
    height: 25px;
    object-fit: contain;
    cursor: pointer;
}
</style>