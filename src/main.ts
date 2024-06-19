import { createApp } from 'vue'
import { createDeviceDetector } from 'next-vue-device-detector'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './style.css'
import '@vuepic/vue-datepicker/dist/main.css'
import i18n from './i18n'
import router from '@/router/index'
import App from './App.vue'
import store from '@/store'
import ToastPlugin from '@/plugins/toastPlugin'
import setupVeeValidateI18n from '@/utils/vee-validate-rules'
export const device = createDeviceDetector()
const app = createApp(App)

app.use(router)
app.use(store)
app.use(device)
setupVeeValidateI18n()
app.use(Toast)
app.use(i18n)
app.use(ToastPlugin)
app.mount('#app')
