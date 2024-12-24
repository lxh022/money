import routes from './routes'
import { createRouter, createWebHashHistory } from 'vue-router'

// 实例化路由
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
