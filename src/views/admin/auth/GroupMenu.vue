<template>
  <div>
    <tree-transfer
      pid="parent_id"
      :default-checked-keys="defaultCheckedKeys"
      :default-transfer="true"
      :title="title"
      :from_data='fromData'
      :to_data='toData'
      :default-props="{label:'title'}"
      mode='transfer' height='540px'
      filter
      open-all
      @addBtn='add'
      @removeBtn='remove'>
    </tree-transfer>
    <div style="margin-top: 20px">
      <el-button type="primary" @click="updateMenu()">保 存</el-button>
      <el-button @click="resetMenu('form')">重 置</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import treeTransfer from 'el-tree-transfer'
import RouteModel from '@/models/route'
import * as _ from 'lodash'
export default {
  name: 'GroupMenu',
  components: {
    treeTransfer
  },
  props: {
    groupId: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      title: ['未分配路由', '已分配路由'],
      fromData: [],
      toData: [],
      routeTree: [],
      cacheTree: [],
      addRoutes: [],
      deleteRoutes: [],
      defaultCheckedKeys: []
    }
  },
  async mounted() {
    await this.getRouteTree()
    await this.getMenuById()
  },
  methods: {
    // 获取所有路由
    async getRouteTree() {
      try {
        const data = await RouteModel.getRouteTree()
        this.routeTree = [...data]
        this.getTreeId(this.routeTree)
        this.cacheTree = [...data]
      } catch (e) {
        console.log(e)
      }
    },
    getTreeId(tree) {
      tree.forEach(item => {
        item.title = item.meta.title
        if (item.children && item.children.length > 0) {
          this.getTreeId(item.children)
        }
      })
    },

    // 根据用户组ID, 获取菜单
    async getMenuById() {
      const res = (await RouteModel.getMenu(this.groupId)) || []
      this.toData = [...res]
      this.getTreeId(this.toData)
      this.getFromData()
    },

    // 获取未分配菜单
    getFromData() {
      this.fromData = JSON.parse(JSON.stringify(this.routeTree))
      const recursiveMenu = this.recursive(this.toData)
      this.defaultCheckedKeys = recursiveMenu.map(item => item.id)
      // this.fromData = this.filter(this.fromData, recursiveMenu)
    },

    filter(arr, recursiveMenu) {
      for (let i = 0; i < arr.length; i += 1) {
        let el = arr[i]
        if (recursiveMenu.findIndex(item => item.id === el.id) !== -1) {
          arr.splice(i, 1)
          i -= 1
        } else if (el.children && el.children.length) {
          this.filter(el.children, recursiveMenu)
        }
      }
      return arr
    },

    recursive(data) {
      let arr = []
      const getArr = list => {
        list.forEach(row => {
          if (row.children && row.children.length > 0) {
            getArr(row.children)
          } else {
            arr.push(row)
          }
        })
      }
      getArr(data)
      return arr
    },

    // 监听穿梭框组件添加
    add(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      this.fromData = fromData
      this.toData = toData
    },
    // 监听穿梭框组件移除
    remove(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      // console.log('fromData:', fromData)
      // console.log('toData:', toData)
      this.fromData = fromData
      this.toData = toData
    },

    async updateMenu() {
      try {
        await RouteModel.updateMenuById(this.groupId, this.toData)
        this.$message.success('菜单配置成功！')
        this.resetMenu()
      } catch (e) {
        this.$message.error('菜单配置失败！')
      }
    },
    resetMenu() {
      // this.fromData = [...this.routeTree]
      // this.toData = []
      this.getRouteTree()
      this.getMenuById()
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>
