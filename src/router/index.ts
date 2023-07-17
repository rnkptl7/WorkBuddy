import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import("@/views/Home.vue"),
      meta: { private: true },
    },

    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register.vue')
    },

    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },

    {
      path: '/department',
      name: 'Department',
      meta: { private: true },
      component: () => import('@/views/Department.vue')
    },   
]
})

export default router
