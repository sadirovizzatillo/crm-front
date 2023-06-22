<template>
    
    <TheComponentHeader 
    header-title="Kassa"
    route="Kassa"
    btn-title="Kassa qo'shish"
    />
    <div class="table__content">
        <el-table
        :data="patients"
        empty-text="Ma'lumot mavjud emas!"
        @row-click="handleRowClick"
        row-key="id"
        >
        <el-table-column type="index" label="№" width="55"/>
        <el-table-column label="Bemor Ismi" width="180">
            <template #default="scope">
                <span>{{ scope.row.name }} {{ scope.row.surname }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="roomNumber" label="Doktor xonasi" />
        <el-table-column label="Xizmat narxi">
            <template #default="scope">
                {{ scope.row.servicost }}
                <span>{{ PriceSpacer(scope.row.serviceCost) }} so'm</span>
            </template>
        </el-table-column>
        
        <!-- <el-table-column label="Ish vaqti">
            <template #default="scope">
                <span>{{ new Date(scope.row.workTime[0]).getHours() }}:{{ new Date(scope.row.workTime[1]).getHours() }}</span>
            </template>
        </el-table-column> -->
        
        <!-- <el-table-column width="182">
            <template #default="scope">
                <div class="actions">
                    <el-button 
                    size="small" 
                    @click="handleEdit(scope.row.id)"
                    >Edit</el-button
                    >
                    
                    <el-popconfirm 
                    title="Are you sure to delete this?"
                    @confirm="handleDelete(scope.row.id)"
                    >
                    <template #reference>
                        <el-button
                        size="small"
                        type="danger"
                        >Delete</el-button
                        >          
                    </template>
                </el-popconfirm>
            </div>
        </template>
    </el-table-column> -->
</el-table>
<ThePagination 
v-show="patients?.totalPages > 1"
:current-page="currentPage"
:size="size"
:total-elements="patients?.totalElements"
@set-pageable="setPageable($event)"
/>
</div>

<el-dialog 
v-model="cashDialog" 
title="Hisobotga qo'shish"
>
<el-form :model="form">
    <p v-show="averageSum">Bunday summa kiritish mumkin emas!</p>
    <p>Jami summa: {{ priceSpacer(form.totalSum) }} so'm</p>
    <el-form-item label="Bemor ismi" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Doktor" :label-width="formLabelWidth">
        <el-select v-model="form.doctorId" placeholder="Doktorni tanlash" disabled>
            <el-option 
            v-for="doctor in doctors"
            :label="doctor.doctorName" 
            :value="doctor.id"
            :key="doctor.id"
            />
        </el-select>
    </el-form-item>
    <el-form-item label="Naqd to'ladi" :label-width="formLabelWidth">
        <el-input v-model="form.payedByCash" type="number" autocomplete="off" min="0"/>
    </el-form-item>
    <el-form-item label="Karta orqali to'ladi" :label-width="formLabelWidth">
        <el-input v-model="form.payedByCard" type="number" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Qarz qoldi" :label-width="formLabelWidth">
        <el-input v-model="totalDebt" type="number" autocomplete="off" disabled/>
    </el-form-item>
</el-form>
<template #footer>
    <span class="dialog-footer">
        <el-button @click="cashDialog = false">Bekor qilish</el-button>
        <el-button 
        type="primary" 
        @click="submitCash">
        Tasdiqlash
    </el-button>
</span>
</template>
</el-dialog>

</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
// import { usePatients } from '@/store/patients.pinia'
import TheComponentHeader from '@/components/TheComponentHeader.vue';
import PriceSpacer from "@/helpers/PriceSpacer.js"
import ThePagination from '@/components/ThePagination.vue';
// import { useDoctors } from '@/store/doctors.pinia';
import { useStore } from '@/store';
import priceSpacer from '@/helpers/PriceSpacer.js';
import { useToast } from '@/store/toast.pinia';
// const storePatient = usePatients();
// const storeDoctor = useDoctors();
const store = useStore();
const { patients, doctors } = storeToRefs(store);
// const { doctors } = storeToRefs(storeDoctor);
const cashDialog = ref(false);
const formLabelWidth = '140px';
const size = ref(10);
const currentPage = ref(1);
const form = reactive({
    name: null,
    doctorId: null,
    totalSum: null,
    payedByCash: null,
    payedByCard: null,
    totalDebt: null,
    patientId: null,
    roomNumber:null,
    doctorName:null
})

const submitCash = () => {
    if(Number(totalDebt.value) >= 0 && Number(form.totalSum) === (Number(form.payedByCash) +  Number(form.payedByCard) + Number(totalDebt.value))){
        useStore().createReport({
            ...form,
            id: useStore().reports.length + 1
        })
        cashDialog.value = !cashDialog.value
    }else{
        useToast().error("Xato malumot kiritildi")
    }
    
}

const handleRowClick = (row) => {
    cashDialog.value = !cashDialog.value
    useStore().doctors.forEach(item => {
        if(item.id === row.doctorId){
            form.totalSum = item.serviceCost
            form.roomNumber = item.roomNumber,
            form.doctorName = item.doctorName
        }
    })
    // useDoctors().getAllDoctors();
    form.name = row.name
    form.doctorId = row.doctorId
    form.patientId = row.id
}



const averageSum = computed(() => {
    return Number(form.totalSum) < Number(form.payedByCash) +  Number(form.payedByCard) ? true : false
})

const totalDebt = computed(() => {
    return Number(form.totalSum) -  (Number(form.payedByCash) +  Number(form.payedByCard))
})


// onMounted(() => {
    //     usePatients().getAllPatients()
    // })
</script>