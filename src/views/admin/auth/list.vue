<template>
  <el-card class="container" style = "{ -moz-user-select : none }">
    <div v-show="!showEdit && !showAdd" class="container">
      <div class="header">
        <el-button icon="el-icon-plus" type="primary" @click="showAdd = true">新增</el-button>
        <CrudOperation class="crud-opts-right" :table-column="tableColumn"
          @handleColumnChange="handleColumnChange"
          @handleCheckAllChange="handleCheckAllChange"
          @refresh="getList"/>
      </div>
      <CeresTable
        v-loading="loading"
        :table-column="tableColumn"
        :table-data="tableData"
        :operate="operate"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
      />
    </div>
    <GroupApiAdd v-if="showAdd" @handleHide="handleHide"/>
    <GroupApiEdit v-if="showEdit" :cache-group="cacheGroup" @handleHide="handleHide"/>
  </el-card>
</template>

<script type="text/ecmascript-6">
import GroupApiAdd from './GroupApiAdd'
import GroupApiEdit from './GroupApiEdit'
import AdminModel from '@/models/admin'
import crudMixin from '@/mixins/crud'

export default {
  name: 'GroupAuthList',
  components: {
    GroupApiAdd,
    GroupApiEdit
  },
  mixins: [crudMixin],
  data() {
    return {
      loading: false,
      showAdd: false,
      showEdit: false,
      tableColumn: [
        { prop: 'name', label: '名称', visible: true },
        { prop: 'info', label: '信息', visible: true },
      ],
      tableData: [],
      operate: [
        { name: '编辑', func: 'handleEdit', type: 'primary' },
        { name: '删除', func: 'handleDelete', type: 'danger' },
      ],
      cacheGroup: {}
    }
  },
  computed: { },
  created() { },
  async mounted() {
    // await User.getToken('999@qq.com', '123456')
    // await User.getInfo()
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      const data = await AdminModel.getAllGroups()
      this.tableData = data.items
      this.loading = false
    },
    handleEdit(val) {
      this.showEdit = true
      console.log('cacheGroup', val.row)
      this.cacheGroup = { ...val.row }
    },
    async handleDelete(val) {
      await AdminModel.deleteGroup(val.row.id)
      this.$message.success('删除成功')
      this.getList()
    },
    handleHide() {
      this.showAdd = false
      this.showEdit = false
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
      .title {
        height 59px
        line-height 59px
        font-size 16px
        font-weight 500
      }
    }
  }
</style>
