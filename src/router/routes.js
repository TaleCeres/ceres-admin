import Layout from 'comps/layout/default'
import Midlayer from 'comps/layout/midlayer'
/* Router Modules */
import homeRouter from './modules/home'
import adminRouter from './modules/admin'
import aboutRouter from './modules/about'
import chartRouter from './modules/chart'
import formRouter from './modules/form'
import tableRouter from './modules/table'
// lazy-loaded when the route is visited
// const _import = file => () => import(/* webpackChunkName: "about" */ `@/views/${file}.vue`)
const _import = file => () => import(`@/views/${file}.vue`)

/* eslint-disable */
/* 处理router的函数 */
function processRouterWithTemplate(router) {
  router.component = Layout // 一级路由的模版为 Layout
  if (router.hasOwnProperty('children')) {
    let { children: childrenRouter } = router
    childrenRouter.forEach(item => {
      // 判断是否有三级路由
      if (!item.hasOwnProperty('children')) return 
      item.component = Midlayer // 如果有三级路由，则二级路由的模版设为 Midlayer
    })
  }
  return router
}
// 处理「业务页面」的路由
const viewRouters = [
  homeRouter,
  aboutRouter,
  adminRouter,
  chartRouter,
  formRouter,
  tableRouter,
].map(item => processRouterWithTemplate(item))

const routes = [
  ...viewRouters,
  // 以下非「业务页面」
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('error-page/404'), hidden: true },
  { path: '*', redirect: '/404', hidden: true },
]

export default routes