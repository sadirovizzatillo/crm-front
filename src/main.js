import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@/assets/styles/main.scss";
import router from './router';
const pinia = createPinia();
const app =  createApp(App);

app.use(pinia).use(router);
app.use(ElementPlus)
app.mount('#app')