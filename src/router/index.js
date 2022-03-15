import { createRouter, createWebHistory } from "vue-router";

const routes = [
  /*
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    */
  {
    path: "/profesores",
    name: "profesores",
    component: () =>
      import(/* webpackChunkName: "profesores" */ "../views/Profesores.vue"),
  },
  {
    path: "/titulaciones",
    name: "titulaciones",
    component: () =>
      import(
        /* webpackChunkName: "titulaciones" */ "../views/Titulaciones.vue"
      ),
  },
  {
    path: "/titulacion/:codigo",
    name: "titulacion",
    component: () =>
      import(/* webpackChunkName: "titulacion" */ "../views/Titulacion.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
