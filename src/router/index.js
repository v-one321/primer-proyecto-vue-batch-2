import { createRouter, createWebHistory } from 'vue-router'
import PrimerComponente from '../views/PrimerComponente.vue'
import ApiRick from '../views/ApiRickComponente.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: PrimerComponente
    },
    {
      path: '/api',
      component: ApiRick
    }
  ]
})

export default router
