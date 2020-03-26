<template>
  <div>
  <div v-show="!showEdit && !showAdd" class="container">
    <div class="header">
      <div class="title">项目列表</div>
      <el-button style="margin-left: 30px" type="primary" @click="showAdd=!showAdd">添加项目</el-button>
    </div>
    <ceres-table
      v-loading="loading"
      :table-column="tableColumn"
      :table-data="tableData"
      :operate="operate"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
    />
  </div>
    <user-edit v-if="showEdit" :edit-id="editID" @handleHide="handleHide" />
  </div>
</template>

<script type="text/ecmascript-6">
import UserModel from '@/models/user'
import UserEdit from './UserEdit'
export default {
  name: 'UserList',
  components: {
    UserEdit
  },
  data() {
    return {
      loading: false,
      tableColumn: [
        { prop: 'nickname', label: '用户名' },
        { prop: 'email', label: '邮箱' },
      ],
      tableData: [],
      operate: [
        { name: '编辑', func: 'handleEdit', type: 'primary' },
        { name: '删除', func: 'handleDelete', type: 'danger' },
      ],
      showEdit: false,
      showAdd: false,
      editID: ''
    }
  },
  computed: {},
  created() {},
  async mounted() {
    // await this.$mockApi.inject(this, 'name').get('user')
    await UserModel.getToken('777@qq.com', '123456')
    await UserModel.getInfo()
    this.getUserList(1, 10)
  },
  methods: {
    async getUserList(page, size) {
      this.loading = true
      const res = await UserModel.getUserList(page, size)
      this.tableData = [...res.items]
      this.loading = false
    },
    handleEdit(val) {
      this.showEdit = true
      this.editID = val.row.id
    },
    handleDelete(val) {
      console.log(val, 13123)
    },
    handleHide() {
      this.showAdd = false
      this.showEdit = false
      this.getUserList(1, 10)
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
