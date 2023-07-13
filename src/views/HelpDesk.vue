<script setup lang="ts">
import TicketsTable from '../components/TicketsTable.vue';
import LineChart from '../components/LineChart.vue';
import DoughnutChart from '../components/DoughnutChart.vue';
</script>

<template>
  <main>
    <section class="table-wrapper">
      <TicketsTable />
    </section>

    <section class="charts-wrapper">
      
      <section class="chart-wrapper rounded">
        <h3 class="chart-description">All Tickets</h3>
        <div class="line-wrapper">
          <LineChart />
        </div>
      </section>

      <section class="chart-wrapper rounded">
        <h3 class="chart-description">Issues by type</h3>
        <div class="doughnut-wrapper">
          <DoughnutChart />
        </div>
      </section>

    </section>
  </main>
</template>

<style scoped>
  main {
      padding: 0 1.5rem 0 1rem;
      width: 80%;
      max-width: 1500px;
      margin-inline: auto;
      overflow: auto;
  }

  .table-wrapper {
    padding: 2rem 0;
  }

  .charts-wrapper {
    margin-top: 1rem;
    min-height: 500px;
    gap: 0.8rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
  }

  .chart-description {
    margin-bottom: 1rem;
  }
  .chart-wrapper {
    box-shadow: 0px 3px 30px 1px #e8efff;
    padding: 1rem;
  }

  .line-wrapper, .doughnut-wrapper {
    height: 300px;
    width: 300px;
  }

  .line-wrapper, .doughnut-wrapper {
      height: 300px;
      width: 100%;
  }

  @media screen and (min-width: 1178px) {
    .charts-wrapper {
      flex-direction: row;
    }
    .line-wrapper, .doughnut-wrapper {
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