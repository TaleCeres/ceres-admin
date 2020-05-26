export default {
  path: '/admin',
  name: 'Admin',
  component: undefined,
  meta: {
    title: '系统管理',
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
      path: '/admin/api',
      component: undefined,
      name: 'AdminApi',
      meta: {
        title: '权限管理',
        icon: 'fa fa-group',
      },
      children: [
        {
          path: '/admin/api/list',
          component: 'admin/api/list',
          name: 'AdminApiList',
          meta: {
            title: '接口列表',
            icon: 'el-icon-collection-tag',
          },
        },
      ],
    },
    {
      path: '/admin/menu',
      component: undefined,
      name: 'AdminMenu',
      meta: {
        title: '菜单管理',
        icon: 'fa fa-group',
      },
      children: [
        {
          path: '/admin/menu/list',
          component: 'admin/menu/list',
          name: 'AdminMenuList',
          meta: {
            title: '菜单列表',
            icon: 'el-icon-collection-tag',
          },
        },
      ],
    },
  ],
}
