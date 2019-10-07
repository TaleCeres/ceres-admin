/* Layout */
const _import = file => () => import(`@/views/${file}.vue`)

export default {
  path: '/',
  redirect: '/home',
  name: '首页',
  component: undefined,
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
        title: '主页面',
        icon: 'el-icon-menu',
      },
    },
    {
      path: '/guide',
      name: 'guide',
      component: _import('guide/index'),
      meta: {
        title: '规范指南',
        icon: 'el-icon-setting',
      },
    },
  ],
}
