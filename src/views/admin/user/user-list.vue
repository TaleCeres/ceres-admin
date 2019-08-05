<template>
  <div class="container">
    <div class="header">
      <div class="title">用户列表</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import user from '@/models/user'
export default {
  name: 'UserList',
  components: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {
    axios.get('/mock/get_user_info').then(res => {
      console.log('res', res)
    })
    user.getToken()
  },
  methods: {},
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
