import Home from '@/views/HomePage'
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/login', name:'LogInPage', component: ()=>import('@/views/LogInPage')},
    {path: '/apply', name:'ApplicationPage', component: ()=>import('@/views/ApplicationPage')},
    {path: '/profile', name:'ProfilePage', component: ()=>import('@/views/ProfilePage')},
    {path: '/cart', name:'CartPage', component: ()=>import('@/views/CartPage')},
    {path: '/driverdashboard', name:'DriverDashboardPage', component: ()=>import('@/views/DriverDashboardPage')},
    {path: '/driverpending', name:'DriverPendingPage', component: ()=>import('@/components/driver/DriverPending')},
    {path: '/sponsordashboard', name:'SponsorDashboardPage', component: ()=>import('@/views/SponsorDashboardPage')},
    {path: '/admindashboard', name:'AdminDashboardPage', component: ()=>import('@/views/AdminDashboardPage')},
    {path: '/driverdashboard/points', name:'DriverPointsPage', component: ()=>import('@/components/driver/DriverPoints')},
    {path: '/driverdashboard/catalog', name:'DriverCatalogPage', component: ()=>import('@/components/driver/DriverCatalog')},
    {path: '/sponsordashboard/points', name:'SponsorPointsPage', component: ()=>import('@/components/sponsor/SponsorPoints')},
    {path: '/sponsordashboard/catalog', name:'SponsorCatalogPage', component: ()=>import('@/components/sponsor/SponsorCatalog')},
    {path: '/sponsordashboard/drivers', name:'SponsorDriversPage', component: ()=>import('@/components/sponsor/SponsorDrivers')},
    {path: '/admindashboard/catalog', name:'AdminCatalogPage', component: ()=>import('@/components/admin/AdminCatalog')},
    {path: '/admindashboard/drivers', name:'AdminDriversPage', component: ()=>import('@/components/admin/AdminDrivers')},
    {path: '/admindashboard/audits', name:'AdminAuditsPage', component: ()=>import('@/components/admin/AdminAudit')},
    {path: '/sponsordashboard/audits', name:'SponsorAuditsPage', component: ()=>import('@/components/sponsor/SponsorAudit')},
    {path: '/admindashboard/create', name:'AdminCreatePage', component: ()=>import('@/components/admin/AdminCreate')},
    {path: '/sponsordashboard/create', name:'SponsorCreatePage', component: ()=>import('@/components/sponsor/SponsorCreate')},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router