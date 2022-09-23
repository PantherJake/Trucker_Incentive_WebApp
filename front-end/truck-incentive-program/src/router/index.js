import Home from '@/views/HomePage'
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/login', name:'LogInPage', component: ()=>import('@/views/LogInPage')},
    {path: '/signup', name:'SignUpPage', component: ()=>import('@/views/SignUpPage')}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router