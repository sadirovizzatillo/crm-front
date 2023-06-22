import { createPinia } from "pinia";
import { markRaw } from "vue";
import { Router } from "vue-router";
import { router } from "@/router"

export const pinia = createPinia();

pinia.use(({ store }) => {
    store.router = markRaw(router)
})
