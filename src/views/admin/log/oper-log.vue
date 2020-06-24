<template>
  <el-card class="container" style = "{ -moz-user-select : none }">
    <div v-show="searchToggle" class="search-container">
      <el-date-picker
        v-model="timeInterval"
        :default-time="['00:00:00','23:59:59']"
        type="daterange"
        range-separator=":"
        size="small"
        class="date-item"
        value-format="timestamp"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <el-button icon="el-icon-search" type="primary" @click="getList">搜索</el-button>
      <el-button icon="el-icon-refresh" type="warning" @click="resetQuery">重置</el-button>
    </div>
    <div class="header">
      <CrudOperation class="crud-opts-resetQueryright" :table-column="tableColumn"
                     @handleColumnChange="handleColumnChange"
                     @handleCheckAllChange="handleCheckAllChange"
                     @toggleSearch="toggleSearch"
                     @refresh="getList"/>
    </div>
    <CeresTable
      v-loading="loading"
      :pagination="pagination"
      :table-column="tableColumn"
      :table-data="tableData"
      :operate="operate"
      :current-page="currentPage"
      @handleDelete="handleDelete"
      @currentChange = "currentChange"
    />
  </el-card>
</template>

<script type="text/ecmascript-6">
import OperLogModel from '@/models/oper-log'
import crudMixin from '@/mixins/crud'
export default {
  name: 'OperLog',
  mixins: [crudMixin],
  props: {},
  data() {
    return {
      loading: true,
      query: {},
      currentPage: 1,
      timeInterval: [],
      size: 10,
      pagination: {
        pageSize: this.$pagination.pageSize,
        pageTotal: 0
      },
      tableColumn: [
        { prop: 'id', label: '编号', visible: true },
        { prop: 'request_method', label: '请求方式', visible: true },
        { prop: 'type', label: '操作类型', visible: true },
        { prop: 'path', label: '请求地址', visible: true },
        { prop: 'message', label: '操作信息', visible: true },
        { prop: 'user_name', label: '操作人员', visible: true },
        { prop: 'create_time', label: '登录日期', visible: true },
      ],
      operate: [
        { name: '删除', func: 'handleDelete', type: 'danger' },
      ],
      tableData: []
    }
  },
  computed: {
    start() {
      if (this.timeInterval.length) {
        return this.timeInterval[0] / 1000
      }
      return undefined
    },
    end() {
      if (this.timeInterval.length) {
        return this.timeInterval[1] / 1000
      }
      return undefined
    }
  },
  created() {},
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      this.query = {
        page: this.currentPage,
        size: this.size,
        start: this.start,
        end: this.end,
      }
      const data = await OperLogModel.getList(this.query)
      this.tableData = [...data.items]
      this.pagination.pageTotal = data.total
      this.loading = false
    },
    resetQuery() {
      this.timeInterval = []
      this.__resetQuery()
    },
    async handleDelete({ index, row }) {
      await OperLogModel.deleteLog(row.id)
      this.$message.success('删除成功！')
      this.getList()
    },
    currentChange(val) {
      this.currentPage = val
      this.getList()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .container {
    .header {
      display flex
      height 60px
      align-items center
      .crud-opts-right {
      }
    }
  }
</style>
