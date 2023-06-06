import './bootstrap';
import '../sass/app.scss'
import Router from '@/router'
import store from '@/store'

import App from '@/components/App.vue'
import '../../public/assets/css/font.css'
import '../../public/assets/css/style.css'
import '../../public/assets/css/responsives.css'



import { createApp } from 'vue/dist/vue.esm-bundler';

const app = createApp(App)
app.use(Router)
app.use(store)
app.mount('#app')
