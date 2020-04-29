import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login'
import indexRouter from '@/views/home/index'
import indexLayout from '@/views/layout/index'
import article from '@/views/article/index'
import publishArticle from '@/views/publish/index'
import image from '@/views/image/index'
import comment from '@/views/comment/index'
import setting from '@/views/setting/index'
import fans from '@/views/fans/index'
Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: login },
  {
    path: '/',
    // name: 'layout',
    component: indexLayout,
    children: [
      { path: '', name: 'indexRouter', component: indexRouter },
      { path: '/article', name: 'articleMent', component: article },
      { path: '/publish', name: 'publishArticle', component: publishArticle },
      { path: '/image', name: 'image', component: image },
      { path: '/comment', name: 'comment', component: comment },
      { path: '/settings', name: 'setting', component: setting },
      { path: '/fans', name: 'fans', component: fans }
    ]
  }
]
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是 /login，校验登录状态
  // 如果没有登录，则跳转到登录页面
  // 如果登录了，则允许通过
  // 允许通过
  // next()

  const user = JSON.parse(window.localStorage.getItem('user'))
  // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      // 已登录，允许通过
      next()
    } else {
      // 没有登录，跳转到登录页面
      next('/login')
    }
  } else {
    // 登录页面，正常允许通过
    next()
  }
})
export default router
