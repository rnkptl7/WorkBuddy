<template>
    <div class="table-wrapper rounded">
        <v-toolbar flat color="#F0F3FB">
            <v-toolbar-title>
                <div class="d-flex justify-space-between w-100 align-center title-wrapper">
                    <h3 class="title">Open Tickets</h3>
                    <TicketForm />
                </div>
            </v-toolbar-title>
        </v-toolbar>
        <v-table
            fixed-header
            height="100%"
            class="tickets-table"
        >
            <thead>
            <tr>
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
                <td>{{ item.title }}</td>
                <td>{{ item.createdOn }}</td>
                <td>{{ item.category }}</td>
                <td>
                    <v-chip :color="getPriorityColor(item.priority)">
                        {{ item.priority }}
                    </v-chip>
                </td>
                <td>{{ item.description.slice(0, 15) }}...</td>
                <td v-if="isAdmin">{{ item.userName }}</td>
                <td v-if="isAdmin">
                    <img class="close-ticket" src="@/assets/images/CloseTicket.png" @click="closeTicket(item)"/>
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
    import ticket from '@/types/ticket';

    const { openTickets, showCloseTicketForm, ticketToBeClosed } = storeToRefs(useTicketStore());    

    const isAdmin = ref(localStorage.getItem('isAdmin'));

    function closeTicket(ticket: ticket) {
        showCloseTicketForm.value = true;
        ticketToBeClosed.value = {...ticket, status: ""};
    }

    const getPriorityColor = (priority: string) => {
        if (priority === 'High')
            return 'red';
        else if (priority === 'Medium')
            return 'orange';
        else
            return '#115173'
    };
</script>

<style>
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

.title {
    color: var(--primary-color);
}

.tickets-table .v-table__wrapper {
    max-height: 315px !important;
    --webkit-scrollbar: none;
}

</style>