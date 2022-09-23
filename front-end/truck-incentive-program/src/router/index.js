import Home from '@/views/Home'
import LogInPage from '@/views/LogInPage'
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/login', name:'LogInPage', component: LogInPage}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router