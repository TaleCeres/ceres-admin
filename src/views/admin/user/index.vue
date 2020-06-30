<template>
  <el-card style="{ -moz-user-select : none }">
    <div v-show="!showEdit && !showAdd" class="container">
      <div class="header">
        <div class="crud-opts-left">
          <el-button icon="el-icon-plus" type="primary" @click="showAdd=!showAdd">新增</el-button>
        </div>
        <CrudOperation class="crud-opts-right" :table-column="tableColumn"
          @handleColumnChange="handleColumnChange"
          @handleCheckAllChange="handleCheckAllChange"
          @refresh="getList"/>
      </div>
      <CeresTable v-loading="loading"
                  :table-column="tableColumn" :table-data="tableData" :operate="operate"
                  @handleEdit="handleEdit" @handleDelete="handleDelete" />
    </div>
    <user-edit v-if="showEdit" :edit-id="editID" @handleHide="handleHide" />
  </el-card>
</template>

<script type="text/ecmascript-6">
import UserModel from '@/models/user'
import UserEdit from './UserEdit'
import crudMixin from '@/mixins/crud'

export default {
  name: 'AdminUser',
  components: {
    UserEdit
  },
  mixins: [crudMixin],
  data() {
    return {
      loading: false,
      tableColumn: [
        { prop: 'nickname', label: '昵称', visible: true },
        { prop: 'username', label: '用户名', visible: true },
        { prop: 'auth_scope', label: '用户组', visible: true },
        { prop: 'mobile', label: '手机号', visible: true },
        { prop: 'email', label: '邮箱', visible: true },
      ],
      tableData: [],
      operate: [
        { name: '编辑', func: 'handleEdit', type: 'primary' },
        { name: '删除', func: 'handleDelete', type: 'danger' },
      ],
      showEdit: false,
      showAdd: false,
      editID: '',
      currentPage: 1,
      pagination: {
        pageSize: 10,
        pageTotal: 0
      },
    }
  },
  computed: {},
  created() { },
  async mounted() {
    // await this.$mockApi.inject(this, 'name').get('user')
    await UserModel.getToken('999@qq.com', '123456')
    await UserModel.getInfo()
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      const data = await UserModel.getUserList(this.currentPage, this.pagination.pageSize)
      this.tableData = [...data.items]
      this.loading = false
    },
    handleEdit(val) {
      this.showEdit = true
      this.editID = val.row.id
    },
    handleDelete(val) {
      console.log(val, 'delete')
    },
    handleHide() {
      this.showAdd = false
      this.showEdit = false
      this.getList()
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.container {
  .header {
    display flex
    height 60px
    margin 0 0 10px
    align-items center
    .crud-opts-right {
    }
  }
}
</style>
