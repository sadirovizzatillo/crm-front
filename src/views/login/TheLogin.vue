<template>
    <div class="login">
        <el-row>
            <el-col :span="12">
                <div class="login__image"></div>
            </el-col>
            <el-col :span="12">
                <div class="login__form">
                    <div class="logo">
                        <!-- Medical -->
                        <!-- <img src="../../assets/images/logos/logo-blue.svg" alt="zpos-logo"> -->
                    </div>
                    <div class="form">
                        <div class="form__title">
                            <h3>Xush Kelibsiz!</h3>
                            <p>CRM tizimiga kirish uchun ma'lumotlaringizni kiriting.</p>
                        </div>
                        <el-form
                        ref="formRef"
                        :model="formState"
                        label-position="top"
                        >
                        <el-form-item
                        label="Login"
                        prop="username"
                        :rules="[{ required: true, message: 'login kiritilishi shart' }]"
                        >
                        <el-input
                        v-model="formState.username"
                        type="text"
                        placeholder="Logini kiriting"
                        autocomplete="off"
                        />
                    </el-form-item>
                    <el-form-item
                    label="Parol"
                    prop="password"
                    :rules="[{ required: true, message: 'parol kiritilishi shart' }]"
                    >
                    <el-input
                    v-model="formState.password"
                    type="password"
                    placeholder="Parolni kiriting"
                    autocomplete="off"
                    show-password
                    >
                    <template #suffix>
                        
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="checked" label="Malumotlarni eslab qolish"/>
            </el-form-item>
            <el-form-item>
                <el-button type="submit" @click="submitForm">Kirish</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="copyright">
        <p>© Zpos 2021-2023</p>
    </div>
</div>       
</el-col>
</el-row>
</div>


</template>

<script setup>
import { useToast } from '@/store/toast.pinia';
import {reactive, ref} from 'vue'
// import {useUsers} from "@/stores/users.pinia";
import { useRouter } from "vue-router"
// const userStore = useUsers();
const checked = ref(false);
const router = useRouter()
const formState = reactive({
    username: "",
    password: "",
});

const submitForm = () => {
    if(formState.username === "admin" && formState.password === "admin123"){
        router.push({ name:"RegisterUser"});
        useToast().success("Tizimga xush kelibsiz");
    }else{
        useToast().error("Login parol noto'g'ri");
    }
};
</script>
