<template>
    <el-card 
    @click="handleCardSelect(card?.id)"
    shadow="hover"
    :body-style="{ maxWidth: '300px', cursor:'pointer'}"
    >
    <div class="card-header">
        <h3>{{ card?.name }} {{ card?.surname }}</h3>
        <p>{{ card?.category }}</p>
    </div>
    
    <div class="card-main">
        <h3>Ish vaqti:</h3>
        <p>{{ new Date(card?.workTime[0]).getHours() }}-{{ new Date(card?.workTime[1]).getHours() }}</p>
    </div>
</el-card>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits('handleCardSelect')

defineProps({
    card:{
        type:Object,
        required:true
    }
})

const handleCardSelect = (id) => {
    emit('handleCardSelect', id)
}

</script>

<style scoped>
.card-header{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 16px;
}
.card-main{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>