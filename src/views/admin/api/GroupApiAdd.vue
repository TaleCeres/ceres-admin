<template>
  <div class="container">
    <div class="header">
      <div class="title">新建分组信息</div>
      <div class="back" @click="handleHide">
        <fa-icon icon-name="undo" />
        返回
      </div>
    </div>
    <el-row>
      <el-col :lg="16" :md="20" :sm="24" :xs="24">
        <div class="content">
          <el-form ref="form" v-loading="loading" status-icon :rules="rules" :model="form"
                   label-position="right" label-width="100px" @submit.native.prevent
          >
            <el-form-item label="分组名称" prop="name">
              <el-input v-model="form.name" size="medium" clearable/>
            </el-form-item>
            <el-form-item label="分组描述" prop="info">
              <el-input v-model="form.info" size="medium" clearable/>
            </el-form-item>
            <el-form-item>
              <GroupApiPermissions ref="groupPermissions" title="分配权限"
                                   @updatePermissions="updatePermissions"
                                   @updateAllPermissions="updateAllPermissions"
              />
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('form')">保 存</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import AdminModel from '@/models/admin'
import GroupApiPermissions from './GroupApiPermissions'

export default {
  components: {
    GroupApiPermissions,
  },
  data() {
    const checkName = (rule, value, callback) => {
        // eslint-disable-line
      if (!value) {
        return callback(new Error('分组名称不能为空'))
      }
      callback()
    }
    return {
      allPermissions: [], // 所有权限
      permissions: [], // 最终选择的权限
      form: {
        name: '',
        info: '',
      },
      rules: {
        name: [{ validator: checkName, trigger: ['blur', 'change'], required: true }],
        info: [],
      },
      loading: false,
    }
  },
  methods: {
    handleHide() {
      this.$emit('handleHide', false)
    },
    updatePermissions(permissions) {
      this.permissions = permissions
    },
    updateAllPermissions(allPermissions) {
      this.allPermissions = allPermissions
    },
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        // eslint-disable-line
        if (valid) {
          let res
          const finalPermissions = this.permissions.filter(x => Object.keys(this.allPermissions).indexOf(x) < 0)
          try {
            this.loading = true
            res = await AdminModel.createOneGroup(this.form.name, this.form.info, finalPermissions, this.id) // eslint-disable-line
          } catch (e) {
            this.loading = false
            console.log(e)
          }
          this.loading = false
          this.$message.success('新建分组成功!')
          this.$emit('handleHide', false)
          this.resetForm('form')
        } else {
          this.$message.error('请将信息填写完整')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
