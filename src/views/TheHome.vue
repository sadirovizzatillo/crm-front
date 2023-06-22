<template>
     <div>
        <el-container style="min-height: 100vh">
            <el-aside width="80px">
                <Sidebar/>
            </el-aside>
            <el-container>
                <el-header class="main-header">
                    <Header/>
                </el-header>
                <el-main style="padding: 32px;">
                    <router-view v-slot="{ Component }">
                        <!-- <keep-alive> -->
                            <component :is="Component" :key="$route.fullPath"/>
                        <!-- </keep-alive> -->
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div> 
    <!-- <template v-else>
        <div class="d-flex align-items-center justify-content-center w-100" style="height: 100vh;">
            <img src="../assets/images/loader.gif" alt="gif">
        </div>
    </template> -->
</template>

<script setup>
// import {useUsers} from "../stores/users.pinia.js";
import Sidebar from "@/components/SideBar.vue";
import Header from "@/components/TheHeader.vue";
// import {storeToRefs} from "pinia";
// const storeUser = useUsers();
// const {isUser, loading} = storeToRefs(storeUser);
// storeUser.getUserMe();

</script>



<style>
</style>