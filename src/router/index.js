import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
      component: () => import("../views/profesores/Profesores.vue"),
    },
    {
      path: "/profesor/:columna_profesor",
      name: "profesor",
      component: () => import("../views/AsignaturasProfesor.vue"),
    },
    {
      path: "/asignaturas",
      name: "asignaturas",
      component: () => import("../views/asignaturas/Asignaturas.vue"),
    },
    {
      path: "/titulaciones",
      name: "titulaciones",
      component: () => import("../views/titulaciones/Titulaciones.vue"),
    },
    {
      path: "/titulacion/:codigo_titulacion/asignaturas",
      name: "titulacion",
      component: () =>
        import("../views/asignaturasTitulacion/AsignaturasTitulacion.vue"),
    },
    {
      path: "/titulacion/:codigo_titulacion/asignatura/:codigo_asignatura",
      name: "asignatura",
      component: () => import("../views/GruposAsignatura.vue"),
    },
    {
      path: "/ajustes",
      name: "ajustes",
      component: () => import("../views/Ajustes.vue"),
    },
    /*
    {
      path: "/:pathMatch(.*)*",
      name: "pageNotFound",
      component: PageNotFound,
    },
    */
  ],
});

export default router;
