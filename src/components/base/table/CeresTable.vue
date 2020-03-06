<template>
  <div class="ceres-table">
    <el-table :data="currentData" border style="width: 100%">
      <el-table-column v-for="item in tableColumn" :key="item.prop" :prop="item.prop" :label="item.label" />
      <el-table-column v-if="operate.length > 0" fixed="right" label="操作" min-width="160">
        <template slot-scope="scope">
          <el-button v-for="item in operate" :key="item.func" :type="item.type" size="small" @click="buttonMethod(item.func, scope.$index, scope.row)">
            {{item.name}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="pagination"
      class="pagination"
      background
      layout="prev, pager, next"
      :page-size="pagination.pageSize ? pagination.pageSize : 10"
      :total="pagination.pageTotal ? pagination.pageTotal : null"
      @current-change="currentChange"
     />
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
    pagination: {
      // 分页
      type: [Object, Boolean],
      default: false,
    },
  },
  data() {
    return {
      currentPage: 1, // 当前选中页
      currentData: [], // 每次切换页码的时候要给table传入不同的数据
      currentIndex: 1, // 当前索引，切换页面的时候需要重新计算
    }
  },
  computed: {},
  watch: {
    tableData: {
      handler() {
        // 传了分页配置
        if (this.pagination && this.pagination.pageSize) {
          this.currentData = this.tableData.filter((item, index) => index < this.pagination.pageSize)
        } else {
          this.currentData = this.tableData
        }
      },
      deep: true,
      immediate: true,
    },
  },
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
    // 切换当前页
    currentChange(page) {
      const currentSelectedData = []
      this.oldVal = []
      this.currentPage = page
      this.selectedTableData = JSON.parse(sessionStorage.getItem('selectedTableData'))
      this.currentData = this.tableData.filter(
        (item, index) => index >= (this.currentPage - 1) * this.pagination.pageSize
          && index < this.currentPage * this.pagination.pageSize,
      ) // eslint-disable-line
      this.$emit('currentChange', page)
      // 切换行索引
      this.currentIndex = (this.currentPage - 1) * this.pagination.pageSize + 1
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-right: -10px;
    margin-top: 15px;
  }
</style>
