import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import EventView from '@/views/EventView.vue'
import EventManagerView from '@/views/EventManagerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/',
      name: 'home',
      redirect: '/events',
      component: HomeView,

      children: [
        {
          path: 'events',
          name: 'event',
          component: EventView,
        },
        {
          path: 'event-management',
          name: 'eventmanager',
          component: EventManagerView,
        },
      ],
    },
  ],
})

export default router
