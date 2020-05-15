<template>
  <div class="container">
    <el-row :gutter="20" style="padding: 20px 0">
      <el-col :span="12">
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
                <i :class="data.icon"></i>
                <span>{{ data.title }}</span>
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

    <el-dialog
      :title="form.id? '编辑菜单': '新建菜单'"
      :visible.sync="dialogVisible"
      width="600px">
      <el-form ref="menuForm" :model="form" label-width="80px">
        <el-form-item label="父级">
          <treeselect
            v-model="form.parent_id"
            :normalizer="normalizer"
            :options="menuOptions"
            :show-count="true"
            placeholder="选择上级菜单"/>
        </el-form-item>
        <el-form-item label="菜单名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="form.path"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-popover
            placement="bottom-start"
            width="460"
            trigger="click"
            @show="$refs['iconSelect'].reset()"
          >
            <IconSelect ref="iconSelect" @selected="selected" />
            <el-input slot="reference" v-model="form.icon" placeholder="点击选择图标" readonly>
              <i
                v-if="form.icon"
                slot="prepend"
                :class="form.icon"
                class="el-input__icon"
                style="height: 32px;width: 16px;"
              />
              <i v-else slot="prepend" class="el-icon-search el-input__icon" />
            </el-input>
          </el-popover>
        </el-form-item>
        <el-form-item label="组件路径">
          <el-input v-model="form.component"></el-input>
        </el-form-item>
        <el-form-item label="菜单状态">
          <el-radio-group v-model="form.hidden">
            <el-radio :label="true">隐藏</el-radio>
            <el-radio :label="false">显示</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import RouteModel from '@/models/route'
import UserModel from '@/models/user'
import IconSelect from '@/components/base/IconSelect'


let id = 1000

export default {
  name: 'GroupMenuList',
  components: {
    Treeselect,
    IconSelect,
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
        title: ''
      },
      dragFlag: false,
      dialogVisible: false
    }
  },
  computed: {
  },
  async created() {
    await UserModel.getToken('Boss', '123456')
  },
  mounted() {
    this.getRouteTree()
  },
  methods: {
    // 选择图标
    selected(name) {
      this.form.icon = `fa ${name}`
    },
    async getRouteTree() {
      try {
        const res = await RouteModel.getRouteTree()
        this.routeTree = [...res]
        this.getTreeSelect()
        this.dragFlag = false
      } catch (e) {
        console.log(e)
      }
    },

    // 树形选择器结构
    async getTreeSelect() {
      this.menuOptions = []
      const res = await RouteModel.getRouteTree()
      const menu = { id: 0, title: '主类目', children: [] }
      menu.children = [...res]
      this.menuOptions.push(menu)
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.id,
        label: node.title,
        children: node.children
      }
    },

    // 编辑菜单
    edit(note, data) {
      // 弹出浮层
      // el-tree作为浮动成，而el-table的树形数据与懒加载作为展现成
      // el-tree的拖动影响el-table的展示
      this.dialogVisible = true
      this.form = data
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
    async createRoute() {
      await RouteModel.createRoute(this.form)
      this.$message.success('新增菜单成功')
      this.resetForm()
      this.getRouteTree()
      this.dialogVisible = false
    },
    // 重置新增表单
    resetForm() {
      this.form = {
        component: undefined,
        hidden: false,
        icon: '',
        name: '',
        parent_id: 0,
        title: ''
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

    onSubmit() {
      if (this.form.id) {
        this.editRoute()
      } else {
        this.createRoute()
      }
    },

    // 保存编辑后的路由
    async editRoute() {
      try {
        await RouteModel.editRoute(this.form.id, this.form)
        this.$message.success('菜单编辑成功')
        this.getRouteTree()
        this.dialogVisible = false
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
