import Home from '@/views/HomePage'
import {createRouter, createWebHistory} from "vue-router";
import {Auth} from "aws-amplify";

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/login', name:'LogInPage', component: ()=>import('@/views/LogInPage')},
    {path: '/apply', name:'ApplicationPage', component: ()=>import('@/views/ApplicationPage')},
    {path: '/profile', name:'ProfilePage', component: ()=>import('@/views/ProfilePage'), meta: {requiresAuth: true}},
    {path: '/cart', name:'CartPage', component: ()=>import('@/views/CartPage'), meta: {requiresAuth: true}},
    {path: '/driverdashboard', name:'DriverDashboardPage', component: ()=>import('@/views/DriverDashboardPage'), meta: {requiresAuth: true}},
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

router.beforeResolve(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        try {
            await Auth.currentAuthenticatedUser();
            next();
        } catch (e) {
            next({
                path: "/",
                query: {
                    redirect: to.fullPath
                }
            });
        }
    }
    next();
});

export default router