<template>
  <div class="container">
    <div class="header">
      <div class="title">字典数据列表</div>
      <el-button style="margin-left: 30px" type="primary" @click="dialogAddVisible = true">新增字典数据</el-button>
    </div>
    <ceres-table
      :pagination="pagination"
      :table-column="tableColumn"
      :table-data="tableData"
      :operate="operate"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
    />
    <DictDataForm
      :type="type"
      :dict-data="dictData"
      :visible="dialogEditVisible"
      @close="dialogEditVisible = false"
      @handleSubmit="editDictData">
    </DictDataForm>
  </div>
</template>

<script>
import DictModel from '@/models/dict'
import DictDataForm from './components/DictDataForm'
export default {
  name: 'dict-data',
  components: { DictDataForm },
  data() {
    return {
      dictData: {},
      dialogAddVisible: false,
      dialogEditVisible: false,
      currentPage: 1,
      pagination: {
        pageSize: 10,
        pageTotal: 0
      },
      type: '',
      tableColumn: [
        { prop: 'id', label: '字典编码' },
        { prop: 'label', label: '字典标签' },
        { prop: 'value', label: '字典键值' },
        { prop: 'order', label: '字典排序' },
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
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  created() {
  },
  async mounted() {
    await this.getDictTypeById()
    await this.getDictDataList()
  },
  methods: {
    async getDictTypeById() {
      const res = await DictModel.getDictTypeById(this.id)
      this.type = res.type
    },

    async getDictDataList() {
      const { items, total } = await DictModel.getDictDataList(this.type, this.currentPage, 10)
      this.tableData = [...items]
      this.pagination.pageTotal = total
    },
    handleEdit(val) {
      this.dictData = val.row
      this.dialogEditVisible = true
    },
    async handleDelete(val) {
      const { id } = val.row
      await DictModel.deleteDictData(id)
      this.$message.success('删除字典数据成功')
      await this.getDictDataList()
    },

    async addDictData(data) {
      data.type = this.type
      await DictModel.addDictData(data)
      this.$message.success('新增字典数据成功')
      this.dialogAddVisible = false
      await this.getDictDataList()
    },

    async editDictData(val) {
      await DictModel.editDictData(val.id, val)
      this.$message.success('更新字典数据成功')
      this.dialogEditVisible = false
      await this.getDictDataList()
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
  }
</style>
