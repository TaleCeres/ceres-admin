<template>
  <div class="container">
    <div class="header">
      <div class="title">修改分组信息</div>
      <div class="back" @click="handleHide">
        <fa-icon icon-name="undo" />
        返回
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="修改信息" name="first">
        <el-form
          ref="form"
          v-loading="loading"
          status-icon
          :model="form"
          label-position="right"
          label-width="100px"
          @submit.native.prevent
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name" size="medium" disabled/>
          </el-form-item>
          <el-form-item label="选择分组" prop="name">
            <el-select v-model="form.group_id" placeholder="请选择">
              <el-option
                v-for="item in groups"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="second">
      </el-tab-pane>
    </el-tabs>
    <div class="submit">
      <el-button type="primary" @click="submitForm('form')">保 存</el-button>
      <el-button @click="resetForm('form')">重 置</el-button>
    </div>
  </div>
</template>

<script>
import User from '@/models/user'
import AdminModel from '@/models/admin'
export default {
  props: {
    editId: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      activeName: 'first',
      form: {
        name: '',
        group_id: undefined
      },
      loading: false,
      groups: []
    }
  },
  mounted() {
    this.getUser()
    this.getAllGroups()
  },
  methods: {
    async getAllGroups() {
      this.groups = (await AdminModel.getAllGroups()).items
      console.log(this.groups)
    },
    async getUser() {
      const res = await User.getUser(this.editId)
      this.form.name = res.nickname
      this.form.group_id = res.group_id
    },
    handleHide() {
      this.$emit('handleHide', false)
    },

    async submitForm(formName) {
      // eslint-disable-next-line
      await User.updateUserGroup(this.editId, this.form.group_id)
      this.$message.success('用户分组信息更新成功！')
      // if (this.activeName === 'first') {
      //   if (this.form.name === '') {
      //     this.$message.warning('请将信息填写完整')
      //     return
      //   }
      //   if (this.cacheGroup.name !== this.form.name || this.cacheGroup.info !== this.form.info) {
      //       // eslint-disable-line
      //     this.loading = true
      //     const res = await AdminModel.updateGroup(this.form.name, this.form.info, this.id)
      //     this.loading = false
      //     this.$message.success('权限组信息更新成功！')
      //   }
      // } else {
      //   let addRes = 0
      //   let delRes = 0
      //   // 判断是否更改了分组权限
      //   if (this.permissions.sort().toString() !== this.cachePermissions.sort().toString()) {
      //     const deletePermissions = this.cachePermissions
      //       .concat(this.permissions)
      //       .filter(v => !this.permissions.includes(v))
      //     const addPermissions = this.cachePermissions
      //       .concat(this.permissions)
      //       .filter(v => !this.cachePermissions.includes(v))
      //
      //     this.loading = true
      //     if (addPermissions.length > 0) {
      //       addRes = await AdminModel.dispatchPermissions(this.id, addPermissions)
      //     }
      //     if (deletePermissions.length > 0) {
      //       delRes = await AdminModel.removePermissions(this.id, deletePermissions)
      //     }
      //     this.loading = false
      //     this.$message.success('权限修改成功')
      //   }
      // }
    },
    resetForm(formName) {
      this.getUser()
    },
  },
}
</script>

<style lang="stylus" scoped>
  .container {
    .header {
      display flex
      justify-content space-between
      align-items center
      .title {
        height 59px
        line-height 59px
        font-size 16px
        font-weight 500
      }
      .back {
        margin-right 40px
        cursor pointer
      }
    }
  }
</style>
