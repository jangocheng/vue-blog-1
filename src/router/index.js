import Vue from 'vue'
import Router from 'vue-router'

import pageNoFound from '../components/pages/404/PageNoFound'
import index from '../components/index'
import writeArticle from '../components/pages/WriteArticle/WriteArticle'
import login from '../components/pages/Login/Login'
import articleContent from '../components/pages/ArticleContent/ArticleContent'
import timeLine from '../components/pages/TimeLine/TimeLine'

Vue.use(Router)
export const constantRouterMap = [
  // 地址为空时跳转home页面
  {
    path: '',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: index
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/writeArticle',
    name: 'writeArticle',
    component: writeArticle
  },
  {
    path: '/articleContent',
    name: 'articleContent',
    component: articleContent
  },
  {
    path: '/timeLine',
    name: 'timeLine',
    component: timeLine
  }
]
export const asyncRouterMap = [
  {
    path: '*',
    redirect: '/pageNoFound',
    hidden: true
  },
  {
    path: '/pageNoFound',
    name: 'pageNoFound',
    component: pageNoFound,
    hidden: true
  }
]
export default new Router({
  routes: constantRouterMap
})
