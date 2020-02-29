<template>
  <div class="container">
    <div class="header">
      <div class="title">用户列表</div>
      <div>auth: {{ auth }}</div>
      <div>email: {{ email }}</div>
      <div>token: {{ token }}</div>
      <div>name: {{ name }}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import axios from 'axios'
// import UserModel from '@/models/user'
export default {
  name: 'UserList',
  components: {},
  data() {
    return {
      auth: 0,
      email: '@',
      token: 'pending',
      name: 'name'
    }
  },
  computed: {},
  created() {},
  async mounted() {
    // await axios.get('/mock/get_user_info').then(res => {
    //   console.log('mock', res)
    // })
    await this.$mockApi.inject(this, 'name').get('user')
    // await this.$mockApi.get('user').then(res => {
    //   console.log('mockApi', res)
    // })
    // UserModel.getToken()
    await this.$model.inject(this, 'token').user.getToken('777@qq.com', '123456')
    await this.$model.inject(this).user.getInfo()

    // 实现类似于七月的「参数校验层」的get(),更加的直观
    // 类似于 {auth: 'a.b.auth', email: 'a.c.email'}
    // 使用于对象，数组，单纯的...
  },
  methods: {},
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
