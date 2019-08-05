import Layout from 'comps/layout/default'
import Midlayer from 'comps/layout/midlayer'
const _import = file => () => import(`@/views/${file}.vue`)

export default {
  path: '/admin',
  name: 'Admin',
  component: Layout,
  meta: {
    title: '权限管理',
    icon: 'el-icon-user',
    type: 'folder',
  },
  children: [
    {
      path: '/admin/user',
      component: Midlayer,
      name: 'AdminUser',
      meta: {
        title: '用户管理',
        icon: 'el-icon-house',
        type: 'folder',
      },
      children: [
        {
          path: '/admin/user/list',
          component: _import('admin/user/user-list'),
          name: 'UserList',
          meta: {
            title: '用户列表',
            icon: 'el-icon-collection-tag',
            type: 'view',
          },
        },
      ],
    },
    {
      path: '/admin/group',
      component: Midlayer,
      name: 'AdminGroup',
      meta: {
        title: '分组管理',
        icon: 'fa fa-group',
        type: 'folder',
      },
      children: [
        {
          path: '/admin/group/list',
          component: _import('admin/user/group-list'),
          name: 'GroupList',
          meta: {
            title: '分组列表',
            icon: 'el-icon-collection-tag',
            type: 'view',
          },
        },
      ],
    },
  ],
}
