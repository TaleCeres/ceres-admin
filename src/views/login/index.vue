<template>
  <div class="login-wrapper">
    <div class="logo">
      <img src="../../assets/images/company/logo&name_h.png" alt="company_logo">
    </div>
    <div class="container">
      <input id="name" v-model="username" type="text" placeholder="用户名" @blur="_checkUsername" />
      <span class="msg">{{msgUsername}}</span>
      <input id="psd" v-model="password" type="password" placeholder="密 码" @change="_checkPassword" />
      <span class="msg">{{msgPassword}}</span>
      <button class="btn" @click="handleLogin">登 录</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'LoginIndex',
  components: {},
  data() {
    return {
      username: '999@qq.com',
      password: '123456',
      msgUsername: '',
      msgPassword: '',
    }
  },
  computed: {},
  watch: {
    username(newVal, oldVal) {
      this._checkUsername()
    },
    password(newVal, oldVal) {
      this._checkPassword()
    },
  },
  methods: {
    handleLogin() {
      this._checkUsername()
      this._checkPassword()
      if (!this.msgPassword && !this.msgUsername) {
        const account = this.username
        const secret = this.password
        const type = 100
        const loginInfo = {
          account,
          secret,
          type,
        }
        console.log('user', loginInfo)
        this.$store.dispatch('Login', loginInfo).then(() => {
          this.$router.push({ path: '/home' })
        }).catch(() => {
          console.log('catch')
        })
      } else {
        console.log('error submit!!!')
      }
    },
    _checkUsername() {
      // let partn = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/
      let partn = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      let name = document.getElementById('name').value
      if (this.username === '') this.msgUsername = '用户名不能为空'
      else if (!partn.exec(name)) this.msgUsername = '用户名以字母开头、可带数字、“_”、“.”的字串'
      else this.msgUsername = ''
    },
    _checkPassword() {
      let partn = /^(\w){6,20}$/
      let psd = document.getElementById('psd').value
      if (this.password === '') this.msgPassword = '密码不能为空'
      else if (!partn.exec(psd)) this.msgPassword = '密码只能输入6-20个字母、数字、下划线'
      else this.msgPassword = ''
    },
  },
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .login-wrapper{
    /*margin 15% auto*/
    /*width: 400px*/
    /*text-align center*/
    height: 100vh;
    background #ececec
    overflow hidden
    .logo{
      position fixed
      top 40px
      left 40px
      img{
        /*margin 0 auto*/
        width 215px
        height 53px
      }
    }
    .container{
      box-sizing: border-box
      margin 300px auto 100px
      width 400px
      padding 60px 10px 40px
      border-radius 10px
      box-shadow: 6px 6px 10px #bfbfbf;
      background: #fff;
      input, .btn{
        box-sizing border-box
        margin 10px 0
        width 197px
        height 35px
        line-height 35px
      }
      input{
        padding 0 10px
        border-radius 3px
        border 1px solid #999
      }
      .btn{
        margin-top 18px
        border none
        border-radius 5px
        cursor pointer
        font-size 16px
        /*font-weight bold*/
        color: #fff
        background #f67c4f
      }
      .msg{
        display block
        font-size 12px
        color #e02626
      }
    }
  }
</style>
