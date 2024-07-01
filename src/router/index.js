import { createRouter, createWebHistory } from 'vue-router'
import PrimerComponente from '../views/PrimerComponente.vue'
import ApiRick from '../views/ApiRickComponente.vue'
import ApiSW from '../views/ApiStarWarsComponente.vue'

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
    },
    {
      path: '/sw-api',
      component: ApiSW
    }
  ]
})

export default router
