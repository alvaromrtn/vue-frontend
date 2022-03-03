import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    /*
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    */
    {
        path: '/profesores',
        name: 'profesores',
        component: () => import(/* webpackChunkName: "about" */ '../components/Profesor.vue')
    },
    {
        path: '/titulaciones',
        name: 'titulaciones',
        component: () => import(/* webpackChunkName: "about" */ '../components/Titulacion.vue')
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
