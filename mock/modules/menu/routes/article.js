export default {
  id: 19,
  order: 8,
  parent_id: 0,
  path: '/article',
  name: 'Article',
  component: undefined,
  meta: {
    title: '文章管理',
    icon: 'fa fa-file-text-o',
  },
  children: [
    {
      id: 20,
      order: 0,
      parent_id: 19,
      path: '/article/add',
      component: 'article/add',
      name: 'ArticleAdd',
      meta: { title: '新增文章', icon: 'el-icon-house' },
      children: []
    },
    {
      id: 21,
      order: 1,
      parent_id: 19,
      path: '/article/list',
      component: 'article/index',
      name: 'ArticleList',
      meta: { title: '文章列表', icon: 'el-icon-house' },
      children: []
    },
    {
      id: 22,
      order: 2,
      parent_id: 19,
      path: '/article/edit/:id',
      component: 'article/edit',
      name: 'ArticleEdit',
      meta: { title: '编辑文章', icon: 'el-icon-house' },
      children: []
    },
  ],
}
