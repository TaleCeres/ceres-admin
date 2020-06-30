<template>
  <div class="ceres-table">
    <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column v-if="selection" type="selection" width="55">
      </el-table-column>
      <el-table-column v-for="item in $tableColumn" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"
                       :formatter="item.render" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column v-if="operate.length > 0" fixed="right" label="操作" width="240">
        <template slot-scope="scope">
          <template v-for="item in operate">
            <el-popconfirm
              v-if="item.func === 'handleDelete'" :key="item.func"
              style="margin: 0 10px;"
              title="确定删除本条数据吗？"
              confirm-button-text='确定'
              cancel-button-text='取消'
              icon="el-icon-info"
              icon-color="red"
              @onConfirm="buttonMethod(item.func, scope.$index, scope.row)">
              <el-button slot="reference" :type="item.type" size="small">
              {{item.name}}
              </el-button>
            </el-popconfirm>

            <el-button v-else :key="item.func" :type="item.type" size="small" @click="buttonMethod(item.func, scope.$index, scope.row)">
              {{item.name}}
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="pagination"
      class="pagination"
      background
      layout="total, prev, pager, next"
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
    selection: {
      // 选择
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    // 配合CRUD.operation.vue来使用
    $tableColumn() {
      return this.tableColumn.filter(item => {
        if ('visible' in item) {
          return item.visible
        }
        return true
      })
    }
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
      this.$emit('currentChange', page)
    },
    // 表格行选中
    handleSelectionChange(val) {
      if (this.selection) {
        this.$emit('selectionChange', val)
      }
    }
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
