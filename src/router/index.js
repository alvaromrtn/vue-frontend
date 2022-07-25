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
      path: "/profesor/:columna_profesor/asignaturas",
      name: "asignaturasProfesor",
      component: () =>
        import("../views/asignaturasProfesor/AsignaturasProfesor.vue"),
    },
    {
      path: "/asignaturas",
      name: "asignaturas",
      component: () => import("../views/asignaturas/Asignaturas.vue"),
    },
    {
      path: "/asignatura/:id/profesores",
      name: "profesoresAsignatura",
      component: () =>
        import("../views/profesoresAsignatura/ProfesoresAsignatura.vue"),
    },
    {
      path: "/titulaciones",
      name: "titulaciones",
      component: () => import("../views/titulaciones/Titulaciones.vue"),
    },
    {
      path: "/titulacion/:codigo_titulacion/asignaturas",
      name: "asignaturasTitulacion",
      component: () =>
        import("../views/asignaturasTitulacion/AsignaturasTitulacion.vue"),
    },
    {
      path: "/titulacion/:codigo_titulacion/asignatura/:codigo_asignatura",
      name: "gruposAsignatura",
      component: () => import("../views/gruposAsignatura/GruposAsignatura.vue"),
    },
    {
      path: "/ajustes",
      name: "ajustes",
      component: () => import("../views/Ajustes.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "pageNotFound",
      component: () => import("../views/PageNotFound.vue"),
    },
  ],
});

export default router;
