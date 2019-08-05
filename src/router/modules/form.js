import Layout from 'comps/layout/default'
const _import = file => () => import(`@/views/${file}.vue`)

export default {
  path: '/form',
  name: 'Form',
  component: Layout,
  meta: {
    title: '表单',
    icon: 'el-icon-tickets',
  },
  children: [
    {
      path: '/form/index',
      component: _import('form/index'),
      name: '表单首页',
      meta: { title: 'Index Form', icon: 'el-icon-house' },
    },
  ],
}
