<template>
    <main class="profile-details">
        <v-card class="ma-5 card" width="12rem">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h5 mb-1">
                        5151
                    </v-list-item-title>
                    <v-list-item-subtitle>Employee ID</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" width="12rem">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h5 mb-1">
                        VueJS
                    </v-list-item-title>
                    <v-list-item-subtitle>Department</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" width="12rem">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h5 mb-1">
                        3years
                    </v-list-item-title>
                    <v-list-item-subtitle>Experience</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" width="12rem">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h5 mb-1">
                        5years
                    </v-list-item-title>
                    <v-list-item-subtitle
                        >Total Experience</v-list-item-subtitle
                    >
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" width="12rem">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h5 mb-1">
                        07-02-23
                    </v-list-item-title>
                    <v-list-item-subtitle>Joining Date</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" width="12rem">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h5 mb-1">
                        12-02-19
                    </v-list-item-title>
                    <v-list-item-subtitle
                        >Carrer Start Date</v-list-item-subtitle
                    >
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" width="12rem">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h5 mb-1">
                        15
                    </v-list-item-title>
                    <v-list-item-subtitle>Total Allowance</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" width="12rem">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h5 mb-1">
                        12
                    </v-list-item-title>
                    <v-list-item-subtitle>Leaves Left</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
        <v-card class="ma-5 card" width="12rem">
            <v-list-item three-line>
                <v-list-item-content class="ma-5">
                    <v-list-item-title class="text-h5 mb-1">
                        3
                    </v-list-item-title>
                    <v-list-item-subtitle>Leaves Taken</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>

        <!-- <div>
            <div class="dept ma-5">
                <h1>Department</h1>
                <h3>VueJs</h3>
            </div>
            <div class="dept ma-5">
                <h1>Department</h1>
                <h3>VueJs</h3>
            </div>
            <div class="dept ma-5">
                <h1>Department</h1>
                <h3>VueJs</h3>
            </div>
            <div class="dept ma-5">
                <h1>Department</h1>
                <h3>VueJs</h3>
            </div>
        </div> -->
    </main>
</template>
<script setup></script>
<style scoped>
.v-card {
    background: #f0f3fb;
    border-radius: 5%;
    border-left: 5px solid orange;
}
.profile-details {
    display: flex;
    flex-flow: row wrap;
}
/* .dept {
    display: block;
    flex-flow: row wrap;
    border-radius: 5%;
    border-left: 5px solid red;
} */
</style>
