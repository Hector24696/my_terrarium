import { createRouter, createWebHistory } from '@ionic/vue-router';
import ParametersPage from '../pages/ParametersPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/parameters'
  },
  {
    path:'/parameters',
    component: ParametersPage

  }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
