// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// export const useCounterStore = defineStore('counter', () => {
// state: () => {
//     return {
//       // for initially empty lists
//       userList: [] as UserInfo[],
//       // for data that is not yet loaded
//       user: null as UserInfo | null,
//     }
//   },
    
//     let isLoggedIn = ref(sessionStorage.getItem("isLoggedIn"));
//     let isAdmin = ref(sessionStorage.getItem("isAdmin"));

//     const isAuthenticated = () => {
//         const loggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));
//         isLoggedIn = loggedIn;
//         return (
//           loggedIn !== null &&
//           loggedIn !== undefined &&
//           loggedIn !== "" &&
//           loggedIn
//         );
//       }

// })

// interface State{
//     data: string;

// }

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            isLoggedIn: sessionStorage.getItem("isLoggedIn"),
            isAdmin: sessionStorage.getItem("isAdmin"),
            data: "djn"
      }
    },
    actions: {
        isAuthenticated() {
            const loggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));
            this.isLoggedIn = loggedIn;
            return (
              loggedIn !== null &&
              loggedIn !== undefined &&
              loggedIn !== "" &&
              loggedIn
            );
          },
    }
  })