<template>
  <el-button-group class="crud-opts-right">
    <el-button size="mini" plain type="info" icon="el-icon-search" @click="toggleSearch()" />
    <el-button size="mini" icon="el-icon-refresh" @click="refresh()" />

    <el-popover placement="bottom-end" width="150" trigger="click">
      <el-button slot="reference" size="mini" icon="el-icon-s-grid">
        <i class="fa fa-caret-down" aria-hidden="true" />
      </el-button>
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
        全选
      </el-checkbox>
      <el-checkbox-group v-model="checkedProps" @change="handleCheckedColumnsChange">
        <el-checkbox v-for="item in tableColumn" :key="item.prop"
          v-model="item.visible" :label="item.prop" @change="handleColumnChange(item)">
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
    </el-popover>

  </el-button-group>
</template>

<script type="text/ecmascript-6">
import { get } from '../../../utils/request'
export default {
  name: 'CRUD.Operation',
  components: {},
  props: {
    tableColumn: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkAll: true,
      isIndeterminate: false,
    }
  },
  computed: {
    checkedProps: {
      get() {
        const _checkedProps = []
        this.tableColumn.forEach(item => {
          if (item.visible) {
            _checkedProps.push(item.prop)
          }
        })
        return _checkedProps
      },
      set(val) {
        // 
      }
    }
  },
  created() { },
  mounted() { },
  methods: {
    // 判断是否全确定or全取消
    handleCheckedColumnsChange(val) {
      let checkedCount = val.length
      this.checkAll = checkedCount === this.tableColumn.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.tableColumn.length
    },
    handleColumnChange(item) {
      this.$emit('handleColumnChange', item)
    },
    handleCheckAllChange(val) {
      this.$emit('handleCheckAllChange', val)
    },
    refresh() {
      this.$emit('refresh')
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.crud-opts-container {
  margin-left auto
}
</style>
