/* template at different level 
* Layout有三种选择 default、t-type
*/
import Layout from 'comps/layout/default'
// import Layout from 'comps/layout/t-type'
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
/**
 * 处理router对应的组件(component)，包含三个级别的路由
 * 一级路由的模版目前有三种: 
 *  1. 左右布局(Layout), 默认
 *  2. T型布局
 *  3. 上下布局
 * 如果三级路由存在，则其父级(二级)路由为 Midlayer；否则为具体的页面组件
 *
 * @param {object} rawRouter
 * @returns
 */
function processRouterWithTemplate(rawRouter) {
  let { ...router } = rawRouter
  router.component = Layout // 一级路由的模版为 Layout
  if (router.hasOwnProperty('children')) {
    let { children: childrenRouter } = router
    childrenRouter.forEach(item => {
      // 判断是否有三级路由
      if (!item.hasOwnProperty('children')) return
      item.component = Midlayer
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
  // 数据大屏页面
  { path: '/data-graph/overview', component: _import('data-graph/overview'), hidden: true },
  // 以下非「业务页面」
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('error-page/404'), hidden: true },
  { path: '*', redirect: '/404', hidden: true },
]

export default routes
