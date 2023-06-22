import {defineStore} from "pinia";
import Request from "@/api";
import { useToast } from "./toast.pinia";

export const useDoctors = defineStore('doctors', {
    state: () => ({
        doctors: [],
        doctor:null
    }),
    actions: {
        createDoctor(form){
            Request({
                url:"doctor",
                method:"post",
                data:form
            }).then((res) => {
                console.log(res);
            }).catch((error) => {
                useToast().error(error)
            })
        },
        getAllDoctors(){
            Request({
                url:"doctor",
                method:"get"
            }).then((res) => {
                this.doctors = res.data
            }).catch((error) => {
                useToast().error(error)
            })
        },
        deleteDoctor(id){
            Request({
                url:`doctor/${id}`,
                method:"delete"
            }).then((res) => {
                useToast().success(res.data.message);
            }).catch((error) => {
                useToast().error(error)
            })
        },
    }
});
