import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles.css'
import router from './router'
import store, { key } from './store/store'

const app = createApp(App)

app.use(store, key)
app.use(router)
app.use(Antd)

app.mount('#app')
