import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import { useLocaleStore } from './stores/locale'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// Element Plus 国际化：根据 locale store 动态设置
const localeMap = { 'zh-CN': zhCn, en }
const piniaInstance = app.use(pinia)
const localeStore = useLocaleStore()
app.use(ElementPlus, { locale: localeMap[localeStore.lang] || zhCn })
app.use(router)

app.mount('#app')
