<template>
    <div>
        <TheComponentHeader 
        header-title="Registratsiya"
        route="DoctorFormAdd"
        btn-title="Registratsiya qilish"
        :is-button="false"
        />
    </div>
    <el-row :gutter="12">
        <el-col
        :span="6" 
        v-for="(doctor, index) in doctors" 
        :key="index"
        >
        <TheCard
        @handle-card-select="handleCardSelect"
        :card="doctor"
        /> 
    </el-col>
</el-row>
</template>

<script setup>
import TheCard from '@/components/TheCard.vue';
import TheComponentHeader from '@/components/TheComponentHeader.vue';
// import { onMounted } from 'vue';
// import { useDoctors } from '@/store/doctors.pinia';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
// import PriceSpacer from "@/helpers/PriceSpacer.js"
import { useRouter } from 'vue-router';
// const storeDoctor = useDoctors();
const store = useStore();
const router = useRouter()
// const { doctors } = storeToRefs(storeDoctor);
const { doctors } = storeToRefs(store);

const handleCardSelect = (id) => {
    router.push({ name:"RegisterNewPatient", params: { doctorId: id}})
}

// onMounted(() => {
//     useDoctors().getAllDoctors()
// })
</script>

<style>

</style>

