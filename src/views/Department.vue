<template>
  <section>
    <div class="department-title"><strong>Department</strong></div>

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
          </div>

          <!-- Show empty text when there is no Employee -->
          <div
            v-if="getDepartmentItems(department.id).length === 0"
            class="empty-placeholder"
          >
            <span v-if="!isAdmin">No Employees</span>
            <span v-else>Drag here to add Employees</span>
          </div>

          <!-- Trigger Drag and Drop Event -->
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
                <div class="department-user-icon" v-if="item.gender === 'Male'">
                  <img
                    src="@/assets/images/profile-male.png"
                    alt="male-user-Icon"
                    width="100%"
                  />
                </div>
                <div class="department-user-icon" v-else>
                  <img
                    src="@/assets/images/profile-female.png"
                    alt="female-user-Icon"
                  />
                </div>
              </div>

              <div class="employee-details">
                <p class="title">Name: {{ item.fullName }}</p>
                <p class="text">Email: {{ item.email }}</p>
                <p class="text-subtitle-2">Location: Gujarat</p>
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
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import Swal from "sweetalert2";

const { isAdmin } = storeToRefs(useAuthStore());

const departmentList = [
  { id: 1, name: "Frontend", class: "frontend-dept" },
  { id: 2, name: "Backend", class: "backend-dept" },
  { id: 3, name: "DevOps", class: "devops-dept" },
  { id: 4, name: "Ui-Ux", class: "uiux-dept" },
];

//--------------------Sets necessary data for dragging an item--------------------//
const draggedItem = ref({});
const startDrag = (event, item) => {
  if (isAdmin.value) {
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("itemID", item.id);
    draggedItem.value = item;
  }
};

//--------------------Handles dropping an item into a department, updating its departmentId--------------------//
const onDrop = async (event, departmentId) => {
  const dragUserID = event.dataTransfer.getData("dragUserID");
  if (isAdmin.value) {
    const dragAndDropAlert = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#115173",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Drag It!",
    });

    if (dragAndDropAlert.isConfirmed) {
      let dragUser;
      if (departmentId === 1) {
        dragUser = frontendDept.find((dragUser) => dragUser.id == dragUserID);
      } else if (departmentId === 2) {
        dragUser = backendDept.find((dragUser) => dragUser.id == dragUserID);
      } else if (departmentId === 3) {
        dragUser = devopsDept.find((dragUser) => dragUser.id == dragUserID);
      } else {
        dragUser = uiuxDept.find((dragUser) => dragUser.id == dragUserID);
      }

      //--------------------Update data in Firebase--------------------//
      const employeeDataRef = doc(db, "users", draggedItem.value.userID);
      await updateDoc(employeeDataRef, {
        "register.department":
          departmentList[departmentId - 1].name.toLowerCase(),
      });
      await getUserDataFromDB();
    }
  } else {
    Swal.fire("Please ask to Admin");
  }
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
      gender: doc.data().register.gender,
      userID: doc.id,
      role: doc.data().register.role,
    };

    if (doc.data().register.department === "ui-ux") {
      uiuxDept.push({ ...displayUserData, departmentId: 4 });
    } else if (doc.data().register.department === "frontend") {
      frontendDept.push({ ...displayUserData, departmentId: 1 });
    } else if (doc.data().register.department === "backend") {
      backendDept.push({ ...displayUserData, departmentId: 2 });
    } else if (doc.data().register.department === "devops") {
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
  width: 100%;
  max-width: 1500px;
}

/* Customize Scroller */
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #115173;
}
::-webkit-scrollbar-track {
  background-color: white;
}

/* Employees Directory's CSS */
.department-title {
  width: auto;
  margin: 10px;
  padding: 10px;
  font-size: 25px;
  font-weight: 500;
  background-color: #f0f3fb;
  color: #115173;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
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
  font-size: 20px;
  height: 65vh;
  background: #f0f3fb;
  overflow-y: auto;
}

/* Card's CSS */
.employee-avatar {
  text-align: left;
  width: 35%;
}
.employee-details {
  text-align: left;
  width: 65%;
}
.employee-details .text {
  font-size: 15px;
}

.title,
.text,
.text-subtitle-2 {
  padding: 5px 0px;
  font-weight: 400;
}

.drag-el {
  display: flex;
  justify-content: center;
  margin-top: 10px;
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
  position: sticky;
  top: 0;
  z-index: 1;
  flex-direction: column;
}

.employee-card {
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  border-radius: 5px;
  margin-top: 15px;
  margin-left: 5%;
  margin-right: 5%;
  display: flex;
  padding: 3px 0;
}
.empty-placeholder {
  margin-top: 70%;
  background-color: #eaeaea;
  border: 2px dashed #cccccc;
  padding: 10px;
  border-radius: 5px;
  color: #555555;
}

.department-user-icon {
  margin-top: 10%;
  margin-left: 10%;
}

.department-user-icon img {
  width: 55%;
}

@media only screen and (max-width: 1786px) and (min-width: 1500px) {
  .department-name {
    font-size: 20px;
  }

  .title,
  .text {
    font-size: 20px;
  }

  .text-subtitle-2 {
    font-size: 13px !important;
  }

  .employee-details {
    width: 100%;
  }
}

@media only screen and (max-width: 1500px) and (min-width: 1380px) {
  .department-name {
    font-size: 20px;
  }

  .title,
  .text {
    font-size: 18px;
  }

  .text-subtitle-2 {
    font-size: 12px !important;
  }

  .employee-details {
    width: 100%;
  }
}

@media only screen and (max-width: 1380px) and (min-width: 1230px) {
  * {
    max-width: 96vw;
  }
  .v-row {
    display: grid;
    grid-template-columns: auto auto;
  }
  .empty-placeholder {
    display: grid;
    place-items: center;
  }
}

@media only screen and (max-width: 1230px) and (min-width: 1100px) {
  * {
    max-width: 96vw;
  }
  .v-row {
    display: grid;
    grid-template-columns: auto auto;
  }
}

@media only screen and (max-width: 1100px) and (min-width: 746px) {
  * {
    max-width: 96vw;
  }
  .v-row {
    display: grid;
    grid-template-columns: auto auto;
  }
}

@media only screen and (max-width: 746px) and (min-width: 600px) {
  * {
    max-width: 96vw;
  }
  .v-row {
    display: grid;
  }
}

@media only screen and (max-width: 600px) and (min-width: 320px) {
  * {
    max-width: 96vw;
  }
  .v-row {
    display: grid;
  }

  .department-name {
    font-size: 20px;
  }
  .title,
  .text {
    font-size: 18px;
  }

  .text-subtitle-2 {
    font-size: 13px !important;
  }
}
</style>
