<template>
  <div class="container">
    <el-row :gutter="20" style="padding: 20px 0">
      <el-col :span="16">
        <el-card>
          <div slot="header">
            <el-button size="medium" type="primary" @click="updateRouteTree">保存</el-button>
            <el-button size="medium" @click="getRouteTree">刷新</el-button>
            <el-button size="medium" style="float: right" :disabled="dragFlag" @click="dialogVisible = true">新增菜单</el-button>
          </div>
          <div class="block">
            <el-alert
              v-show="dragFlag"
              title="菜单拖拽后请先保存或刷新再进行其他操作"
              :closable="false"
              type="info">
            </el-alert>
            <el-tree
              :data="routeTree"
              node-key="id"
              draggable
              default-expand-all
              :expand-on-click-node="false"
              @node-drop="handleDrop">
              <div slot-scope="{ node, data }" class="custom-tree-node">
                <i :class="data.meta.icon"></i>
                <span>{{ data.meta.title }}</span>
                <router-link class="path" :to="data.path.toString()">{{data.path}}</router-link>
                <div class="btn">
                  <el-button type="text" size="mini" :disabled="dragFlag" @click="edit(node, data)">
                    编辑
                  </el-button>
                  <el-button type="text" size="mini" :disabled="dragFlag" @click="remove(node, data)">
                    删除
                  </el-button>
                </div>
              </div>
            </el-tree>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <MenuForm
      :dialog-visible="dialogVisible"
      :form="form"
      :menu-options="menuOptions"
      @closeDialog="closeDialog" @handleSubmit="onSubmit"></MenuForm>

  </div>
</template>

<script type="text/ecmascript-6">
import RouteModel from '@/models/route'
import MenuForm from './MenuForm'

export default {
  name: 'AdminMenu',
  components: {
    MenuForm
  },
  data() {
    return {
      routeTree: [],
      menuOptions: [],
      form: {
        component: undefined,
        hidden: false,
        icon: '',
        name: '',
        parent_id: 0,
        title: '',
        path: ''
      },
      dragFlag: false,
      dialogVisible: false
    }
  },
  computed: {
  },
  created() { },
  mounted() {
    this.getRouteTree()
  },
  methods: {
    // 树形选择器结构
    async getTreeSelect() {
      let options = []
      const res = (await RouteModel.getRouteTree()) || []
      const menu = { id: 0, meta: { title: '主类目' }, children: [] }
      menu.children = [...res]
      options.push(menu)
      this.menuOptions = options
    },
    async getRouteTree() {
      try {
        const res = (await RouteModel.getRouteTree()) || []
        this.routeTree = [...res]
        this.dragFlag = false
        this.getTreeSelect()
      } catch (e) {
        console.log(e)
      }
    },

    // 编辑菜单
    edit(note, data) {
      // 弹出浮层
      // el-tree作为浮动成，而el-table的树形数据与懒加载作为展现成
      // el-tree的拖动影响el-table的展示
      this.dialogVisible = true
      this.form = {
        component: data.component,
        hidden: data.hidden,
        icon: data.meta.icon,
        name: data.name,
        parent_id: data.parent_id,
        title: data.meta.title,
        path: data.path,
        id: data.id,
        order: data.order,
        children: data.children
      }
    },

    // 删除菜单
    remove(node, data) {
      this.$confirm('此操作将永久删除该菜单及其子菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await RouteModel.deleteRoute(data.id)
          this.$message.success('删除菜单成功！')
          this.getRouteTree()
        } catch (e) {
          console.log(e)
        }
      })
    },
    // 新增路由
    async createRoute(menu) {
      try {
        await RouteModel.createRoute(menu)
        this.$message.success('新增菜单成功')
        this.resetForm()
        this.getRouteTree()
        this.dialogVisible = false
      } catch (e) {
        console.log(e)
        this.$message.error(`新增菜单失败：${e.message}`)
      }
    },
    // 重置新增表单
    resetForm() {
      this.form = {
        component: undefined,
        hidden: false,
        icon: '',
        name: '',
        parent_id: 0,
        title: '',
        path: ''
      }
    },

    // 拖拽完成时触发事件
    handleDrop(draggingNode, dropNode, dropType, ev) {
      this.dragFlag = true
    },

    closeDialog() {
      this.dialogVisible = false
      this.resetForm()
    },
    // 拖动后保存路由
    async updateRouteTree() {
      try {
        await RouteModel.updateRoute(this.routeTree)
        this.$message.success('菜单保存成功')
        this.getRouteTree()
      } catch (e) {
        this.$message.error('菜单保存失败！')
      }
    },

    onSubmit(menu) {
      if (menu.id) {
        this.editRoute(menu)
      } else {
        this.createRoute(menu)
      }
    },

    // 保存编辑后的路由
    async editRoute(menu) {
      try {
        await RouteModel.editRoute(menu.id, menu)
        this.$message.success('菜单编辑成功')
        this.getRouteTree()
        this.dialogVisible = false
        this.resetForm()
      } catch (e) {
        this.$message.error('菜单编辑失败！')
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .container {
    min-width 900px
    .block {
      .custom-tree-node {
        width 100%
        line-height 44px
        span {
          margin-left 10px
        }
        .path {
          color #1890ff
          margin-left 10px
        }
        .btn {
          float right !important
        }
      }
    }
  }
</style>
<style lang="stylus" rel="stylesheet/stylus">
  .block {
    .el-tree-node__content {
      padding: 8px 10px
      margin: 1px 0
      border: 1px solid #ddd
    }
  }
</style>
