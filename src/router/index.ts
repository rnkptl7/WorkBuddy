import { createRouter, createWebHistory } from "vue-router";
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: () => import("@/views/Home.vue"),
        },
        {
            path: "/register",
            name: "Register",
            component: () => import("@/views/Register.vue"),
        },
        {
            path: "/login",
            name: "Login",
            component: () => import("@/views/Login.vue"),
        },
        {
            path: "/leave-request",
            name: "leaveRequest",
            component: () => import("@/views/LeaveRequest.vue"),
        },
    ],
});

export default router;
