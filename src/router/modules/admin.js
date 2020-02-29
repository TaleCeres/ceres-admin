export default {
  path: '/admin',
  name: 'Admin',
  component: undefined,
  meta: {
    title: '权限管理',
    icon: 'el-icon-user',
  },
  children: [
    {
      path: '/admin/user',
      component: undefined,
      name: 'AdminUser',
      meta: {
        title: '用户管理',
        icon: 'el-icon-house',
      },
      children: [
        {
          path: '/admin/user/list',
          component: 'admin/user/list',
          name: 'UserList',
          meta: {
            title: '用户列表',
            icon: 'el-icon-collection-tag',
          },
        },
      ],
    },
    {
      path: '/admin/group',
      component: undefined,
      name: 'AdminGroup',
      meta: {
        title: '分组管理',
        icon: 'fa fa-group',
      },
      children: [
        {
          path: '/admin/group/list',
          component: 'admin/group/list',
          name: 'GroupList',
          meta: {
            title: '分组列表',
            icon: 'el-icon-collection-tag',
          },
        },
      ],
    },
  ],
  
}
