import Layout from 'comps/layout/default'
const _import = file => () => import(`@/views/${file}.vue`)

export default {
  path: '/about',
  name: 'About',
  component: Layout,
  meta: {
    title: '关于',
    icon: 'fa fa-info-circle',
  },
  children: [
    {
      path: '/about/line',
      component: _import('about/index'),
      name: 'AboutIndex',
      meta: { title: '团队信息', icon: 'el-icon-house' },
    },
  ],
}
