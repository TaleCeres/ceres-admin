export default {
  id: 1,
  order: 0,
  parent_id: 0,
  path: '/main',
  name: 'Main',
  component: undefined,
  meta: {
    title: '首页',
    icon: 'el-icon-menu',
  },
  children: [
    {
      id: 3,
      order: 0,
      parent_id: 1,
      path: '/home',
      name: 'Home',
      component: 'home/index',
      meta: {
        title: '主页面',
        icon: 'el-icon-menu',
        affix: true,
      },
      children: []
    },
    {
      id: 4,
      order: 1,
      parent_id: 1,
      path: '/guide',
      name: 'guide',
      component: 'guide/index',
      meta: {
        title: '规范指南',
        icon: 'el-icon-setting',
      },
      children: []
    },
  ],
}
