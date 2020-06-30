<template>
  <el-card class="container" style = "{ -moz-user-select : none }">
    <div class="header">
      <el-button type="primary" icon="el-icon-plus" @click="dialogAddVisible =true">新增</el-button>
      <el-popconfirm
        style="margin: 0 10px;"
        title="确定删除当前选中的内容吗？"
        confirm-button-text='确定'
        cancel-button-text='取消'
        icon="el-icon-info"
        icon-color="red"
        @onConfirm="deleteNotice">
        <el-button slot="reference" type="danger" icon="el-icon-delete"
                   :disabled="multipleSelection.length === 0">
                   删除
        </el-button>
      </el-popconfirm>
      <CrudOperation class="crud-opts-right" :table-column="tableColumn"
                     @handleColumnChange="handleColumnChange"
                     @handleCheckAllChange="handleCheckAllChange"
                     @refresh="getList"/>
    </div>
    <CeresTable
      v-loading="loading"
      :selection="true"
      :pagination="pagination"
      :table-column="tableColumn"
      :table-data="tableData"
      :operate="operate"
      :current-page="currentPage"
      @selectionChange="handleSelectionChange"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
      @currentChange = "currentChange"
    />
    <NoticeForm
      :dialog-visible="dialogAddVisible"
      @submit="addNotice"
      @close="dialogAddVisible = false"></NoticeForm>

    <NoticeForm
      :id="editId"
      :dialog-visible="dialogEditVisible"
      @submit="editNotice"
      @close="closeEditForm"></NoticeForm>
  </el-card>
</template>

<script>
import NoticeModel from '@/models/notice'
import crudMixin from '@/mixins/crud'
import NoticeForm from './NoticeForm'
export default {
  name: 'AdminNotice',
  components: {
    NoticeForm
  },
  mixins: [crudMixin],
  data() {
    return {
      multipleSelection: [],
      editId: null,
      dialogAddVisible: false,
      dialogEditVisible: false,
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
        { prop: 'id', label: '编号', width: '60', visible: true },
        { prop: 'title', label: '标题', visible: true },
        {
          prop: 'type',
          label: '类型',
          width: '100',
          // eslint-disable-next-line
          render: (row, column, cell) => {
            return (
              <span>{[row.type === 1 ? '通知' : '公告']}</span>
            )
          },
          visible: true
        },
        {
          prop: 'status',
          label: '状态',
          width: '100',
          // eslint-disable-next-line
          render: (row, column, cell) => {
            return (
              <el-tag type={row.type ? 'success' : 'danger'}>
                {row.type ? '正常' : '关闭'}
              </el-tag>
            )
          },
          visible: true
        },
        { prop: 'create_by', label: '创建者', visible: true },
      ],
      operate: [
        { name: '修改', func: 'handleEdit', type: 'primary' },
        { name: '删除', func: 'handleDelete', type: 'danger' },
      ],
      tableData: []
    }
  },
  computed: {},
  created() {
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      this.query = {
        page: this.currentPage,
        size: this.size,
      }
      const data = await NoticeModel.getList(this.query)
      this.tableData = [...data.items]
      this.pagination.pageTotal = data.total
      this.loading = false
    },
    async handleEdit({ index, row }) {
      this.editId = row.id
      this.dialogEditVisible = true
    },
    async handleDelete({ index, row }) {
      await NoticeModel.deleteNotice(row.id)
      this.$message.success('删除通知成功')
      this.getList()
    },
    currentChange(val) {
      this.currentPage = val
      this.getList()
    },
    async addNotice(query) {
      await NoticeModel.addNotice(query)
      this.$message.success('新增通知成功')
      this.dialogAddVisible = false
      this.getList()
    },
    async editNotice(query) {
      await NoticeModel.updateNotice(this.editId, query)
      this.$message.success('更新通知成功')
      this.dialogEditVisible = false
      this.getList()
    },
    closeEditForm() {
      this.dialogEditVisible = false
      this.editId = null
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    async deleteNotice() {
      const ids = this.multipleSelection.map(item => item.id).join(',')
      await NoticeModel.deleteNotice(ids)
      this.$message.success('删除通知成功')
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
  }
</style>
