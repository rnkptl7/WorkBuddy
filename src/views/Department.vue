<template>
  <section>
    <div class="department-title">Department</div>

    <!-- Employees Directory -->

    <div>
      <v-row justify="space-between">

        <v-col @drop="onDrop($event, 1)" @dragenter.prevent @dragover.prevent>
          <v-sheet class="pa-2 ma-2 front-end-dept">
            Frontend Department

            <!-- Show empty text when there is no item -->
            <div v-if="getList(1).length === 0">
              <span>No items found</span>
            </div>

            <div v-for="item in getList(1)" :key="item.id" class="drag-el" draggable="true"
              @dragstart="startDrag($event, item)">
              <v-card width="400" :title="item.title" text="Contact Info" :prepend-avatar="item.avatar"></v-card>
            </div>

          </v-sheet>
        </v-col>

        <v-col @drop="onDrop($event, 2)" @dragenter.prevent @dragover.prevent>
          <v-sheet class="pa-2 ma-2 back-end-dept ">
            Backend Department
            <div v-for="item in getList(2)" :key="item.id" class="drag-el" draggable="true"
              @dragstart="startDrag($event, item)">
              <v-card width="400" :title="item.title" text="Contact Info"></v-card>
            </div>
          </v-sheet>
        </v-col>

        <v-col @drop="onDrop($event, 3)" @dragenter.prevent @dragover.prevent>
          <v-sheet class="pa-2 ma-2 dev-ops-dept">
            DevOps Department
            <div v-for="item in getList(3)" :key="item.id" class="drag-el" draggable="true"
              @dragstart="startDrag($event, item)">
              <v-card width="400" :title="item.title" text="Contact Info"></v-card>
            </div>
          </v-sheet>
        </v-col>

        <v-col @drop="onDrop($event, 4)" @dragenter.prevent @dragover.prevent>
          <v-sheet class="pa-2 ma-2 qa-dept">
            QA Department
            <div v-for="item in getList(4)" :key="item.id" class="drag-el" draggable="true"
              @dragstart="startDrag($event, item)">
              <v-card width="400" :title="item.title" text="Contact Info"></v-card>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
  { id: 0, title: "Prem", list: 1 },
  { id: 1, title: "Aman", list: 2 },
  { id: 2, title: "Dixit", list: 3 },
  { id: 3, title: "Ronak", list: 4 },
  { id: 4, title: "Shyam", list: 4 },
]);

//--------------------------------------Separate the Items--------------------------------------//

const getList = (list) => {
  return items.value.filter((item) => item.list == list);
};

//----------------------------------Drag and Drop Functionality----------------------------------//

const startDrag = (event, item) => {
  console.log(item);
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemID", item.id);
};

const onDrop = (event, list) => {
  const itemID = event.dataTransfer.getData("itemID");
  const item = items.value.find((item) => item.id == itemID);
  item.list = list;
};
</script>


<style scoped>
* {
  margin: 0;
  box-sizing: border-box;
  color: black;
  width: 100%;
}

/* Employees Directory's CSS */
.department-title {
  margin: 10px;
  padding: 10px;
  font-size: 25px;
}

.v-row {
  text-align: center;
}

.v-col {
  width: 20%;
}

.front-end-dept,
.back-end-dept,
.dev-ops-dept,
.qa-dept {
  border-radius: 3px;
  font-size: 20px;
  min-height: 80vh;
  background: #f0f3fb;
}

/* Card's CSS */

.drag-el {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.card-title {
  background-color: transparent;
  border: none;
}
</style>
