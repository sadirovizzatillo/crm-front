<template>
    <el-pagination
    :current-page="currentPage"
    :page-size="size"
    layout="prev, pager, next"
    :prev-icon="Back"
    :next-icon="Right"
    :total="totalElements"
    @currentChange="handlePageChange"
    />
</template>

<script setup>
import {Back, Right} from "@element-plus/icons-vue";
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['setPageable']);


defineProps({
    size:{
        type:Number || String
    },
    totalElements:{
        type:Number || String
    },
    currentPage:{
        type: Number || String
    }
})

const  handlePageChange = (newPage) => {
    emit("setPageable", newPage);
}


</script>

