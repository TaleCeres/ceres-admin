export default {
  path: '/tools',
  name: 'Tools',
  component: undefined,
  meta: {
    title: '系统工具',
    icon: 'el-icon-s-grid',
  },
  children: [
    {
      path: '/tools/swagger',
      component: 'tools/swagger/index',
      name: 'Swagger',
      meta: { title: '接口文档', icon: 'el-icon-house' },
    },
    {
      path: '/tools/error-code',
      component: 'tools/error-code/index',
      name: 'ErrorCode',
      meta: { title: '错误码清单', icon: 'el-icon-house' },
    },
  ],
}
