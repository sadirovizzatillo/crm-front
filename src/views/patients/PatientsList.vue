<template>
    
    <TheComponentHeader 
    header-title="Bemorlar"
    route="PatientFormAdd"
    btn-title="Bemor qo'shish"
    :is-button="false"
    />
    <div class="table__content">
        <el-table
        :data="patients"
        empty-text="Ma'lumot mavjud emas!"        >
        <el-table-column type="index" label="№" width="55"/>
        <el-table-column label="Ismi" width="180">
            <template #default="scope">
                <span>{{ scope.row.doctorName }} {{ scope.row.surname }}</span>
            </template>
        </el-table-column>
        <el-table-column label="Kasbi">
            <template #default="scope">
                <span>{{ scope.row.category }}</span>
            </template>
        </el-table-column>
        
        <el-table-column label="Xizmat narxi">
            <template #default="scope">
                <span>{{ PriceSpacer(scope.row.serviceCost) }} so'm</span>
            </template>
        </el-table-column>
        
        <el-table-column label="Ish vaqti">
            <template #default="scope">
                <span>{{ new Date(scope.row.workTime[0]).getHours() }}:{{ new Date(scope.row.workTime[1]).getHours() }}</span>
            </template>
        </el-table-column>
        
        <el-table-column width="182">
            <template #default="scope">
                <div class="actions">
                    <el-button 
                    size="small" 
                    @click="handleEdit(scope.row.id)"
                    >Tahrirlash</el-button
                    >
                    
                    <el-popconfirm 
                    title="Are you sure to delete this?"
                    @confirm="handleDelete(scope.row.id)"
                    >
                    <template #reference>
                        <el-button
                        size="small"
                        type="danger"
                        >O'chirish</el-button
                        >          
                    </template>
                </el-popconfirm>
            </div>
        </template>
    </el-table-column>
</el-table>
<!-- <ThePagination 
    v-show="doctors?.totalPages > 1"
    :current-page="currentPage"
    :size="size"
    :total-elements="doctors?.totalElements"
    @set-pageable="setPageable($event)"
    /> -->
</div>


</template>

<script setup>
// import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore } from '@/store';
// import { useDoctors } from '@/store/doctors.pinia'
import TheComponentHeader from '@/components/TheComponentHeader.vue';
import PriceSpacer from "@/helpers/PriceSpacer.js"
import router from '@/router';
// import ThePagination from '@/components/ThePagination.vue';
const store = useStore();

const { patients } = storeToRefs(store);


const handleEdit = (id) => {
    router.push({ name:"DoctorFormEdit", params: {id: id} })
}

const handleDelete = async (id) => {
    await useStore().deletePatient(id)
    // await useStore().getAllDoctors()
}

// onMounted(() => {
    //     useDoctors().getAllDoctors()
    // })
</script>