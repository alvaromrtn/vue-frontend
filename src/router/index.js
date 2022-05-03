import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/contacto",
    name: "contacto",
    component: () => import("../views/Contacto.vue"),
  },
  {
    path: "/profesores",
    name: "profesores",
    component: () => import("../views/Profesores.vue"),
  },
  {
    path: "/titulaciones",
    name: "titulaciones",
    component: () => import("../views/Titulaciones.vue"),
  },
  {
    path: "/titulacion/:codigo_titulacion",
    name: "titulacion",
    component: () => import("../views/AsignaturasTitulacion.vue"),
  },
  {
    path: "/titulacion/:codigo_titulacion/asignatura/:codigo_asignatura",
    name: "asignatura",
    component: () => import("../views/GruposAsignatura.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
