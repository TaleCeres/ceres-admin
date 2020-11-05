<template>
  <el-card class="container">
    <div class="header">
      <el-button icon="el-icon-plus" type="primary">新增</el-button>
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
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
      @currentChange="currentChange"
    />
  </el-card>
</template>

<script type="text/ecmascript-6">
import ConfigModel from '@/models/config'
import crudMixin from '@/mixins/crud'

export default {
  name: 'AdminConfig',
  components: {},
  mixins: [crudMixin],
  data() {
    return {
      loading: true,
      currentPage: 1,
      pagination: {
        pageSize: this.$pagination.pageSize,
        pageTotal: 0
      },
      tableColumn: [
        { prop: 'id', label: '序号', width: '60', visible: true },
        { prop: 'name', label: '名称', visible: true },
        { prop: 'key', label: '键名', visible: true },
        { prop: 'value', label: '键值', visible: true },
        {
          prop: 'type',
          label: '系统内置',
          width: '100',
          // eslint-disable-next-line
          render: (row, column, cell) => {
            return (
              <el-tag type={row.type ? 'success' : 'info'}>
                {row.type ? '内置' : '非内置'}
              </el-tag>
            )
          },
          visible: true
        },
        { prop: 'remark', label: '备注', visible: true },
      ],
      tableData: [],
      operate: [
        { name: '编辑', func: 'handleEdit', type: 'primary' },
        { name: '删除', func: 'handleDelete', type: 'danger' },
      ],
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
      // eslint-disable-next-line camelcase
      let query = {
        page: this.currentPage,
        size: this.pagination.pageSize
      }
      const { current_page: currentPage, items, total } = await ConfigModel.getList(query)
      this.currentPage = currentPage
      this.tableData = [...items]
      this.pagination.pageTotal = total
      this.loading = false
    },
    async handleDelete({ row }) {
      await ConfigModel.deleteConfig(row.id)
      this.$message.success('删除成功!')
      await this.getList()
    },
    currentChange(val) {
      this.currentPage = val
      this.getList()
    }
  },
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
  .path {
    color #1890ff
    margin-left 10px
  }
}
</style>
