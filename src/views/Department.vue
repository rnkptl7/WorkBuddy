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
          <div class="department-name">
            {{ department.name }}
            Department
          </div>

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
            @dragenter.prevent
            @dragover.prevent
          >
            <v-card class="employee-card">
              <div class="employee-avatar">
                <v-avatar
                  class="department-user-icon"
                  v-if="item.gender === 'Male'"
                >
                  <img src="@/assets/male.png" alt="male-user-Icon" />
                </v-avatar>

                <v-avatar class="department-user-icon" v-else>
                  <img src="@/assets/woman.png" alt="female-user-Icon" />
                </v-avatar>
              </div>

              <div class="employee-details">
                <p class="title">Name: {{ item.fullName }}</p>
                <p class="text">Email: {{ item.email }}</p>
                <p class="text-subtitle-2">Location: India</p>
              </div>
            </v-card>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useFirestore } from "vuefire";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const departmentList = [
  { id: 1, name: "frontend", class: "frontend-dept" },
  { id: 2, name: "backend", class: "backend-dept" },
  { id: 3, name: "devOps", class: "devops-dept" },
  { id: 4, name: "ui-ux", class: "uiux-dept" },
];

//--------------------Sets necessary data for dragging an item--------------------//

const draggedItem = ref({});

const startDrag = (event, item) => {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemID", item.id);
  console.log("itemID", item.userID);
  draggedItem.value = item;
  console.log(draggedItem, "Dragged");
};
//--------------------Handles dropping an item into a department, updating its departmentId--------------------//

const onDrop = async (event, departmentId) => {
  const itemID = event.dataTransfer.getData("itemID");

  let item;
  if (departmentId === 1) {
    item = frontendDept.find((item) => item.id == itemID);
  } else if (departmentId === 2) {
    item = backendDept.find((item) => item.id == itemID);
  } else if (departmentId === 3) {
    item = devopsDept.find((item) => item.id == itemID);
  } else if (departmentId === 4) {
    item = uiuxDept.find((item) => item.id == itemID);
  }
  console.log("onDrop: ", departmentId);

  //--------------------Update data in Firebase--------------------//

  console.log("userID-----", draggedItem.value.userID);
  const employeeDataRef = doc(db, "users", draggedItem.value.userID);

  await updateDoc(employeeDataRef, {
    "register.department": departmentList[departmentId - 1].name,
  });

  getUserDataFromDB();
};

const getDepartmentClass = (departmentId) => {
  return (
    departmentList.find((department) => department.id === departmentId)
      ?.class || ""
  );
};

//--------------------Get User Data From Firebase and Display it on DOM--------------------//

const db = useFirestore();
let frontendDept = reactive([]);
let backendDept = reactive([]);
let devopsDept = reactive([]);
let uiuxDept = reactive([]);

async function getUserDataFromDB() {
  frontendDept.length = 0;
  backendDept.length = 0;
  devopsDept.length = 0;
  uiuxDept.length = 0;

  const getUserDataFromDB = await getDocs(collection(db, "users"));
  getUserDataFromDB.forEach((doc) => {
    let displayUserData = {
      fullName: doc.data().register.fullName,
      department: doc.data().register.department,
      email: doc.data().register.email,
      location: "India",
      gender: doc.data().register.gender,
      userID: doc.id,
    };

    if (doc.data().register.department === "ui-ux") {
      uiuxDept.push({ ...displayUserData, departmentId: 4 });
    } else if (doc.data().register.department === "frontend") {
      frontendDept.push({ ...displayUserData, departmentId: 1 });
    } else if (doc.data().register.department === "backend") {
      backendDept.push({ ...displayUserData, departmentId: 2 });
    } else {
      devopsDept.push({ ...displayUserData, departmentId: 3 });
    }
  });
}

const getDepartmentItems = (departmentId) => {
  if (departmentId == 1) {
    return frontendDept;
  } else if (departmentId == 2) {
    return backendDept;
  } else if (departmentId == 3) {
    return devopsDept;
  } else if (departmentId == 4) {
    return uiuxDept;
  }
};

getUserDataFromDB();
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
  font-size: 27px;
  font-weight: 500;
  background-color: #f0f3fb;
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
.uiux-dept {
  border-radius: 3px;
  font-size: 20px;
  min-height: 100vh;
  background: #7f83854f;
}

/* Card's CSS */

.employee-avtar {
  text-align: left;
}
.employee-details {
  text-align: left;
}
.employee-details .text {
  font-size: 15px;
}
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
  font-size: 27px;
  font-weight: 500;
}

.employee-card {
  width: 96%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  border-radius: 5px;
  margin-top: 15px;
  display: flex;
}
.employee-avtar {
  width: 10vw;
}

.empty-placeholder {
  margin-top: 70%;
  background-color: #eaeaea;
  border: 2px dashed #cccccc;
  padding: 10px;
  border-radius: 5px;
  color: #555555;
}

.department-user-icon img {
  width: 70px;
  text-align: left;
}

.department-user-icon {
  text-align: left;
  position: absolute;
  left: 0px;
  top: 4px;
}
</style>
