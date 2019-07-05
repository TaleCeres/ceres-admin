import Layout from 'comps/layout/default/index'
const _import = file => () => import(/* webpackChunkName: "about" */ `@/views/${file}.vue`)

export default {
  path: '/form',
  name: 'Form',
  component: Layout,
  meta: {
    title: 'Form',
    icon: 'el-icon-s-data',
  },
  children: [
    {
      path: '/form/index',
      component: _import('form/index'),
      name: 'IndexForm',
      meta: { title: 'Index Form', icon: 'el-icon-house' },
    },
  ],
}
