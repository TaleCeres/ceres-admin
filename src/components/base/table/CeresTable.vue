<template>
  <div class="ceres-table">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column v-for="item in tableColumn" :key="item.prop" :prop="item.prop" :label="item.label" />
      <el-table-column v-if="operate.length > 0" fixed="right" label="操作" min-width="160">
        <template slot-scope="scope">
          <el-button v-for="item in operate" :key="item.func" :type="item.type" size="small" @click="buttonMethod(item.func, scope.$index, scope.row)">
            {{item.name}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'CeresTable',
  components: {},
  props: {
    tableColumn: {
      // 表头名称
      type: Array,
      default: () => [],
    },
    tableData: {
      // 表格数据
      type: Array,
      default: () => [],
    },
    operate: {
      // 自定义按键及绑定方法
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  computed: {},
  created() { },
  mounted() { },
  methods: {
    buttonMethod(funcName, index, row) {
      const _this = this
      const { methods } = this.$options
      methods[funcName](_this, index, row)
    },
    handleEdit(_this, index, row) {
      // 行内编辑, 调用父组件执行
      _this.$emit('handleEdit', { index, row })
    },
    handleDelete(_this, index, row) {
      // 行内删除，调用父组件执行
      _this.$emit('handleDelete', { index, row })
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
