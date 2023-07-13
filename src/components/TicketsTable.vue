<!-- <template>
    <div class="table-wrapper">
        <v-table
            fixed-header
            height="300px"
        >
            <thead>
            <tr>
                <th class="text-left"> Ticket ID </th>
                <th class="text-left"> Title </th>
                <th class="text-left"> Created On </th>
                <th class="text-left"> Category </th>
                <th class="text-left"> Priority </th>
                <th class="text-left"> Status </th>
                <th class="text-left"> Closed By </th>
                <th class="text-left"> Description </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="item in desserts"
                :key="item.name"
            >
                <td>{{ item.id }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.created }}</td>
                <td>{{ item.category }}</td>
                <td>{{ item.priority }}</td>
                <td><span class="status-dot"></span> {{ item.status }}</td>
                <td>{{ item.closedBy }}</td>
                <td>
ashohaoshgas 
                </td>
            </tr>
            </tbody>
        </v-table>
    </div>
</template> -->

<template>
  <v-data-table
    v-model:expanded="expanded"
    :headers="dessertHeaders"
    :items="desserts"
    item-value="name"
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="#F0F3FB">
        <v-toolbar-title>
            <div class="d-flex justify-space-between w-100 align-center title-wrapper">
              <h3>My Tickets</h3>
              <TicketForm />
            </div>
        </v-toolbar-title>
        
      </v-toolbar>
    </template>
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          More info about {{ item.raw.name }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import TicketForm from './TicketForm.vue';
  export default {
    components: {
      TicketForm
    },
    data () {
      return {
        expanded: [],
        dessertHeaders: [
          {
            title: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            key: 'name',
          },
          { title: 'Calories', key: 'calories' },
          { title: 'Fat (g)', key: 'fat' },
          { title: 'Carbs (g)', key: 'carbs' },
          { title: 'Protein (g)', key: 'protein' },
          { title: 'Iron (%)', key: 'iron' },
          { title: '', key: 'data-table-expand' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: 1,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: 1,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: 7,
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: 8,
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: 16,
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: 0,
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: 2,
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: 45,
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: 22,
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: 6,
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: 22,
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: 6,
          },
        ],
      }
    },
  }
</script>

<style>
.title-wrapper .btn {
  margin-right: 2rem;
}

.v-toolbar-title__placeholder {
  overflow: visible !important;
}
</style>

<!-- <script setup lang="ts">
    import { ref } from 'vue';
    const desserts = ref([
          {
            id: "id1",
            title: "Keyboard Not Working",
            created: "27/06/2023",
            category: "Hardware",
            priority: "High",
            status: "Open",
            closedBy: "-"
          },
          {
            id: "id2",
            title: "Mouse Not Working",
            created: "27/06/2023",
            category: "Hardware",
            priority: "High",
            status: "Open",
            closedBy: "-"
          },
          {
            id: "id3",
            title: "Zoho Not Working",
            created: "27/06/2023",
            category: "Software",
            priority: "Low",
            status: "Closed",
            closedBy: "Dixit"
          },
          {
            id: "id4",
            title: "Keyboard Not Working",
            created: "27/06/2023",
            category: "Hardware",
            priority: "High",
            status: "Closed",
            closedBy: "Dixit"
          },
          {
            id: "id5",
            title: "Ontime Not Working",
            created: "27/06/2023",
            category: "Software",
            priority: "High",
            status: "Closed",
            closedBy: "Dixit"
          },
          {
            id: "id5",
            title: "Ontime Not Working",
            created: "27/06/2023",
            category: "Software",
            priority: "High",
            status: "Closed",
            closedBy: "Dixit"
          },
          {
            id: "id5",
            title: "Ontime Not Working",
            created: "27/06/2023",
            category: "Software",
            priority: "High",
            status: "Closed",
            closedBy: "Dixit"
          },
        ]);
</script>

<style scoped>
.status-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  display: inline-block;
  background-color: #00A9D7;
}
</style> -->