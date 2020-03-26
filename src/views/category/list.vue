<template>
  <div>
    <div v-show="!showEdit && !showAdd" class="container">
      <div class="header">
        <div class="title">项目列表</div>
        <el-button style="margin-left: 30px" @click="showAdd=!showAdd">添加项目</el-button>
      </div>
      <ceres-table
        :table-column="tableColumn"
        :table-data="tableData"
        :operate="operate"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
      />
    </div>
    <!-- 编辑页面 -->
    <category-edit v-if="showEdit" @editID="editID" @hanleHide="showEdit=false"/>
    <!-- 新增页面 -->
    <category-add v-if="showAdd" @hanleHide="showAdd=false"/>
  </div>
</template>

<script type="text/ecmascript-6">
import CategoryAdd from './CategoryAdd'
import CategoryEdit from './CategoryEdit'

export default {
  name: 'ProjectList',
  components: {
    CategoryAdd,
    CategoryEdit
  },
  data() {
    return {
      tableColumn: [
        { prop: 'id', label: 'ID' },
        { prop: 'name', label: '类名' },
        { prop: 'imageUrl', label: '图片链接' },
      ],
      tableData: [],
      operate: [
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
    this.tableData = await this.$model.category.getAll()
    this.tableData.forEach(item => {
      item.imageUrl = item.image.url
    })
  },
  methods: {
    handleEdit(val) {
      this.showEdit = true
      this.editID = val.row.id
    },
    handleDelete(val) {
      console.log(val, 13123)
    },
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
