/* template at different level
* Layout有三种选择 default、t-type、vertical
*/
// import Layout from 'comps/layout/default'
import Layout from 'comps/layout/t-type'
// import Layout from 'comps/layout/vertical'
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
      // if (item.children.length === 1) return 
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


/**
 * 
 * 
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 *
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
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

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    redirect: '/dashboard/index',
    component: Layout,
    meta: {
      title: '纵览',
      icon: 'el-icon-s-grid',
    },
    hidden: true,
    children: [
      {
        path: '/dashboard/index',
        component: _import('dashboard/index'),
        name: 'DashboardIndex',
        meta: { title: '一览', icon: 'dashboard', affix: true }
      }
    ]
  },
  ...viewRouters,
  // 数据大屏页面
  { path: '/data-graph/overview', component: _import('data-graph/overview/index'), meta: { title: '全国高等院校分布' }, hidden: true },
  { path: '/data-graph/college-list', component: _import('data-graph/college-list/index'), meta: { title: '高等高校详情介绍' }, hidden: true },
  { path: '/data-graph/college-detail', component: _import('data-graph/college-detail/index'), meta: { title: '高等高校详情介绍' }, hidden: true },
  // 以下非「业务页面」
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('error-page/404'), hidden: true },
  { path: '*', redirect: '/404', hidden: true },
]

export default routes
