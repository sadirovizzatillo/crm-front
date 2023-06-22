<template>
    <div class="component-header">
        <h2>{{ props.headerTitle }}</h2>
        <el-button v-show="isButton" type="primary" @click="toRoute">{{ props.btnTitle }}</el-button>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router'; 
const router = useRouter()
const props = defineProps({
    headerTitle:{
        type:String,
        required:true
    },
    route:{
        type:String
    },
    btnTitle:{
        type:String
    },
    isButton:{
        type:Boolean,
    }
})

const toRoute = () => {
    router.push({ name: props.route })
}
</script>
<style scoped>
.component-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
}
</style>