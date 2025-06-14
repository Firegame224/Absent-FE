/* eslint-disable @typescript-eslint/no-explicit-any */
import "./styles/globals.css"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from "vue3-apexcharts";


import App from './App.vue'
import router from './router/index.ts'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueApexCharts as any);



app.mount('#app')
