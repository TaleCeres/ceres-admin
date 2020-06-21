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
        <el-form ref="form" v-loading="loading" status-icon :model="form"
                 label-position="right" label-width="100px" @submit.native.prevent>
          <el-form-item label="分组名称" prop="name">
            <el-input v-model="form.name" size="medium" clearable/>
          </el-form-item>
          <el-form-item label="分组描述" prop="info">
            <el-input v-model="form.info" size="medium" clearable/>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="配置权限" name="second">
        <GroupApiPermissions :id="id" ref="groupPermissions" title="分配权限"
                             @updatePermissions="updatePermissions"
                             @getCacheAuthIds="getCacheAuthIds"
                             @updateAllPermissions="updateAllPermissions" />
      </el-tab-pane>
      <el-tab-pane label="配置菜单" name="third">
        <GroupMenu :group-id="cacheGroup.id"></GroupMenu>
      </el-tab-pane>
    </el-tabs>
    <div v-if="activeName !== 'third'" class="submit">
      <el-button type="primary" @click="submitForm('form')">保 存</el-button>
      <el-button @click="resetForm('form')">重 置</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import AdminModel from '@/models/admin'
import GroupApiPermissions from './GroupApiPermissions'
import GroupMenu from './GroupMenu'

export default {
  components: {
    GroupApiPermissions,
    GroupMenu
  },
  props: {
    cacheGroup: {
      type: Object,
      default: () => ({
        id: undefined,
        name: undefined,
        info: undefined,
      })
    }
  },
  data() {
    return {
      activeName: 'third',
      allPermissions: [], // 所有权限
      permissions: [], // 最终选择的权限
      form: {
        name: '',
        info: '',
      },
      loading: false,
      cachePermissions: []
    }
  },
  computed: {
    id() {
      return this.cacheGroup.id
    }
  },
  mounted() {
    this.getGroup()
  },
  methods: {
    async getGroup() {
      const data = await AdminModel.getGroup(this.id)
      this.form.name = data.name
      this.form.info = data.info
    },
    handleHide() {
      this.$emit('handleHide', false)
    },
    updatePermissions(permissions) {
      this.permissions = permissions
    },
    updateAllPermissions(allPermissions) {
      this.allPermissions = allPermissions
    },

    getCacheAuthIds(ids) {
      this.cachePermissions = ids
    },

    async submitForm(formName) {
      if (this.activeName === 'first') {
        if (this.form.name === '') {
          this.$message.warning('请将信息填写完整')
          return
        }
        if (this.cacheGroup.name !== this.form.name || this.cacheGroup.info !== this.form.info) {
          // eslint-disable-line
          this.loading = true
          const res = await AdminModel.updateGroup(this.form.name, this.form.info, this.id)
          this.loading = false
          this.$message.success('权限组信息更新成功！')
        }
      } else {
        let addRes = 0
        let delRes = 0
        // 判断是否更改了分组权限
        if (this.permissions.sort().toString() !== this.cachePermissions.sort().toString()) {
          const deletePermissions = this.cachePermissions
            .concat(this.permissions)
            .filter(v => !this.permissions.includes(v))
          const addPermissions = this.cachePermissions
            .concat(this.permissions)
            .filter(v => !this.cachePermissions.includes(v))

          this.loading = true
          if (addPermissions.length > 0) {
            addRes = await AdminModel.dispatchPermissions(this.id, addPermissions)
          }
          if (deletePermissions.length > 0) {
            delRes = await AdminModel.removePermissions(this.id, deletePermissions)
          }
          this.loading = false
          this.$message.success('权限修改成功')
        }
      }
    },
    resetForm(formName) {
      this.getGroup()
      this.$refs.groupPermissions.getGroupPermissions()
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
