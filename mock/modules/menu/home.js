export default {
  path: '/main',
  name: 'Main',
  component: undefined,
  meta: {
    title: '首页',
    icon: 'el-icon-menu',
  },
  children: [
    {
      path: '/home',
      name: 'Home',
      component: 'home/index',
      meta: {
        title: '主页面',
        icon: 'el-icon-menu',
        affix: true,
      },
    },
    {
      path: '/guide',
      name: 'guide',
      component: 'guide/index',
      meta: {
        title: '规范指南',
        icon: 'el-icon-setting',
      },
    },
  ],
}
