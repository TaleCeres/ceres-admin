/* Layout */
import Layout from 'comps/layout/default/index'
/* Router Modules */
import chartRouter from './modules/chart'
import formRouter from './modules/form'
import tableRouter from './modules/table'
// lazy-loaded when the route is visited
const _import = file => () => import(/* webpackChunkName: "about" */ `@/views/${file}.vue`)


const routes = [
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
        name: 'Home', // 配套中英文切换
        component: _import('home/index'),
        meta: {
          title: 'Home',
          icon: 'el-icon-menu',
        },
      },
      {
        path: '/about',
        name: 'About',
        component: _import('about/index'),
        meta: {
          title: 'About',
          icon: 'el-icon-document',
        },
      },
      {
        path: '/guide',
        name: 'Guide',
        component: _import('guide/index'),
        meta: {
          title: 'Guide',
          icon: 'el-icon-setting',
        },
      },
    ],
  },
  chartRouter,
  formRouter,
  tableRouter,
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('error-page/404'), hidden: true },
  { path: '*', redirect: '/404', hidden: true },
]

export default routes
