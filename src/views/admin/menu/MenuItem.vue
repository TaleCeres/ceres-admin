<template>
  <div class="item-group">
    <div  class="item">
      <i v-if="hasChildren"
         :class="expanded? 'el-icon-caret-bottom' : 'el-icon-caret-right'"
         class="expand"
         @click="expanded = !expanded"></i>
      <slot v-bind="{data: value}"></slot>
    </div>
    <el-collapse-transition>
      <draggable v-if="expanded" class="item-container"
                 tag="div"
                 :value="value.children"
                 v-bind="dragOptions"
                 @input="updateValue">
        <menu-item v-for="child in value.children"
                   :key="child.id"
                   :value="child"
                   :drag-flag="dragFlag"
                   class="item-sub"
                   @input="updateChildValue" >
          <template v-slot="{ data }">
            <slot v-bind="{ data }"> </slot>
          </template>
        </menu-item>
      </draggable>
    </el-collapse-transition>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import RouteModel from '@/models/route'
export default {
  name: 'menu-item',
  components: {
    draggable
  },
  props: {
    value: {
      type: Object,
    },
    dragFlag: {
      type: Boolean
    }
  },
  data() {
    return {
      expanded: true,
      localValue: { ...this.value }
    }
  },
  computed: {
    hasChildren() {
      return this.value.children != null && this.value.children.length > 0
    },
    dragOptions() {
      return {
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    },
  },
  watch: {
    value(value) {
      this.localValue = { ...value }
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    updateValue(value) {
      this.localValue.children = [...value]
      this.$emit('input', this.localValue)
    },
    updateChildValue(value) {
      const index = this.localValue.children.findIndex(
        c => c.id === value.id
      )
      this.$set(this.localValue.children, index, value)
      this.$emit('input', this.localValue)
    },
    // 编辑菜单
    edit(data) {
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
    remove(data) {
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
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .item-container {
    margin: 0;
  }
  .item {
    cursor move
    display flex
    border: solid #ddd 1px;
    background-color: #fefefe;
    margin-bottom 2px
    align-items center
    padding 0 1rem
    color #606266
  }
  .item:hover {
    background-color #F2F6FC
  }
  .item-sub {
    margin: 0 0 0 30px;
  }
  .expand {
    cursor pointer
    padding-right 6px
  }
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
</style>
