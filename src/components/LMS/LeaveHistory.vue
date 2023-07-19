<template>
    <v-data-table
        v-model:expanded="expanded"
        :headers="tableHeaders"
        :items="leaves"
        item-value="id"
        show-expand
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="#F0F3FB">
                <v-toolbar-title>
                    <div
                        class="d-flex justify-space-between w-100 align-center title-wrapper"
                    >
                        <h3>Leave History</h3>
                        <TicketForm />
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

        <template v-slot:item.status="{ item }">
        <v-chip :color="calendarColors[item.selectable.status].fill">{{ item.selectable.status }}</v-chip>
      </template>

    </v-data-table>
</template>

<script setup lang="ts">
    import { storeToRefs } from "pinia";
    import { ref } from "vue";
    import { useLeavesStore } from "../../stores/leaves";
    const { leaves } = storeToRefs(useLeavesStore());

    const expanded = ref([]);
    const tableHeaders = ref([
        { title: "Leave Message", key: "leaveMessage" },
        { title: "Start date", key: "startDate" },
        { title: "End date", key: "endDate" },
        { title: "Status", key: "status" },
        { title: "Category", key: "leaveCategory" },
        { title: "Requesting To", key: "requestingToEmail" },
        { title: "", key: "data-table-expand" },
    ]);

    let calendarColors = {
        pending: { fill: "orange" },
        Approved: { fill: "blue" },
        rejected: { fill: "gray" },
    }
</script>

<style>
    .title-wrapper .btn {
        margin-right: 2rem;
    }

    h3,
    h4 {
        color: var(--primary-color);
    }

    .v-toolbar-title__placeholder {
        overflow: visible !important;
    }
</style>
