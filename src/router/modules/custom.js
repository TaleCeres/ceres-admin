export default {
  path: '/custom',
  name: 'Custom',
  component: undefined,
  meta: {
    title: '自定义组件',
    icon: 'el-icon-pie-chart',
  },
  children: [
    {
      path: '/custom/tinymce',
      component: 'tinymce/index',
      name: 'Tinymce',
      meta: { title: '富文本', icon: 'el-icon-house' },
    },
  ],
}
