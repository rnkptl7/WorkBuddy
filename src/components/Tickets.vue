<template>
    <div class="table-wrapper">
        <v-table
            fixed-header
            height="300px"
        >
            <thead>
            <tr>
                <th class="text-left">
                Ticket ID
                </th>
                <th class="text-left">
                Title
                </th>
                <th class="text-left">
                Created On
                </th>
                <th class="text-left">
                Category
                </th>
                <th class="text-left">
                Status
                </th>
                <th class="text-left">
                Closed By
                </th>
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
                <td>{{ item.status }} <span>.</span></td>
                <td>{{ item.closedBy }}</td>
            </tr>
            </tbody>
        </v-table>
    </div>
</template>


<script setup lang="ts">
    import { ref } from 'vue';
    const desserts = ref([
          {
            id: "id1",
            title: "Keyboard Not Working",
            created: "27/06/2023",
            category: "Hardware",
            status: "Open",
            closedBy: "-"
          },
          {
            id: "id2",
            title: "Mouse Not Working",
            created: "27/06/2023",
            category: "Hardware",
            status: "Open",
            closedBy: "-"
          },
          {
            id: "id3",
            title: "Zoho Not Working",
            created: "27/06/2023",
            category: "Software",
            status: "Closed",
            closedBy: "Dixit"
          },
          {
            id: "id4",
            title: "Keyboard Not Working",
            created: "27/06/2023",
            category: "Hardware",
            status: "Closed",
            closedBy: "Dixit"
          },
          {
            id: "id5",
            title: "Ontime Not Working",
            created: "27/06/2023",
            category: "Software",
            status: "Closed",
            closedBy: "Dixit"
          },
          {
            id: "id5",
            title: "Ontime Not Working",
            created: "27/06/2023",
            category: "Software",
            status: "Closed",
            closedBy: "Dixit"
          },
          {
            id: "id5",
            title: "Ontime Not Working",
            created: "27/06/2023",
            category: "Software",
            status: "Closed",
            closedBy: "Dixit"
          },
        ]);
</script>

<style scoped>

</style>