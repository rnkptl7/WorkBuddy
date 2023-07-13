<template>
  <div class="department-title">Department</div>

  <!-- Employees Directory -->

  <v-container>
    <v-row>
      <v-col class="department-list">
        <v-sheet class="pa-2 ma-2 front-end-dept">
          Frontend Department

          <!-- Cards -->

          <v-list lines="one">
            <v-list-item
              v-for="item in items"
              :key="item.title"
              :title="item.title"
            ></v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2 back-end-dept">
          Backend Department

          <!-- Cards -->

          <div class="card-data">
            <v-card
              title="Card title"
              text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, sit?"
            >
            </v-card>
          </div>
        </v-sheet>
      </v-col>

      <v-responsive width="100%"></v-responsive>

      <v-col>
        <v-sheet class="pa-2 ma-2 dev-ops-dept">
          DevOps

          <!-- Cards -->

          <div class="card-data">
            <v-card
              title="Card title"
              text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, sit?"
            >
            </v-card>
          </div>
        </v-sheet>
      </v-col>

      <v-col>
        <v-sheet class="pa-2 ma-2 qa-dept"
          >QA

          <!-- Cards -->

          <div class="card-data">
            <v-card
              title="Card title"
              text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, sit?"
            >
            </v-card></div
        ></v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup></script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: black;
}

/* Employees Directory's CSS */
.department-title {
  margin: 10px;
  padding: 10px;
}

.v-container {
  margin-top: 10%;
}

.v-row {
  text-align: center;
}

.front-end-dept,
.back-end-dept,
.dev-ops-dept,
.qa-dept {
  background-color: rgb(162, 253, 255);
  border-radius: 3px;
}

/* Card's CSS */

.card-data {
  width: 95%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
