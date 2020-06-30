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
import BannerModel from '@/models/banner'
import crudMixin from '@/mixins/crud'

export default {
  name: 'BannerIndex',
  components: {},
  mixins: [crudMixin],
  data() {
    return {
      loading: true,
      currentPage: 1,
      pagination: {
        pageSize: 10,
        pageTotal: 0
      },
      tableColumn: [
        { prop: 'id', label: '序号', width: '60', visible: true },
        { prop: 'name', label: '名称', visible: true },
        { prop: 'description', label: '描述', visible: true },
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
        size: 10
      }
      const { current_page: currentPage, items, total } = await BannerModel.getList(query)
      this.currentPage = currentPage
      this.tableData = [...items]
      this.pagination.pageTotal = total
      this.loading = false
    },
    async handleDelete({ row }) {
      await BannerModel.deleteBanner(row.id)
      this.$message.success('删除成功!')
      await this.getList()
    },
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
