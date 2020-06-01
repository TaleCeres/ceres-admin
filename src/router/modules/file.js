/**
 * 文件管理页面
 */
export default {
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
      path: '/file/index',
      component: 'file/index',
      name: 'FileIndex',
      meta: { title: '文件管理', icon: 'dashboard', affix: false }
    }
  ]
}
