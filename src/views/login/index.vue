<template>
  <div class="login">
    <div class="decorate">
      <img class="img-wave_1" src="./images/wave_1.png" alt="">
      <img class="img-student" src="./images/student.png" alt="">
      <img class="img-wave_2" src="./images/wave_2.png" alt="">
    </div>
    <div class="form-box">
      <div class="title">
        <h1 style="font-size: 50px">Hi,</h1>
        <h2 style="margin-top: 20px;">欢迎使用CSS布局系统</h2>
      </div>
      <form class="login-form" @submit.prevent="handleLogin">
        <input v-model="form.username" type="text" class="form-item" autocomplete="off" placeholder="请输入用户名">
        <input v-model="form.password" type="password" class="form-item" autocomplete="off" placeholder="请输入密码">
        <button type="submit" class="form-item submit-btn">立即登录</button>
      </form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import UserModel from '@/models/user'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'LoginIndex',
  components: {},
  data() {
    return {
      loading: false, // 加载动画
      form: {
        username: '999@qq.com',
        password: '123456',
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
        this.$router.push('/admin')
        // this.$message.success('登录成功')
      } catch (e) {
        this.loading = false
      }
    },
    async assignUserInfo() {
      const user = await UserModel.getInfo()
      this.setUser(user)
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.login {
  height 100%
  background linear-gradient(#6D9FFF, #1D82FF)
  .decorate {
    position relative
    .img-wave_1 {
      position absolute
      top 0
      left 0
      width 207px
      height 76px
    }
    .img-student {
      position fixed
      right 0
      bottom 13px
      width 650px
      height 520px
    }
    .img-wave_2 {
      position fixed
      right 0
      bottom 0
      width 280px
      height 132px
    }
  }
  .form-box {
    position fixed
    left 254px
    top 30%
    z-index 100
    color #FFFFFF
    .login-form {
      margin-top 54px
      .form-item {
        display block
        margin-top 30px
      }
      input {
        width 285px
        padding 0 0 5px 5px
        border-bottom 1px solid $color-white
        font-size 16px
        box-sizing border-box
        color $color-white
        background-color transparent
        &::-webkit-input-placeholder {
          color rgba(192, 216, 255, 1)
        }
        &:-webkit-autofill {
          // 通过延长增加自动填充背景色的方式, 是用户感受不到样式的变化
          -webkit-transition-delay 99999s
          -webkit-transition color 99999s ease-out, background-color 99999s ease-out
        }
      }
      .submit-btn {
        width 108px
        height 30px
        line-height 30px
        text-align center
        border 1px solid $color-white
        border-radius 2px
        color $color-white
        background-color transparent
        cursor pointer
      }
    }
  }
}
</style>
