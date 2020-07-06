export default {
  id: 33,
  order: 2,
  parent_id: 0,
  path: '/banner',
  name: 'Banner',
  component: undefined,
  meta: {
    title: 'Banner管理',
    icon: 'fa fa-ellipsis-h',
  },
  children: [
    {
      id: 34,
      order: 0,
      parent_id: 33,
      path: '/banner/index',
      component: 'banner/index',
      name: 'BannerIndex',
      meta: { title: 'Banner列表', icon: 'el-icon-house' },
      children: []
    },
  ],
}
