<template>
  <el-card class="container" style = "{ -moz-user-select : none }">
    <div class="header">
      <CrudOperation class="crud-opts-right" :table-column="tableColumn"
                     @handleColumnChange="handleColumnChange"
                     @handleCheckAllChange="handleCheckAllChange"
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
import LoginLogModel from '@/models/login-log'
import crudMixin from '@/mixins/crud'
export default {
  name: 'LoginLog',
  mixins: [crudMixin],
  props: {},
  data() {
    return {
      loading: true,
      currentPage: 1,
      size: 10,
      start: undefined,
      end: undefined,
      pagination: {
        pageSize: this.$pagination.pageSize,
        pageTotal: 0
      },
      tableColumn: [
        { prop: 'id', label: '编号', visible: true },
        { prop: 'user_name', label: '用户名', visible: true },
        { prop: 'ip_addr', label: '登录地址', visible: true },
        { prop: 'location', label: '登录地点', visible: true },
        { prop: 'browser', label: '浏览器', visible: true },
        { prop: 'os', label: '操作系统', visible: true },
        {
          prop: 'status',
          label: '登录状态',
          // eslint-disable-next-line
          render: (row, column, cell) => (<span>{row.status? '成功': '失败'}</span>),
          visible: true
        },
        { prop: 'message', label: '登录信息', visible: true },
        { prop: 'create_time', label: '登录日期', visible: true },
      ],
      operate: [
        { name: '删除', func: 'handleDelete', type: 'danger' },
      ],
      tableData: []
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      const data = await LoginLogModel.getList(this.currentPage, this.size)
      this.tableData = [...data.items]
      this.pagination.pageTotal = data.total
      this.loading = false
    },
    async handleDelete({ index, row }) {
      await LoginLogModel.deleteLog(row.id)
      this.$message.success('删除成功')
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
