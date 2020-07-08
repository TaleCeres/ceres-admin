export default {
  id: 7,
  order: 4,
  parent_id: 0,
  path: '/admin',
  name: 'Admin',
  component: undefined,
  meta: {
    title: '系统管理',
    icon: 'el-icon-user',
  },
  children: [
    {
      id: 8,
      order: 0,
      parent_id: 7,
      path: '/admin/user',
      component: 'admin/user/index',
      name: 'AdminUser',
      meta: {
        title: '用户管理',
        icon: 'el-icon-house',
      },
      children: []
    },
    {
      id: 9,
      order: 1,
      parent_id: 7,
      path: '/admin/auth',
      component: 'admin/auth/index',
      name: 'AdminApi',
      meta: {
        title: '权限管理',
        icon: 'fa fa-group',
      },
      children: []
    },
    {
      id: 10,
      order: 2,
      parent_id: 7,
      path: '/admin/menu',
      component: 'admin/menu/index',
      name: 'AdminMenu',
      meta: {
        title: '菜单管理',
        icon: 'fa fa-group',
      },
      children: []
    },
    {
      id: 23,
      order: 3,
      parent_id: 7,
      path: '/admin/dict',
      component: 'admin/dict/index',
      name: 'AdminDict',
      meta: {
        title: '字典管理',
        icon: 'fa fa-group',
      },
      children: []
    },
    {
      id: 24,
      order: 4,
      parent_id: 7,
      path: '/admin/dict/data/:id',
      component: 'admin/dict/dict-data',
      name: 'AdminDictData',
      meta: {
        title: '字典数据',
        icon: 'fa fa-group',
      },
      hidden: true,
      children: []
    },
    {
      id: 30,
      order: 5,
      parent_id: 7,
      path: '/admin/config',
      component: 'admin/config/index',
      name: 'AdminConfig',
      meta: {
        title: '参数管理',
        icon: 'fa fa-group',
      },
      children: []
    },
    {
      id: 28,
      order: 6,
      parent_id: 7,
      path: '/admin/notice',
      component: 'admin/notice/index',
      name: 'AdminNotice',
      meta: {
        title: '通知管理',
        icon: 'fa fa-group',
      },
      children: []
    },
    {
      id: 25,
      order: 7,
      parent_id: 7,
      path: '/admin/log',
      component: null,
      name: 'AdminLog',
      meta: {
        title: '日志管理',
        icon: 'fa fa-group',
      },
      children: [
        {
          id: 27,
          order: 0,
          parent_id: 25,
          path: '/admin/log/oper-log',
          component: 'admin/log/oper-log',
          name: 'OperLog',
          meta: {
            title: '操作日志',
            icon: 'fa fa-group',
          },
          children: []
        },
        {
          id: 26,
          order: 1,
          parent_id: 25,
          path: '/admin/log/login-log',
          component: 'admin/log/login-log',
          name: 'LoginLog',
          meta: {
            title: '登录日志',
            icon: 'fa fa-group',
          },
          children: []
        },
      ]
    },
  ],
}
