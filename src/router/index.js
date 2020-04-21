import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login'
import indexRouter from '@/views/home/index'
import indexLayout from '@/views/layout/index'
Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: login },
  {
    path: '/',
    // name: 'layout',
    component: indexLayout,
    children: [
      { path: '', name: 'indexRouter', component: indexRouter }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
