import { ElNotification } from "element-plus";
import {defineStore} from "pinia";

export const useToast = defineStore('toast', {
    actions: {
        success(message){
            ElNotification.success({
                title:"Muvaffaqqiyatli",
                type:"success",
                message:message
            })
        },
        error(message){
            ElNotification.error({
                title:"Xato",
                type:"error",
                message:message
            })
        },
        warning(message){
            ElNotification.warning({
                title:"Ogohlantirish",
                type:"warning",
                message:message
            })
        }
    }
});