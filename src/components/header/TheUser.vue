<template>
    <div class="user">
        <h3>{{ user_me?.fullName ? `Salom ${user_me?.fullName}, Xush Kelibsiz!` : 'Salom Асадбек Маматов, Xush Kelibsiz!' }}</h3>
        <span>{{ currentDate }}</span>
    </div>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useUsers} from "@/store/users.pinia";
import dayjs from "dayjs";
import {ref} from "vue";

const storeUser = useUsers();
const {user_me} = storeToRefs(storeUser);
const currentDate = ref(null);

const showTime = () => {
    let dateTime= new Date();
    currentDate.value = dayjs(dateTime).format("D MMMM YYYY, h:mm:ss");
    setInterval(() => {
        let dateTime= new Date();
        currentDate.value = dayjs(dateTime).format("D MMMM YYYY, h:mm:ss");
    }, 1000)
};
showTime();
</script>

<style>
@media screen and (max-width:900px) {
    .user{
        display: none !important;
    }
}
</style>