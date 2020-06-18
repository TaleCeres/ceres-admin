<template>
    <div class="container">
      <div class="header">
        <div class="title">字典列表</div>
        <el-button style="margin-left: 30px" type="primary" @click="dialogAddVisible = true">新增字典</el-button>
      </div>
      <ceres-table
        :pagination="pagination"
        :table-column="tableColumn"
        :table-data="tableData"
        :operate="operate"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
        @currentChange = "currentChange"
      />

      <DictForm
        :visible="dialogAddVisible"
        @close="dialogAddVisible = false"
        @handleSubmit="addDict">
      </DictForm>

      <DictForm
        :dict="dict"
        :visible="dialogEditVisible"
        @close="dialogEditVisible = false"
        @handleSubmit="editDict">
      </DictForm>

    </div>
</template>

<script>
import DictModel from '@/models/dict'
import DictForm from './components/DictForm'
export default {
  name: 'index',
  components: { DictForm },
  data() {
    return {
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
        { prop: 'id', label: '字典编号' },
        { prop: 'name', label: '字典名称' },
        {
          prop: 'type',
          label: '字典类型',
          // eslint-disable-next-line
          render: (row, column, cell) => {
            return (
              <router-link class="path" to={`/admin/dict/data/${row.id}`}>{[row.type]}</router-link>
            )
          }
        },
        {
          prop: 'status',
          label: '状态',
          // eslint-disable-next-line
          render: (row, column, cell) => {
            return (
              <span>{[row.status ? '正常' : '停用']}</span>
            )
          }
        },
        { prop: 'remark', label: '备注' },
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
      // eslint-disable-next-line camelcase
      const { current_page: currentPage, items, total } = await DictModel.getDictTypeList(this.currentPage, 10)
      this.currentPage = currentPage
      this.tableData = [...items]
      this.pagination.pageTotal = total
    },
    async addDict(dict) {
      const res = await DictModel.addDict(dict)
      this.dialogAddVisible = false
      this.$message.success('新增字典成功!')
      this.getList()
    },
    handleEdit(val) {
      this.dict = val.row
      this.$nextTick(() => {
        this.dialogEditVisible = true
      })
    },
    async handleDelete(val) {
      const { id } = val.row
      await DictModel.deleteDictType(id)
      this.$message.success('删除字典成功!')
      await this.getList()
    },
    currentChange(val) {
      this.currentPage = val
      this.getList()
    },
    async editDict(dict) {
      console.log(dict)
      const {
        id, name, remark, status, type
      } = dict
      await DictModel.editDictType(id, {
        name, remark, status, type
      })
      this.$message.success('更新字典成功!')
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
      align-items center
      .title {
        height 59px
        line-height 59px
        font-size 16px
        font-weight 500
      }
    }
    .path {
      color #1890ff
      margin-left 10px
    }
  }
</style>