export default {
  id: 13,
  order: 5,
  parent_id: 0,
  path: '/tools',
  name: 'Tools',
  component: undefined,
  meta: {
    title: '系统工具',
    icon: 'el-icon-s-grid',
  },
  children: [
    {
      id: 15,
      order: 0,
      parent_id: 13,
      path: '/tools/build',
      component: 'tools/build/index',
      name: 'FormBuilder',
      meta: { title: '表单构建', icon: 'el-icon-house' },
      children: []
    },
    {
      id: 17,
      order: 1,
      parent_id: 13,
      path: '/tools/error-code',
      component: 'tools/error-code/index',
      name: 'ErrorCode',
      meta: { title: '错误码清单', icon: 'el-icon-house' },
      children: []
    },
    {
      id: 18,
      order: 2,
      parent_id: 13,
      path: '/tools/swagger',
      component: 'tools/swagger/index',
      name: 'Swagger',
      meta: { title: '接口文档', icon: 'el-icon-house' },
      children: []
    },
  ],
}
