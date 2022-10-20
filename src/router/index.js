import Home from '@/views/HomePage'
import { Auth } from 'aws-amplify';
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/login',
        name:'LogInPage',
        query: {redirects: 'driverdashboard'},
        component: ()=>import('@/views/LogInPage')},
    {path: '/apply', name:'ApplicationPage', component: ()=>import('@/views/ApplicationPage')},
    {path: '/driverdashboard', name:'DriverDashboardPage', component: ()=>import('@/views/DriverDashboardPage')},
    {path: '/sponsordashboard', name:'SponsorDashboardPage', component: ()=>import('@/views/SponsorDashboardPage')},
    {path: '/admindashboard', name:'AdminDashboardPage', component: ()=>import('@/views/AdminDashboardPage')},
    {path: '/driverdashboard/points', name:'DriverPointsPage', component: ()=>import('@/components/driver/DriverPoints')},
    {path: '/driverdashboard/catalog', name:'DriverCatalogPage', component: ()=>import('@/components/driver/DriverCatalog')},
    {path: '/sponsordashboard/points', name:'SponsorPointsPage', component: ()=>import('@/components/sponsor/SponsorPoints')},
    {path: '/sponsordashboard/catalog', name:'SponsorCatalogPage', component: ()=>import('@/components/sponsor/SponsorCatalog')},
    {path: '/sponsordashboard/drivers', name:'SponsorDriversPage', component: ()=>import('@/components/sponsor/SponsorDrivers')},
    {path: '/admindashboard/catalog', name:'AdminCatalogPage', component: ()=>import('@/components/admin/AdminCatalog')},
    {path: '/admindashboard/drivers', name:'AdminDriversPage', component: ()=>import('@/components/admin/AdminDrivers')}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isProtected = routes.includes(to.name)
    if(isProtected && !Auth.currentAuthenticatedUser()){
        next({
            path: '/login',
            query: { redirect: '/driverdashboard'}
        })
    }else next()
})

export default router