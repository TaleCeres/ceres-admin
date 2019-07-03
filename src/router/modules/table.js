import Layout from 'comps/layout/blank'
const _import = file => () => import(/* webpackChunkName: "about" */ `@/views/${file}.vue`)

export default {
  path: '/table',
  name: 'Table',
  component: Layout,
  meta: {
    title: 'Table',
    icon: 'el-icon-s-data',
  },
  children: [
    {
      path: '/table/index',
      component: _import('table/index'),
      name: 'IndexTable',
      meta: { title: 'Index Table', icon: 'el-icon-house' },
    },
  ],
}
