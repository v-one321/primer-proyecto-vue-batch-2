import { createRouter, createWebHistory } from 'vue-router'
import PrimerComponente from '../views/PrimerComponente.vue'
import ApiRick from '../views/ApiRickComponente.vue'
import ApiSW from '../views/ApiStarWarsComponente.vue'
import ApiProductos from '../views/Productoscomponente.vue'
import CarritoProductos from '../views/CarritoComponente.vue'
import ApiNasa from '../views/ApiNasaComponente.vue'

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
    },
    {
      path: '/productos',
      component: ApiProductos
    },
    {
      path: '/carrito',
      component: CarritoProductos
    },
    {
      path: '/nasa',
      component: ApiNasa
    },
  ]
})

export default router
