import { createRouter, createWebHistory } from "@ionic/vue-router";


const routes = [
  {
    path: "/",
    redirect: "/my_terrarium",
  },
  {
    path: "/my_terrarium",
    name: "my_terrarium",
    component: () => import('@/pages/ParametersPage.vue')
  },
  {
    path: "/parameter_historics/",
    name:"historics",
    component: () => import('@/pages/HistoricPage.vue'),
  },
  {
    path:"/parameter_historics/:id",
    component: () => import('@/pages/HistoricDataPage.vue'),
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
