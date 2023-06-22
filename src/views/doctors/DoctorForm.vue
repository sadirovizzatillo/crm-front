<template>
    <TheComponentHeader 
    :header-title="doctorId ? 'Doktorni tahrirlash' : 'Doktor qo\'shish'"
    route="DoctorList"
    btn-title="Orqaga"
    :is-button="true"
    />
    <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    class="demo-ruleForm"
    >
    <el-form-item label="Doktor ismi" prop="doctorName">
        <el-input v-model="ruleForm.doctorName"  autosize/>
    </el-form-item>
    <el-form-item label="Familiyasi" prop="surname">
        <el-input v-model="ruleForm.surname" type="input" />
    </el-form-item>
    <el-form-item label="Kategoriyasi" prop="category">
        <el-input v-model="ruleForm.category" type="input" />
    </el-form-item>
    <el-form-item label="Xizmat narxi" prop="serviceCost">
        <el-input v-model="ruleForm.serviceCost" type="input" />
    </el-form-item>
    <el-form-item label="Ish vaqti" required>
        <el-time-picker
        v-model="ruleForm.workTime"
        is-range
        range-separator="To"
        start-placeholder="Start time"
        end-placeholder="End time"
        />
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
import { useToast } from "@/store/toast.pinia"
import router from '@/router';
import TheComponentHeader from '@/components/TheComponentHeader.vue';
// import Request from '@/api';
import { useStore } from '@/store';
const ruleFormRef = ref();


const doctorId = ref(null)

const ruleForm = reactive({
    id:null,
    doctorName: '',
    workTime: null,
    surname: '',
    category: '',
    serviceCost:''
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
    category: [
    {
        required: true,
        message: 'Iltimos kategoriya kiriting',
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
    await formEl.validate((valid, fields) => {
        if (valid) {
            if(doctorId.value){
                useStore().updateDoctor(ruleForm);
                useToast().success("Muvaffaqqiyatli o'zgartirildi")
            }else{
                useStore().createDoctor({...ruleForm, id: useStore().doctors.length + 1});
                useToast().success("Muvaffaqqiyatli qo'shildi")
            }
            router.go(-1)
        } else {
            useToast().error("Noto'g'ri malumot kiritildi")
            console.log('error submit!', fields)
        }
    })
}

// const getOneDoctor = (id) => {
    //     Request({
        //         url:`doctor/${id}`,
        //         method:"get"
        //     }).then((res) => {
            //         ruleForm.doctorName =  res.data.name
            //         ruleForm.category =  res.data.category
            //         ruleForm.serviceCost =  res.data.serviceCost
            //         ruleForm.surname =  res.data.surname
            //         ruleForm.workTime =  res.data.workTime
            //     }).catch((error) => {
                //         useToast().error(error)
                //     })
                // }
                
                const resetForm = (formEl) => {
                    if (!formEl) return
                    formEl.resetFields()
                }
                
                onMounted(() => {
                    if(router.currentRoute.value.params.id){
                        doctorId.value = router.currentRoute.value.params.id;
                        // getOneDoctor(doctorId.value);
                        useStore().doctors.forEach(item => {
                            console.log(typeof item.id);
                            if(item.id === Number(doctorId.value)){
                                ruleForm.id = item.id
                                ruleForm.doctorName =  item.doctorName
                                ruleForm.category =  item.category
                                ruleForm.serviceCost =  item.serviceCost
                                ruleForm.surname =  item.surname
                                ruleForm.workTime =  item.workTime
                            }
                        })
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