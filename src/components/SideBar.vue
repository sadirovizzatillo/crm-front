<template>
    <el-menu
    class="el-menu-vertical-demo"
    >
    <div class="logo">
        <router-link style="text-decoration: none; color: white;" to="/">
            MED LOGO
            <!-- <img src="../assets/images/logos/logo-mini.svg" alt="zpos-logo"> -->
        </router-link>
    </div>
    <div class="links">
        <el-menu-item
        v-for="(menu,index) of menus"
        :key="index"
        :index="menu.index"
        class="links-item"
        :class="{'is-active': menu.path === route.path}"
        @click="router.push(menu.path)"
        >
        <el-icon>
            <Icons :icon_name="menu.icon"/>
        </el-icon>
        <router-link :to="menu.path">
            <span>{{ menu.name }}</span>
        </router-link>
        <div v-if="menu.notification" class="notification">
            <span>{{ menu.notification > 99 ? 99 + '+' : menu.notification }}</span>
        </div>
    </el-menu-item>
</div>
<div class="minimize">
    <div class="minimize__item">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_14_1942)">
                <path
                d="M18.9692 8.52649L14.8442 4.40149L13.6667 5.58316L17.25 9.16649H5.51416V10.8332H17.25L13.6667 14.4165L14.845 15.5948L18.97 11.4698C19.1635 11.2764 19.317 11.0467 19.4217 10.7939C19.5265 10.5411 19.5804 10.2701 19.5804 9.99649C19.5804 9.72286 19.5265 9.4519 19.4217 9.19911C19.317 8.94631 19.1635 8.71662 18.97 8.52316L18.9692 8.52649Z"
                fill="#7E7E7E"></path>
                <path
                d="M8.73 17.4999C8.73 17.7209 8.6422 17.9329 8.48592 18.0891C8.32964 18.2454 8.11768 18.3332 7.89667 18.3332H2.5C2.27899 18.3332 2.06702 18.2454 1.91074 18.0891C1.75446 17.9329 1.66667 17.7209 1.66667 17.4999V2.49988C1.66667 2.27886 1.75446 2.0669 1.91074 1.91062C2.06702 1.75434 2.27899 1.66654 2.5 1.66654H7.89667C8.11768 1.66654 8.32964 1.75434 8.48592 1.91062C8.6422 2.0669 8.73 2.27886 8.73 2.49988V6.94404H10.3967V2.49988C10.3967 1.83684 10.1333 1.20095 9.66444 0.732111C9.19559 0.26327 8.55971 -0.00012207 7.89667 -0.00012207L2.5 -0.00012207C1.83696 -0.00012207 1.20107 0.26327 0.732233 0.732111C0.263392 1.20095 0 1.83684 0 2.49988L0 17.4999C0 18.1629 0.263392 18.7988 0.732233 19.2676C1.20107 19.7365 1.83696 19.9999 2.5 19.9999H7.89667C8.55971 19.9999 9.19559 19.7365 9.66444 19.2676C10.1333 18.7988 10.3967 18.1629 10.3967 17.4999V13.0557H8.73V17.4999Z"
                fill="#7E7E7E"></path>
            </g>
            <defs>
                <clipPath id="clip0_14_1942">
                    <rect width="20" height="20" fill="white"></rect>
                </clipPath>
            </defs>
        </svg>
        <span @click="logout">Chiqish</span>
    </div>
</div>
</el-menu>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import Icons from "@/components/TheIcons.vue";

const route = useRoute();
const router = useRouter();

const logout = () => {
    router.push({ name:"TheLogin" })
}

const menus = [
{
    index: "1",
    name: "Registratsiya",
    icon: "ok",
    notification: "",
    path: "/",
    roles: []
},
{
    index: "2",
    name: "Kassa",
    icon: "cash",
    notification: "",
    path: "/cash",
    roles: []
},
{
    index: "3",
    name: "Vrachlar",
    icon: "settings",
    notification: "",
    path: "/doctor",
    roles: []
},
{
    index: "4",
    name: "Labaratoriya",
    icon: "lab",
    notification: "",
    path: "/lab",
    roles: []
},
{
    index: "5",
    name: "Hisobot",
    icon: "report",
    notification: "",
    path: "/report",
    roles: []
},
{
    index: "6",
    name: "Ombor",
    icon: "storage",
    notification: "",
    path: "/storage",
    roles: []
},
{
    index: "7",
    name: "Sozlamalar",
    icon: "settings",
    notification: "",
    path: "/settings",
    roles: []
},
{
    index: "8",
    name: "Bemorlar",
    icon: "patient",
    notification: "",
    path: "/patients",
    roles: []
},
];
</script>

<style>
.links-item{
    display: flex;
    flex-direction: column;
}
</style>