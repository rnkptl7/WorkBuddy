<template>
    <section class="LMS-wrapper d-flex flex-column flex-fill pa-3">
        <div class="LMS-button_container my-2">
            <v-btn rounded class="ma-2">Request Leave</v-btn>
        </div>
        <div
            class="LMS-information_container d-flex flex-row flex-wrap justify-center"
        >
            <div class="LMS-calendar d-flex justify-center flex-fill">
                <VCalendarVue />
            </div>
            <div
                class="LMS-balance d-flex flex-column align-center flex-fill pa-2"
            >
                <div class="d-flex">
                    <h3>Leave balance: 8</h3>
                    <v-divider vertical></v-divider>
                    <h3>Leave Taken: 2</h3>
                </div>
                <h3>Total Allowances: 10</h3>
            </div>
        </div>
        <div class="LMS-leaves_container">
            Your leaves:-
            <v-table fixed-header class="ma-3">
                <thead>
                    <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Calories</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in desserts" :key="item.name">
                        <td>{{ item.name }}</td>
                        <td>{{ item.calories }}</td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { reactive } from "vue";
    import VCalendarVue from "../components/VCalendar.vue";
    const desserts = reactive([
        {
            name: "Frozen Yogurt",
            calories: 159,
        },
        {
            name: "Ice cream sandwich",
            calories: 237,
        },
        {
            name: "Eclair",
            calories: 262,
        },
        {
            name: "Cupcake",
            calories: 305,
        },
        {
            name: "Gingerbread",
            calories: 356,
        },
        {
            name: "Jelly bean",
            calories: 375,
        },
        {
            name: "Lollipop",
            calories: 392,
        },
        {
            name: "Honeycomb",
            calories: 408,
        },
        {
            name: "Donut",
            calories: 452,
        },
        {
            name: "KitKat",
            calories: 518,
        },
    ]);
</script>

<style scoped>
    .LMS_container {
        width: 100%;
        background: whitesmoke;
    }
    .LMS-balance {
        background: #a0a0a3;
    }
</style>
