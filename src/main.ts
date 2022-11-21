import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles.css'
import store, { key } from './vuex/store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)

app.use(store, key)
app.use(router)
app.use(Antd)

app.mount('#app')
