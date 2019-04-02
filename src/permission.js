import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth'

const whiteList = ['/login', '/index', '/writeArticle', '/articleContent', '/timeLine', '/hotSpot', '/pageNoFound'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    if (getToken()) {
      if (store.getters.token) {
        next()
      } else {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          if (res.data.errorCode === 0) {
            console.log(123, res)
            next()
          } else {
            next('/login')
            NProgress.done()
          }
        }).catch(res => {
          next('/login')
          NProgress.done()
        })
      }
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
