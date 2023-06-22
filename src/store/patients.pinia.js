import {defineStore} from "pinia";
import Request from "@/api";
import { useToast } from "./toast.pinia";

export const usePatients = defineStore('patients', {
    state: () => ({
        patients: [],
        patient:null
    }),
    actions: {
        createPatient(form){
            Request({
                url:"patient",
                method:"post",
                data:form
            }).then((res) => {
                console.log(res);
            }).catch((error) => {
                useToast().error(error)
            })
        },
        getAllPatients(){
            Request({
                url:"patient",
                method:"get"
            }).then((res) => {
                this.patients = res.data
            }).catch((error) => {
                useToast().error(error)
            })
        },
        deletePatient(id){
            Request({
                url:`patient/${id}`,
                method:"delete"
            }).then((res) => {
                useToast().success(res.data.message);
            }).catch((error) => {
                useToast().error(error)
            })
        },
    }
});
