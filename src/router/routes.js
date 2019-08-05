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

/* 处理router的函数 */


const routes = [
  homeRouter,
  aboutRouter,
  adminRouter,
  chartRouter,
  formRouter,
  tableRouter,
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('error-page/404'), hidden: true },
  { path: '*', redirect: '/404', hidden: true },
]

export default routes
