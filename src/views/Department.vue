<template>
  <section>
    <div class="department-title">Department</div>

    <!-- Employees Directory -->

    <v-row>
      <v-col
        v-for="department in departmentList"
        :key="department.id"
        @drop="onDrop($event, department.id)"
        @dragenter.prevent
        @dragover.prevent
        cols="12"
        sm="3"
      >
        <v-sheet :class="[getDepartmentClass(department.id)]">
          <div class="department-name">{{ department.name }}</div>

          <!-- Show empty text when there is no item -->

          <div
            v-if="getDepartmentItems(department.id).length === 0"
            class="empty-placeholder"
          >
            <span>Drag here to add Employees</span>
          </div>

          <div
            v-for="item in getDepartmentItems(department.id)"
            :key="item.id"
            class="drag-el"
            draggable="true"
            @dragstart="startDrag($event, item)"
          >
            <v-card
              :title="item.title"
              text="Contact Info"
              subtitle="Locations"
              class="employee-card"
            ></v-card>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </section>
</template>

<script setup>
import { ref } from "vue";

const employeeList = ref([
  { id: 0, title: "Prem", departmentId: 1 },
  { id: 1, title: "Aman", departmentId: 2 },
  { id: 2, title: "Dixit", departmentId: 3 },
  { id: 3, title: "Ronak", departmentId: 4 },
  { id: 4, title: "Shyam", departmentId: 2 },
]);

const departmentList = [
  { id: 1, name: "Frontend Department", class: "frontend-dept" },
  { id: 2, name: "Backend Department", class: "backend-dept" },
  { id: 3, name: "DevOps Department", class: "devops-dept" },
  { id: 4, name: "QA Department", class: "qa-dept" },
];

//--------------------Filters and returns items belonging to a specific department--------------------//

const getDepartmentItems = (departmentId) => {
  return employeeList.value.filter(
    (item) => item.departmentId === departmentId
  );
};

//--------------------Sets necessary data for dragging an item--------------------//

const startDrag = (event, item) => {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemID", item.id);
};

//--------------------Handles dropping an item into a department, updating its departmentId--------------------//

const onDrop = (event, departmentId) => {
  const itemID = event.dataTransfer.getData("itemID");
  const item = employeeList.value.find((item) => item.id == itemID);
  item.departmentId = departmentId;
};

//--------------------Returns the CSS class name for a department based on its id--------------------//

const getDepartmentClass = (departmentId) => {
  return (
    departmentList.find((department) => department.id === departmentId)
      ?.class || ""
  );
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

.frontend-dept,
.backend-dept,
.devops-dept,
.qa-dept {
  border-radius: 3px;
  font-size: 20px;
  min-height: 70vh;
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

.department-name {
  background-color: #115173;
  color: white;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.employee-card {
  width: 95%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  border-radius: 5px;
  margin-top: 15px;
}

.empty-placeholder {
  margin-top: 80%;
  background-color: #eaeaea;
  border: 2px dashed #cccccc;
  padding: 10px;
  border-radius: 5px;
  color: #555555;
}
</style>
