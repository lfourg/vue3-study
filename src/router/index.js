import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/home.vue'
import About from '../pages/about.vue'
import Login from '../pages/login.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },{
        path:'/login',
        name:'Login',
        component:Login
    }]

const router = createRouter({
    history: createWebHashHistory(),  //createWebHistory()
    routes
})

export default router