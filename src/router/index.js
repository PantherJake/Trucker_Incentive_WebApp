import Home from '@/views/HomePage'
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/login', name:'LogInPage', component: ()=>import('@/views/LogInPage')},
    {path: '/apply', name:'ApplicationPage', component: ()=>import('@/views/ApplicationPage')},
    {path: '/driverdashboard', name:'DriverDashboardPage', component: ()=>import('@/views/DriverDashboardPage')},
    {path: '/sponsordashboard', name:'SponsorDashboardPage', component: ()=>import('@/views/SponsorDashboardPage')},
    {path: '/admindashboard', name:'AdminDashboardPage', component: ()=>import('@/views/AdminDashboardPage')},
    {path: '/driverdashboard/points', name:'DriverPointsPage', component: ()=>import('@/views/DriverPointsPage')},
    {path: '/driverdashboard/catalog', name:'DriverCatalogPage', component: ()=>import('@/views/DriverCatalogPage')},
    {path: '/sponsordashboard/points', name:'SponsorPointsPage', component: ()=>import('@/views/SponsorPointsPage')},
    {path: '/sponsordashboard/catalog', name:'SponsorCatalogPage', component: ()=>import('@/views/SponsorCatalogPage')},
    {path: '/sponsordashboard/drivers', name:'SponsorDriversPage', component: ()=>import('@/views/SponsorDriversPage')},
    {path: '/admindashboard/catalog', name:'AdminCatalogPage', component: ()=>import('@/views/AdminCatalogPage')},
    {path: '/admindashboard/drivers', name:'AdminDriversPage', component: ()=>import('@/views/AdminDriversPage')}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router