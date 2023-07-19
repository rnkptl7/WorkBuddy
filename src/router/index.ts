import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useCommonStore } from "@/stores/commonStore";

const router = createRouter({

    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            meta: { requiresAuth: true },
            component: () => import("@/views/Home.vue"),
        },
        {
            path: "/register",
            name: "Register",
            meta: { guest: true },
            component: () => import("@/views/Register.vue"),
        },
        {
            path: "/login",
            name: "Login",
            meta: { guest: true },
            component: () => import("@/views/Login.vue"),
        },
        {
            path: "/helpdesk",
            name: "Help",
            meta: { requiresAuth: true },
            component: () => import("@/views/HelpDesk.vue"),
        },
        {
            path: "/profile",
            name: "Profile",
            meta: { requiresAuth: true },
            component: () => import("@/views/Profile.vue"),
        },
        {
            path: "/leave-request",
            name: "leaveRequest",
            meta: { requiresAuth: true },
            component: () => import("@/views/LeaveRequest.vue"),
        },
        {
            path: '/:pathMatch(.*)*',meta: { requiresAuth: true }, component: () => import("@/views/Home.vue")
        },
        {
          path: '/department',
          name: 'Department',
          meta: {requiresAuth: true},
          component: () => import('@/views/Department.vue')
        }, 
    ],
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const commonStore = useCommonStore();

    commonStore.overlay = false;

    if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
        next("/login");
    } else if (
        to.meta.proctectedAdmin &&
        authStore.isAuthenticated() &&
        !authStore.isAdmin
    ) {
        next("/");
    } else if (to.meta.guest && authStore.isAuthenticated()) {
        next("/");
    } else {
        next();
    }
});

export default router;
