import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SeparateAudio from '../views/separate/SeparateAudio.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/separate',
      name: 'SeparateAudio',
      component: SeparateAudio,
    },
 
  ],
})

export default router
