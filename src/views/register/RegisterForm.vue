<template>
    <TheComponentHeader 
    header-title="Bemor qo'shish"
    route="RegisterUser"
    btn-title="Orqaga"
    :is-button="true"
    />
    <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    class="demo-ruleForm"
    >
    <el-form-item label="Bemor ismi" prop="name">
        <el-input v-model="ruleForm.name"  autosize/>
    </el-form-item>
    <el-form-item label="Bemor familiyasi" prop="surname">
        <el-input v-model="ruleForm.surname" type="input" />
    </el-form-item>
    <el-form-item label="Nima orqali kelgan" prop="advertisementName">
        <el-input v-model="ruleForm.advertisementName" type="input" />
    </el-form-item>
    <el-form-item label="Viloyat" prop="region">
        <el-input v-model="ruleForm.region" type="input" />
    </el-form-item>
    <el-form-item label="Mobil Telefon" prop="mobilePhone">
        <el-input v-model="ruleForm.mobilePhone" type="tel"/>
    </el-form-item>
    <el-form-item label="Uy telefoni" prop="homePhone">
        <el-input v-model="ruleForm.homePhone" type="tel"/>
    </el-form-item>
    <el-form-item label="Shahar" prop="city">
        <el-input v-model="ruleForm.city" type="input" />
    </el-form-item>
    <el-form-item label="Uy manzili" prop="address">
        <el-input v-model="ruleForm.address" type="input" />
    </el-form-item>
    <el-form-item label="Doktor" prop="doctorId">
        <el-select v-model="ruleForm.doctorId">
            <el-option
            v-for="doctor in doctors" 
            :key="doctor.id"
            :label="doctor.doctorName + '(' + doctor.category + ')'"
            :value="doctor.id"
            >
        </el-option>
    </el-select>
</el-form-item>

<el-form-item label="Tug'ilgan sanasi" required>
    <el-date-picker
    v-model="ruleForm.dateOfBirth"
    is-range
    range-separator="To"
    start-placeholder="Start time"
    end-placeholder="End time"
    />
</el-form-item>

<el-form-item label="Jinsi" prop="gender">
    <el-radio-group v-model="ruleForm.gender" size="large">
        <el-radio-button label="ERKAK" />
        <el-radio-button label="AYOL" />
    </el-radio-group>
</el-form-item>
</el-form>
<div>
    <el-button type="primary" @click="submitForm(ruleFormRef)">
        Create
    </el-button>
    <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
</div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
// import { useDoctors } from "@/store/doctors.pinia"
// import { usePatients } from "@/store/patients.pinia"
import { useStore } from '@/store';
import { useToast } from "@/store/toast.pinia"
import router from '@/router';
import TheComponentHeader from '@/components/TheComponentHeader.vue';
// import Request from '@/api';
import { storeToRefs } from 'pinia';
const ruleFormRef = ref();
const store = useStore();

const { doctors } = storeToRefs(store);
const doctorId = ref(null)

const ruleForm = reactive({
    name: '',
    dateOfBirth: null,
    surname: '',
    serviceCost:'',
    advertisementName:'',
    region:'',
    homePhone:'',
    mobilePhone:'',
    city:'',
    doctorId:null,
    address:'',
    roomNumber:null,
    gender: 'ERKAK',
})

const rules = reactive({
    doctorName: [
    { required: true, message: 'Iltimos ism kiriting', trigger: 'blur' },
    ],
    surname: [
    {
        required: true,
        message: 'Iltimos familiya kiriting',
        trigger: 'blur',
    },
    ],
    serviceCost: [
    {
        required: true,
        message: 'Iltimos xizmat narxini kiriting',
        trigger: 'blur',
    },
    ],
    workTime: [
    {
        type: 'date',
        required: true,
        message: 'Iltimos ishlash vaqtini kiriting',
        trigger: 'change',
    },
    ]
})

const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            useStore().createPatients({...ruleForm, id: useStore().patients.length + 1});
            router.go(-1)
        } else {
            useToast().error("Xato malumot kiritildi")
        }
    })
}

// const getOneDoctor = (id) => {
    //     Request({
        //         url:`doctor/${id}`,
        //         method:"get"
        //     }).then((res) => {
            //         ruleForm.doctorId = res.data.id
            //     }).catch((error) => {
                //         useToast().error(error)
                //     })
                // }
                
                const resetForm = (formEl) => {
                    if (!formEl) return
                    formEl.resetFields()
                }
                
                onMounted(() => {
                    // useDoctors().getAllDoctors();
                    if(router.currentRoute.value.params.doctorId){
                        doctorId.value = router.currentRoute.value.params.doctorId;
                        ruleForm.doctorId = router.currentRoute.value.params.doctorId;
                        useStore().doctors.forEach(item => {
                            if(item.id === Number(doctorId.value)){
                                ruleForm.doctorId = item.id;
                                ruleForm.serviceCost = item.serviceCost
                                ruleForm.roomNumber = item.roomNumber
                            }
                        })
                        // getOneDoctor(doctorId.value);
                    }
                })
            </script>
            
            
            <style scoped>
            .demo-ruleForm{
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
            }
            
            .demo-ruleForm .el-form-item{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
            }
        </style>