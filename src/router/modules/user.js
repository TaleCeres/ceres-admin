export default {
  path: '/user',
  name: 'User',
  redirect: '/user/index',
  component: undefined,
  meta: {
    title: '用户信息',
    icon: 'fa fa-info-circle',
  },
  children: [
    {
      path: '/user/index',
      component: 'user-info/index',
      name: '用户信息',
      meta: { title: '用户信息', icon: 'el-icon-house' },
      // hidden: true
    },
  ],
}
