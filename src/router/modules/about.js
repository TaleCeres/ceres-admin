const _import = file => () => import(`@/views/${file}.vue`)

export default {
  path: '/about',
  name: 'About',
  redirect: '/about/index',
  component: undefined,
  meta: {
    title: '关于',
    icon: 'fa fa-info-circle',
  },
  children: [
    {
      path: '/about/index',
      component: _import('about/index'),
      name: '关于',
      meta: { title: '团队信息', icon: 'el-icon-house' },
    },
  ],
}
