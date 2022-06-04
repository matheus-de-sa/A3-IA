import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'LandingPage',
        component: () =>
            import(/* webpackChunkName: "LandingPage" */ '../views/LandingPage.vue'),
    },
    {
        path: '/home',
        name: 'Home',
        component: () =>
            import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
    },
    {
        path: '/documentation',
        name: 'Doc',
        component: () =>
            import(/* webpackChunkName: "Doc" */ '../views/Doc.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
