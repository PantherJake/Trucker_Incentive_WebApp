import Home from '@/views/HomePage'
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/login', name:'LogInPage', component: ()=>import('@/views/LogInPage')},
    {path: '/apply', name:'ApplicationPage', component: ()=>import('@/views/ApplicationPage')},
    {path: '/driverdashboard', name:'DriverDashboardPage', component: ()=>import('@/views/DriverDashboardPage')},
    {path: '/sponsordashboard', name:'SponsorDashboardPage', component: ()=>import('@/views/SponsorDashboardPage')}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from) => {
    let isAuthenticated;
    if (
        // make sure the user is authenticated
        !isAuthenticated &&
        // ❗️ Avoid an infinite redirect
        to.name !== 'Login'
    ) {
        // redirect the user to the login page
        return { name: 'Login' }
    }
})

export default router