<template>
  <el-dialog
    :title="form.id ? '编辑菜单': '新建菜单'"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    :before-close="closeDialog"
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
      <el-form-item label="路由路径">
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
</template>

<script>
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import RouteModel from '@/models/route'
import IconSelect from '@/components/base/IconSelect'
export default {
  name: 'MenuForm',
  components: {
    Treeselect,
    IconSelect
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: () => ({
        component: undefined,
        hidden: false,
        icon: '',
        name: '',
        parent_id: 0,
        title: '',
        path: ''
      })
    },
    menuOptions: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
    console.log(this.menuOptions)
  },
  methods: {
    // 选择图标
    selected(name) {
      this.form.icon = `fa ${name}`
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.id,
        label: node.meta.title,
        children: node.children
      }
    },

    // 树形选择器结构
    async getTreeSelect() {
      this.menuOptions = []
      const res = (await RouteModel.getRouteTree()) || []
      const menu = { id: 0, meta: { title: '主类目' }, children: [] }
      menu.children = [...res]
      this.menuOptions.push(menu)
    },

    closeDialog() {
      this.$emit('closeDialog')
    },

    onSubmit() {
      this.$emit('handleSubmit', this.form)
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
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
