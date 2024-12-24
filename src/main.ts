import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import 'vant/lib/index.css'
import './style.css'
import 'vant/lib/index.css'
import router from './router'
import App from './App.vue'


const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

router.isReady().then(() => app.mount('#app'))
