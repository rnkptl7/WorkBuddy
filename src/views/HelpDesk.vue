<script setup lang="ts">
import Tickets from '../components/Tickets.vue';
import LineChart from '../components/LineChart.vue';
import DoughnutChart from '../components/DoughnutChart.vue';
</script>

<template>
  <main>
    <div class="d-flex justify-space-between">
      <h2>My Tickets</h2>
      <v-btn variant="outlined" prepend-icon="fa-solid fa-plus" color>New Ticket
      </v-btn>
    </div>
    <Tickets />
    <section class="w-100 d-flex flex-column flex-lg-row justify-center">
      <div class="line-wrapper w-100 rounded-sm">
        <LineChart />
      </div>
      <div class="doughnut-wrapper w-50 rounded-sm">
        <DoughnutChart />
      </div>
    </section>
  </main>
</template>

<style scoped>
  main {
      width: 80%;
      margin-inline: auto;
  }

  main::-webkit-scrollbar {
    display: none;
  }

  main {
    -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  }

  section {
    margin-top: 2rem;
    width: 100%;
    column-gap: 0.8rem;
  }

  .line-wrapper {
    border: 1px solid #dadce2;
    padding: 1rem;
  }

  .doughnut-wrapper {
    border: 1px solid #dadce2;
    padding: 1rem;
  }
</style>