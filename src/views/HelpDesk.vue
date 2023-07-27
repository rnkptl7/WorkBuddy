<template>
    <main>
        <section>
            <OpenTickets />
            <CloseTicketForm />
        </section>
        <section class="table-wrapper">
            <TicketsHistory />
        </section>

        <section class="charts-wrapper">
            <section class="chart-wrapper rounded">
                <h3 class="chart-title pl-1">All Tickets</h3>
                <v-divider class="my-2"></v-divider>
                <div class="line-wrapper">
                    <LineChart />
                </div>
            </section>

            <section class="chart-wrapper rounded">
                <h3 class="chart-title pl-1">Issues by type</h3>
                <v-divider class="mt-2"></v-divider>
                <div class="doughnut-wrapper">
                    <DoughnutChart />
                </div>
            </section>
        </section>
    </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import TicketsHistory from "../components/HelpDesk/TicketsHistory.vue";
import LineChart from "../components//HelpDesk/LineChart.vue";
import DoughnutChart from "../components//HelpDesk/DoughnutChart.vue";
import { useTicketStore } from "@/stores/ticketStore";
import OpenTickets from "@/components//HelpDesk/OpenTickets.vue";
import CloseTicketForm from "@/components/HelpDesk/CloseTicketForm.vue";

const { fetchAllTickets, fetchTicketsByStatus } = useTicketStore();
onMounted(() => {
    fetchAllTickets();
    fetchTicketsByStatus();
});
</script>

<style scoped>
main {
    padding: 0 1.5rem 0 1rem;
    width: 100%;
    max-width: 1500px;
    margin-inline: auto;
    overflow: auto;
}

.table-wrapper {
    margin: 1rem 0;
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.15) !important;
}

.charts-wrapper {
    margin-top: 1rem;
    min-height: 500px;
    gap: 0.8rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
}

.chart-wrapper {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    padding: 1rem;
}

.chart-title {
    color: var(--primary-color);
}

.line-wrapper,
.doughnut-wrapper {
    height: 300px;
    width: 300px;
}

.line-wrapper,
.doughnut-wrapper {
    height: 300px;
    width: 100%;
}

@media screen and (min-width: 1178px) {
    .charts-wrapper {
        flex-direction: row;
    }
    .line-wrapper,
    .doughnut-wrapper {
        height: 400px;
    }

    .chart-wrapper:nth-of-type(1) {
        flex-grow: 2;
    }

    .chart-wrapper:nth-of-type(2) {
        flex-grow: 1;
    }
}

.v-row {
    justify-content: end;
    align-items: center;
}
</style>
