/* eslint-disable */
import appStore from '@/store/modules/app'
/* 页面嵌套的Layout中间层模版 */
import Midlayer from 'comps/layout/midlayer'
/* Router Modules(业务页面的路由) */
import dashboardRouter from './modules/dashboard'
import homeRouter from './modules/home'
import adminRouter from './modules/admin'
import categoryRouter from './modules/category'
import aboutRouter from './modules/about'
import chartRouter from './modules/chart'
import formRouter from './modules/form'
import tableRouter from './modules/table'
import userRouter from './modules/user'
import redirectRouter from './modules/redirect'
// lazy-loaded when the route is visited
// const _import = file => () => import(/* webpackChunkName: "about" */ `@/views/${file}.vue`)
const _import = file => () => import(`@/views/${file}.vue`)

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

// 处理「业务页面」的路由
const normalViewRouters = [
  redirectRouter,
  dashboardRouter,
  homeRouter,
  aboutRouter,
  adminRouter,
  categoryRouter,
  chartRouter,
  formRouter,
  tableRouter,
  userRouter
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
const defaultViewRouters = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('error-page/404'), hidden: true },
  { path: '*', redirect: '/404', hidden: true },
]

const routes = [
  ...normalViewRouters,
  ...visualViewRouters,
  ...defaultViewRouters,
]

export default routes

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
function loadingComponent(rawRouter) {
  let { ...router } = rawRouter
  initLayout(router) // 一级路由的模版为 Layout
  // 遍历一级路由的子路由
  if (router.hasOwnProperty('children')) {
    router.children.forEach(item => {
      initComponent(item)
    })
  }
  return router
}

/**
 * Layout有三种选择 default、t-type、vertical
 * @param {object} router
 */
function initLayout(router) {
  const _import_layout = file => () => import(`comps/layout/${file}/index.vue`)
  const layoutModeObj = {
    'default': _import_layout('default'),
    'vertical': _import_layout('vertical'),
    't-type': _import_layout('t-type'),
  }
  router.component = layoutModeObj[appStore.state.layout.mode]
}

/**
 * 二级路由开始
 *  - 1. 如果有子路由，载入「Midlayer」
 *  - 2. 如果无子路由，载入「router.component同名的组件」
 * @param {object} router
 */
function initComponent(router) {
  // 1
  if (router.hasOwnProperty('children')) {
    router.component = Midlayer
    let { children: childrenRouter } = router
    childrenRouter.forEach(item => {
      initComponent(item)
    })
    return
  }
  // 2
  if (typeof (router.component) === 'string') {
    router.component = _import(router.component)
  }
}
