import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/json-formatter', name: 'JsonFormatter', component: () => import('../views/JsonFormatter.vue') },
  { path: '/codec', name: 'Codec', component: () => import('../views/Codec.vue') },
  { path: '/timestamp', name: 'Timestamp', component: () => import('../views/Timestamp.vue') },
  { path: '/qrcode', name: 'Qrcode', component: () => import('../views/Qrcode.vue') },
  { path: '/password', name: 'Password', component: () => import('../views/Password.vue') },
  { path: '/diff', name: 'Diff', component: () => import('../views/Diff.vue') },
  { path: '/image-base64', name: 'ImageBase64', component: () => import('../views/ImageBase64.vue') },
  { path: '/crontab', name: 'Crontab', component: () => import('../views/Crontab.vue') },
  { path: '/sponsor', name: 'Sponsor', component: () => import('../views/Sponsor.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
