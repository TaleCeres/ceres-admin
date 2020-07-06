<template>
  <el-card class="container">
    <div class="header">
      <el-button icon="el-icon-plus" type="primary" @click="dialogAddVisible = true">新增</el-button>
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

    <DictForm
      :visible="dialogAddVisible"
      @close="dialogAddVisible = false"
      @handleSubmit="handleAdd">
    </DictForm>

    <DictForm
      :dict="dict"
      :visible="dialogEditVisible"
      @close="dialogEditVisible = false"
      @handleSubmit="editDict">
    </DictForm>
  </el-card>
</template>

<script>
import DictModel from '@/models/dict'
import DictForm from './components/DictForm'
import crudMixin from '@/mixins/crud'

export default {
  name: 'AdminDict',
  components: { DictForm },
  mixins: [crudMixin],
  data() {
    return {
      loading: true,
      dict: {},
      newDictRules: {
        name: [
          { required: true, message: '字典名称不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '字典类型不能为空', trigger: 'blur' }
        ]
      },
      dialogAddVisible: false,
      dialogEditVisible: false,
      currentPage: 1,
      pagination: {
        pageSize: 10,
        pageTotal: 0
      },
      tableColumn: [
        { prop: 'id', label: '字典编号', visible: true },
        { prop: 'name', label: '字典名称', visible: true },
        {
          prop: 'type',
          label: '字典类型',
          // eslint-disable-next-line
          render: (row, column, cell) => {
            return (
              <router-link class="path" to={`/admin/dict/data/${row.id}`}>{[row.type]}</router-link>
            )
          },
          visible: true
        },
        {
          prop: 'status',
          label: '状态',
          // eslint-disable-next-line
          render: (row, column, cell) => {
            return (
              <span>{[row.status ? '正常' : '停用']}</span>
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
  created() {
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      // eslint-disable-next-line camelcase
      const { current_page: currentPage, items, total } = await DictModel.getDictTypeList(this.currentPage, 10)
      this.currentPage = currentPage
      this.tableData = [...items]
      this.pagination.pageTotal = total
      this.loading = false
    },
    async handleAdd(dict) {
      const res = await DictModel.addDict(dict)
      this.dialogAddVisible = false
      this.$message.success('新增成功!')
      this.getList()
    },
    handleEdit({ row }) {
      this.dict = row
      this.$nextTick(() => {
        this.dialogEditVisible = true
      })
    },
    async handleDelete({ row }) {
      await DictModel.deleteDictType(row.id)
      this.$message.success('删除成功!')
      await this.getList()
    },
    currentChange(val) {
      this.currentPage = val
      this.getList()
    },
    async editDict(dict) {
      const {
        id, name, remark, status, type
      } = dict
      await DictModel.editDictType(id, {
        name, remark, status, type
      })
      this.$message.success('更新成功!')
      await this.getList()
      this.dialogEditVisible = false
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
