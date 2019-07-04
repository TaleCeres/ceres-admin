import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from 'comps/layout/default/index'
/* Router Modules */
import chartRouter from './modules/chart'
import formRouter from './modules/form'
import tableRouter from './modules/table'

// lazy-loaded when the route is visited
const _import = file => () => import(/* webpackChunkName: "about" */ `@/views/${file}.vue`)


Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active-link',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      component: Layout,
      name: '首页',
      redirect: '/home',
      meta: {
        title: '首页',
        icon: 'el-icon-menu',
      },
      children: [
        {
          path: '/home',
          name: 'home', // 配套中英文切换
          component: _import('home/index'),
          meta: {
            title: 'home',
            icon: 'el-icon-menu',
          },
        },
        {
          path: '/about',
          name: 'about',
          component: _import('about/index'),
          meta: {
            title: 'about',
            icon: 'el-icon-document',
          },
        },
        {
          path: '/guide',
          name: 'guide',
          component: _import('guide/index'),
          meta: {
            title: 'guide',
            icon: 'el-icon-setting',
          },
        },
        chartRouter,
        formRouter,
        tableRouter,
      ],
    },
    { path: '/login', component: _import('login/index'), hidden: true },
    { path: '/404', component: _import('error-page/404'), hidden: true },
    { path: '*', redirect: '/404', hidden: true },
  ],
})
