<template>
  <div class="login" :style="'background-image:url('+ Background +');'">
    <el-form
      ref="loginForm"
      :model="form"
      :rules="loginRules"
      label-position="left"
      label-width="0px"
      class="login-form">
      <h3 class="title">
        Ceres-Admin
      </h3>
      <el-form-item prop="username">
        <el-input v-model="form.username" type="text" auto-complete="off" placeholder="用户名">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="isPassing">
        <drag-verify
          ref="dragVerify"
          :width="320"
          :is-passing.sync="form.isPassing"
          text="请按住滑块拖动"
          success-text="验证通过"
          handler-icon="el-icon-d-arrow-right"
          success-icon="el-icon-circle-check"
        >
        </drag-verify>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button :loading="loading"
                   size="medium"
                   type="primary"
                   style="width:100%"
                   @click.native.prevent="handleLogin">
          <span v-if="!loading">安 全 登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
      <el-form-item class="guest">
          <el-button :loading="loading" size="medium" type="text" @click.native.prevent="handleGuestLogin">
            <span v-if="!loading">访 客 登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import UserModel from '@/models/user'
import { mapState, mapActions } from 'vuex'
import Background from './images/背景.png'
import FormBackground from './images/登陆框.png'
import DragVerify from '@/components/base/DragVerify'
export default {
  name: 'LoginIndex',
  components: {
    DragVerify
  },
  data() {
    return {
      FormBackground,
      Background,
      loading: false, // 加载动画
      form: {
        username: '999@qq.com',
        password: '123456',
        isPassing: false,
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        isPassing: [
          { validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error('拖动滑块验证'))
            }
            callback()
          },
          trigger: 'blur' }
        ]
      },
    }
  },
  computed: {
    ...mapState({
      logined: state => state.user.logined,
    }),
  },
  methods: {
    ...mapActions({
      setUser: 'user/setUser',
    }),
    async handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          const { username: account, password: secret } = this.form
          this.loading = true
          try {
            await UserModel.getToken(account, secret)
            await this.assignUserInfo()
            this.loading = false
            this.$router.push('/')
            // this.$message.success('登录成功')
          } catch (e) {
            this.loading = false
          }
        } else {
          return false
        }
      })
    },
    async assignUserInfo() {
      const user = await UserModel.getInfo()
      this.setUser(user)
    },
    async handleGuestLogin() {
      this.handleLogin()
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-size: cover;
    background-position center
  }
  .title {
    margin: 0 auto 30px auto;
    text-align: center;
    color: #fff;
  }
  .login-form {
    border-radius: 6px;
    width 320px
    height: 320px;
    padding: 80px 120px 50px 120px;
    background-image url("./images/登陆框.png")
    background-size 100% 100%
    .el-input {
      height: 38px;
      input {
        padding-left 42px
        height: 38px;
        background-color #1171B4
        border 1px #0092FE solid
        color #fff
      }
    }
    .input-icon{
      color #8ECCFF
      height: 39px;
      width: 14px;
      margin-left: 12px;
    }
    .guest {
      width:100%
      text-align right
      .el-button--primary {
        background-color #707070
        border-color #707070
      }
    }
  .el-button--primary {
    background-color #46B0E2
    span {
      font-weight bold
      font-size 18px
    }
  }
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 33%;
    display: inline-block;
    height: 38px;
    float: right;
    img{
      cursor: pointer;
      vertical-align:middle
    }
  }
</style>
