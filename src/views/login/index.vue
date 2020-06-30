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
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;margin-top: 15px" @click.native.prevent="handleLogin">
          <span v-if="!loading">安 全 登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
      <el-form-item class="guest">
        <el-button :loading="loading" size="medium" type="primary" style="width:100%" @click.native.prevent="handleGuestLogin">
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
export default {
  name: 'LoginIndex',
  components: {},
  data() {
    return {
      FormBackground,
      Background,
      loading: false, // 加载动画
      form: {
        username: '999@qq.com',
        password: '123456',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
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
