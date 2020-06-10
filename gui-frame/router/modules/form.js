export default {
  path: '/form',
  name: 'Form',
  redirect: '/form/index',
  component: undefined,
  meta: {
    title: '表单',
    icon: 'el-icon-tickets',
  },
  children: [
    {
      path: '/form/index',
      component: 'form/index',
      name: 'formIndex',
      meta: { title: '表单', icon: 'el-icon-house' },
    },
  ],
}
