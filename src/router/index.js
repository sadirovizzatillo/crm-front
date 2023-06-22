import {createRouter, createWebHistory} from "vue-router";
import Home from "@/views/TheHome.vue";


const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: { name: 'RegisterUser' },
        component: Home,
        children:[
            {
                path:"register",
                name:"RegisterUser",
                component: () => import('@/views/register/RegisterUser.vue')
            },
            {
                path:"register/:doctorId",
                name:"RegisterNewPatient",
                component: () => import('@/views/register/RegisterForm.vue')
            },
            {
                path:"cash",
                name:"CashList",
                component: () => import('@/views/cash/CashList.vue')
            },
            {
                path:"doctor",
                name:"DoctorList",
                component: () => import('@/views/doctors/DoctorList.vue')
            },
            {
                path:"doctor/add",
                name:"DoctorFormAdd",
                component: () => import('@/views/doctors/DoctorForm.vue')
            },
            {
                path:"doctor/edit/:id",
                name:"DoctorFormEdit",
                component: () => import('@/views/doctors/DoctorForm.vue')
            },
            {
                path:"reports",
                name:"ReportList",
                component: () => import('@/views/report/ReportList.vue')
            },
            {
                path:"report/add",
                name:"ReportFormAdd",
                component: () => import('@/views/report/ReportForm.vue')
            },
            {
                path:"report/edit/:id",
                name:"ReportFormEdit",
                component: () => import('@/views/report/ReportForm.vue')
            },
            {
                path:"patients",
                name:"PatientsList",
                component: () => import('@/views/patients/PatientsList.vue')
            },
            {
                path:"patient/add",
                name:"PatientFormAdd",
                component: () => import('@/views/patients/PatientsForm.vue')
            },
            {
                path:"patient/edit/:id",
                name:"PatientFormEdit",
                component: () => import('@/views/patients/PatientsForm.vue')
            },
            {
                path:"report",
                name:"ReportList",
                component: () => import('@/views/report/ReportList.vue')
            },
            {
                path:"lab",
                name:"LobaratoryList",
                component: () => import('@/views/lab/LobaratoryList.vue')
            },
            {
                path:"settings",
                name:"MainSettings",
                component: () => import('@/views/settings/MainSettings.vue')
            },
            {
                path:"storage",
                name:"StorageList",
                component: () => import('@/views/storage/StorageList.vue')
            }
        ]
    },
    {
        path:"/login",
        name:"TheLogin",
        component: () => import('@/views/login/TheLogin.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

