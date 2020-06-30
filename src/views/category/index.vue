<template>
  <el-card v-show="!showEdit && !showAdd" class="container">
    <div class="header">
      <el-button icon="el-icon-plus" type="primary" @click="showAdd=!showAdd">新增</el-button>
      <CrudOperation class="crud-opts-right" :table-column="tableColumn"
                     @handleColumnChange="handleColumnChange"
                     @handleCheckAllChange="handleCheckAllChange"
                     @refresh="getList"/>
    </div>
    <CeresTable
      :table-column="tableColumn"
      :table-data="tableData"
      :operate="operate"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
    />
    <!-- 编辑页面 -->
    <CategoryEdit v-if="showEdit" @editID="editID" @hanleHide="showEdit=false"/>
    <!-- 新增页面 -->
    <CategoryAdd v-if="showAdd" @hanleHide="showAdd=false"/>
  </el-card>
</template>

<script type="text/ecmascript-6">
import CategoryAdd from './CategoryAdd'
import CategoryEdit from './CategoryEdit'
import crudMixin from '@/mixins/crud'

export default {
  name: 'CategoryIndex',
  components: {
    CategoryAdd,
    CategoryEdit
  },
  mixins: [crudMixin],
  data() {
    return {
      tableColumn: [
        { prop: 'id', label: '编号', visible: true },
        { prop: 'name', label: '类名', visible: true },
        {
          prop: 'image',
          label: '图片链接',
          // eslint-disable-next-line
          render: (row, column, cell) => {
            return (
              <el-image src={row.image} preview-src-list={[row.image]}></el-image>
            )
          },
          width: '200',
          visible: true
        },
      ],
      tableData: [],
      operate: [
        { name: '子分类', func: 'handleDetail', type: 'success' },
        { name: '编辑', func: 'handleEdit', type: 'primary' },
        { name: '删除', func: 'handleDelete', type: 'danger' },
      ],
      showEdit: false,
      showAdd: false,
    }
  },
  computed: {},
  created() { },
  async mounted() {
    await this.getList()
  },
  methods: {
    async getList() {
      this.tableData = await this.$model.category.getAll()
      this.tableData.forEach(item => {
        item.imageUrl = item.image.url
      })
    },
    // 进入编辑页面
    handleEdit(val) {
      this.showEdit = true
      this.editID = val.row.id
    },
    // 删除数据
    handleDelete(val) {},
    hanleHideAdd() {
      this.showAdd = false
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
