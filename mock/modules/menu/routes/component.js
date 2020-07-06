export default {
  id: 16,
  order: 6,
  parent_id: 0,
  path: '/component',
  name: 'ComponentLib',
  component: undefined,
  meta: {
    title: '组件管理',
    icon: 'fa fa-cogs',
  },
  children: [
    {
      id: 14,
      order: 0,
      parent_id: 16,
      path: '/components/json-view',
      component: 'components/json-view',
      name: 'JsonView',
      meta: { title: 'Json格式化', icon: 'el-icon-house' },
      children: []
    },
    {
      id: 29,
      order: 1,
      parent_id: 16,
      path: '/component/tinymce',
      component: 'component/tinymce/index',
      name: 'Tinymce',
      meta: { title: '富文本', icon: 'el-icon-house' },
      children: []
    },
  ],
}
