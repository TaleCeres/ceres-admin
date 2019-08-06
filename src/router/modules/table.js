const _import = file => () => import(`@/views/${file}.vue`)

export default {
  path: '/table',
  name: 'Table',
  component: undefined,
  meta: {
    title: '表格',
    icon: 'el-icon-s-grid',
  },
  children: [
    {
      path: '/table/index',
      component: _import('table/index'),
      name: 'IndexTable',
      meta: { title: '表格首页', icon: 'el-icon-house' },
    },
  ],
}
