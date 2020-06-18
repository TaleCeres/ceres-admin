export default {
  path: '/table',
  name: 'Table',
  redirect: '/table/index',
  component: undefined,
  meta: {
    title: '表格',
    icon: 'el-icon-s-grid',
  },
  children: [
    {
      path: '/table/index',
      component: 'table/index',
      name: 'IndexTable',
      meta: { title: '表格', icon: 'el-icon-house' },
    },
  ],
}
