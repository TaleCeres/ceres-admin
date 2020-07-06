export default {
  id: 31,
  order: 3,
  parent_id: 0,
  path: '/category',
  name: 'Category',
  component: undefined,
  meta: {
    title: '类别管理',
    icon: 'fa fa-tasks',
  },
  children: [
    {
      id: 32,
      order: 0,
      parent_id: 31,
      path: '/category/list',
      component: 'category/list',
      name: 'CategoryList',
      meta: { title: '类别列表', icon: 'el-icon-house' },
      children: []
    }
  ]
}
