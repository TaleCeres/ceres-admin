/* eslint-disable */
/* 页面嵌套的Layout中间层模版 */
/* Router Modules(业务页面的路由) */
import dashboardRouter from './modules/dashboard'
import redirectRouter from './modules/redirect'
import { loadingComponent } from './util'
// lazy-loaded when the route is visited
// const _import = file => () => import(/* webpackChunkName: "about" */ `@/views/${file}.vue`)
const _import = file => () => import(`@/views/${file}.vue`)

/**
 *
 *
 * hidden: true                  if set true, item will not show in the sidebar(default is false)
 *
 * redirect: noRedirect          if set noRedirect will no redirect in the breadcrumb
 * path: 'route'
 * name:'route-name'             the name is used by <keep-alive> (must set)
 * meta : {
    title: 'title'               the name show in sidebar and breadcrumb (recommend set; in Chinese)
    icon: 'svg-name'             the icon show in the sidebar and history-tags
    affix: true                  if set true, the tag will affix in the history-tags alway
  }
  *
  * route是一条路由配置, routes是一堆路由配置，router是路由功能集合
 */

// 「项目自带页面」的路由
const normalViewRouters = [
  redirectRouter,
  dashboardRouter,
].map(item => loadingComponent(item))

/**
 * 可视化页面
*/
const visualViewRouters = [
  // 数据大屏
  { path: '/data-graph/overview', component: _import('data-graph/overview/index'), meta: { title: '全国高等院校分布' }, hidden: true },
  { path: '/data-graph/college-list', component: _import('data-graph/college-list/index'), meta: { title: '高等高校详情介绍' }, hidden: true },
  { path: '/data-graph/college-detail', component: _import('data-graph/college-detail/index'), meta: { title: '高等高校详情介绍' }, hidden: true }
]
/**
 * 默认页面(非「业务页面」)
 */
export const defaultViewRouters = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('error-page/404'), hidden: true },
]
// 404
export const errorViewRouters = [
  { path: '*', redirect: '/404', hidden: true },
]

const routes = [
  ...normalViewRouters,
  ...visualViewRouters,
  ...defaultViewRouters,
]

export default routes
