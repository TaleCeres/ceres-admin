<template>
  <div>
    <div v-show="!showEdit && !showAdd" class="container">
      <div class="header">
        <div class="title">分组列表</div>
        <el-button type="primary" style="margin-left: 30px" size="medium" @click="showAdd = true">新增分组</el-button>
      </div>
      <ceres-table
        :table-column="tableColumn"
        :table-data="tableData"
        :operate="operate"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
      />
    </div>
    <GroupApiAdd v-if="showAdd" @handleHide="handleHide"/>
    <GroupApiEdit v-if="showEdit" :cache-group="cacheGroup" @handleHide="handleHide"/>
  </div>
</template>

<script type="text/ecmascript-6">
import GroupApiAdd from './GroupApiAdd'
import GroupApiEdit from './GroupApiEdit'
import Admin from '@/models/admin'
import User from '@/models/user'
export default {
  name: 'GroupApiList',
  components: {
    GroupApiAdd,
    GroupApiEdit
  },
  data() {
    return {
      showAdd: false,
      showEdit: false,
      tableColumn: [
        { prop: 'name', label: '名称' },
        { prop: 'info', label: '信息' },
      ],
      tableData: [],
      operate: [
        { name: '编辑', func: 'handleEdit', type: 'primary' },
        { name: '删除', func: 'handleDelete', type: 'danger' },
      ],
      cacheGroup: {}
    }
  },
  computed: {},
  created() { },
  async mounted() {
    await User.getToken('999@qq.com', '123456')
    await User.getInfo()
    this.getAllGroups()
  },
  methods: {
    async getAllGroups() {
      this.tableData = await Admin.getAllGroups()
    },
    handleEdit(val) {
      this.showEdit = true
      this.cacheGroup = { ...val.row }
    },
    async handleDelete(val) {
      await Admin.deleteOneGroup(val.row.id)
      this.$message.success('删除成功')
      this.getAllGroups()
    },
    handleHide() {
      this.showAdd = false
      this.showEdit = false
      this.getAllGroups()
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
