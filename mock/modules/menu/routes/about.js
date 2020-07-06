export default {
  path: '/about',
  name: 'About',
  redirect: '/about/index',
  component: undefined,
  id: 5,
  order: 1,
  parent_id: 0,
  meta: {
    title: '关于',
    icon: 'fa fa-info-circle',
  },
  children: [
    {
      id: 6,
      order: 0,
      parent_id: 5,
      path: '/about/index',
      component: 'about/index',
      name: '关于',
      meta: { title: '团队信息', icon: 'el-icon-house' },
      children: []
    },
  ],
}
