// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import axios from '@/utils/request'
import router from './router'
import { asyncRouterMap } from '@/router/index'
import store from './store/index'
import 'font-awesome/css/font-awesome.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/permission'
import infiniteScroll from 'vue-infinite-scroll'

Vue.prototype.axios = axios

Vue.use(infiniteScroll)
Vue.use(ElementUI)

Vue.config.productionTip = false

// 动态添加路由
store.commit('SET_ROUTERS', asyncRouterMap)
router.addRoutes(store.getters.addRouters)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App)
})
