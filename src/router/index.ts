import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useCommonStore } from "@/stores/commonStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {requiredAuth: true},
      component: () => import("@/views/Home.vue")
    },
    {
      path: '/register',
      name: 'Register',
      meta: {guest: true},
      component: () => import('@/views/Register.vue')
    },
    {
      path: '/login',
      name: 'Login',
      meta: {guest: true},
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: {requiredAuth: true},
      component: () => import('@/views/Profile.vue')
    }
  ],
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const commonStore = useCommonStore();

    commonStore.showNav = false;

    if (to.meta.requiredAuth && !authStore.isAuthenticated()) {
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
