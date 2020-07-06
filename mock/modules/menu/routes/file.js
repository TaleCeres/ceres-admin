/**
 * 文件管理页面
 */
export default {
  id: 11,
  order: 7,
  parent_id: 0,
  path: '/file',
  name: 'File',
  redirect: '/file/index',
  component: undefined,
  meta: {
    title: '文件管理',
    icon: 'el-icon-s-grid',
  },
  children: [
    {
      id: 12,
      order: 0,
      parent_id: 11,
      path: '/file/index',
      component: 'file/index',
      name: 'FileIndex',
      meta: { title: '文件管理', icon: 'dashboard', affix: false },
      children: []
    }
  ]
}
