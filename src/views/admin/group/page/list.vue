<template>
  <div class="container">
    <div class="block">
      <el-button type="botton" size="mini" @click="appendToRoot(data)">
        新增根节点
      </el-button>
      <el-tree :data="data" node-key="id" draggable default-expand-all :expand-on-click-node="false">
        <div slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ node.label }} {{data.name}}</span>
          <el-button type="text" size="mini" @click="edit(node, data)">
            编辑
          </el-button>
          <el-button type="text" size="mini" @click="append(data)">
            添加
          </el-button>
          <el-button type="text" size="mini" @click="remove(node, data)">
            删除
          </el-button>
        </div>
      </el-tree>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
let id = 1000

export default {
  name: 'GroupPageList',
  components: {
  },
  data() {
    const data = [{
      id: 1,
      label: '系统管理',
      name: 'Admin',
      path: '/admin',
      components: undefined,
      icon: ['el-icon-user'],
      children: [{
        id: 2,
        label: '用户管理',
        name: 'AdminUser',
        path: '/admin/user',
        component: undefined,
        icon: ['el-icon-house'],
        children: [{
          id: 3,
          label: '用户列表',
          name: 'UserList',
          path: '/admin/user/list',
          component: 'admin/user/list',
          icon: ['el-icon-collection-tag'],
        }]
      }, {
        id: 4,
        label: '权限组管理',
        name: 'AdminGroup',
        path: '/admin/group',
        component: undefined,
        icon: ['fa', 'fa-group'],
        children: [{
          id: 5,
          label: '接口权限',
          name: 'GroupApiList',
          path: '/admin/group/api',
          component: 'admin/group/api/list',
          icon: ['el-icon-collection-tag'],
        }, {
          id: 6,
          label: '页面权限',
          name: 'GroupPageList',
          path: '/admin/group/page',
          component: 'admin/group/page/list',
          icon: ['el-icon-collection-tag'],
        }]
      }]
    }, {
      id: 7,
      label: '类别管理',
      name: 'Category',
      path: '/category',
      component: undefined,
      children: [{
        id: 8,
        label: '类别列表',
        name: 'CategoryList',
        path: '/category/list',
        component: 'category/list',
        icon: ['el-icon-house'],
      }
      ]
    }]
    return {
      data: JSON.parse(JSON.stringify(data))
    }
  },
  methods: {
    appendToRoot(data) {
      id += 1
      const newChild = { id, label: 'test', children: [] }
      data.push(newChild)
    },
    edit(note, data) {
      // 弹出浮层
      // el-tree作为浮动成，而el-table的树形数据与懒加载作为展现成
      // el-tree的拖动影响el-table的展示
      console.log('data', data)
    },
    append(data) {
      id += 1
      const newChild = { id, label: 'test', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove(node, data) {
      const { parent } = node
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.container {
  width 600px
  flex 1
  display flex
  align-items center
  justify-content space-between
  font-size 14px
  padding-right 8px
}
</style>
