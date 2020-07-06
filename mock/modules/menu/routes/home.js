export default {
  path: '/main',
  name: 'Main',
  id: 1,
  order: 0,
  parent_id: 0,
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
      id: 3,
      order: 0,
      parent_id: 1,
      meta: {
        title: '主页面',
        icon: 'el-icon-menu',
        affix: true,
      },
      children: []
    },
    {
      path: '/guide',
      name: 'guide',
      component: 'guide/index',
      id: 4,
      order: 1,
      parent_id: 1,
      meta: {
        title: '规范指南',
        icon: 'el-icon-setting',
      },
      children: []
    },
  ],
}
