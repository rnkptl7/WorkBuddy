<template>
  <v-data-table
    v-model:expanded="expanded"
    :headers="ticketsHeaders"
    :items="closedTickets"
    item-value="id"
    show-expand
    :header-class="'header-class'"
    class="pb-1 rounded"
  >
    <template v-slot:top>
      <v-toolbar flat color="#F0F3FB">
        <v-toolbar-title>
            <div>
              <h3 class="title">Closed Tickets</h3>
            </div>
        </v-toolbar-title>
      </v-toolbar>
    </template>

      <template v-slot:item.priority="{ item }">
        <v-chip :color="getPriorityColor(item.selectable.priority)">{{ item.selectable.priority }}</v-chip>
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

<script setup lang="ts">
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useTicketStore } from '@/stores/ticketStore';

  const { closedTickets } = storeToRefs(useTicketStore());
  
  const expanded = ref([]);

  const ticketsHeaders = ref([
    { title: 'Title', key: 'title' },
    { title: 'Created On', key: 'createdOn' },
    { title: 'Category', key: 'category' },
    { title: 'Priority', key: 'priority' },
    { title: 'Raised By', key: 'userName' },
    { title: 'Closed By', key: 'closedBy' },
    { title: '', key: 'data-table-expand' },
  ]);

  function getPriorityColor(priority: string) {
    if (priority === 'High') 
      return 'red';
    else if (priority === 'Medium')
      return 'orange';
    else 
      return '#115173';
  }

</script>

<style>
.title-wrapper .btn {
  margin-right: 2rem;
}

@media screen and (max-width: 400px) {
    .title-wrapper .btn {
        margin-right: 1rem !important;
    }
}

.v-toolbar-title__placeholder {
  overflow: visible !important;
}

.title {
  color: var(--primary-color);
}
</style>
