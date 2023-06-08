import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.js';

import '@fortawesome/fontawesome-free/css/all.css'; 


createApp(App).use(store).use(router).use(ElementPlus).use(bootstrap).mount('#app')

