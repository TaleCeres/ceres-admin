<template>
  <el-card class="container">
    <div class="header">
      <el-button icon="el-icon-plus" type="primary" @click="dialogAddVisible = true">新增</el-button>
      <CrudOperation class="crud-opts-right" :table-column="tableColumn"
        @handleColumnChange="handleColumnChange"
        @handleCheckAllChange="handleCheckAllChange"
        @refresh="getDictDataList"/>
    </div>
    <CeresTable
      v-loading="loading" 
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
  </el-card>
</template>

<script>
import DictModel from '@/models/dict'
import DictDataForm from './components/DictDataForm'
import crudMixin from '@/mixins/crud'
export default {
  name: 'DictDataList',
  components: { DictDataForm },
  mixins: [crudMixin],
  data() {
    return {
      loading: true,
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
        { prop: 'id', label: '字典编码', visible: true },
        { prop: 'label', label: '字典标签', visible: true },
        { prop: 'value', label: '字典键值', visible: true },
        { prop: 'order', label: '字典排序', visible: true },
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
      this.loading = true
      const { items, total } = await DictModel.getDictDataList(this.type, this.currentPage, 10)
      this.tableData = [...items]
      this.pagination.pageTotal = total
      this.loading = false
    },
    handleEdit(val) {
      this.dictData = val.row
      this.dialogEditVisible = true
    },
    async handleDelete(val) {
      const { id } = val.row
      await DictModel.deleteDictData(id)
      this.$message.success('删除字典数据成功!')
      this.getDictDataList()
    },

    async addDictData(data) {
      data.type = this.type
      await DictModel.addDictData(data)
      this.$message.success('新增字典数据成功!')
      this.dialogAddVisible = false
      this.getDictDataList()
    },

    async editDictData(val) {
      await DictModel.editDictData(val.id, val)
      this.$message.success('更新字典数据成功!')
      this.dialogEditVisible = false
      this.getDictDataList()
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
