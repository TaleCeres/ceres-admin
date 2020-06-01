export default {
  path: '/category',
  name: 'Category',
  component: undefined,
  meta: {
    title: '类别管理',
    icon: 'fa fa-tasks',
  },
  children: [
    {
      path: '/category/list',
      component: 'category/list',
      name: 'CategoryList',
      meta: { title: '类别列表', icon: 'el-icon-house' }
    }
  ]
}
