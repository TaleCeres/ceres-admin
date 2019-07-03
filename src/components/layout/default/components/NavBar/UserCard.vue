<template>
  <div class="user-card">
    <el-dropdown>
      <span class="el-dropdown-link">
        <img class="avatar" :src="defaultAvatar" alt="头像">
      </span>
      <el-dropdown-menu class="detail" slot="dropdown">
        <div style="height: 100px; border: 1px solid red"></div>
        <p>退出登录</p>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script type="text/ecmascript-6">
import defaultAvatar from 'assets/images/company/logo.png'
export default {
  name: 'UserCard',
  components: {},
  data() {
    return {
      defaultAvatar,
    }
  },
  computed: {},
  created() { },
  mounted() {
  },
  methods: {},
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.user-card
  .el-dropdown-link
    .avatar
      width 37px
      height 37px
      border-radius 50%

  .detail
    width 326px
    margin-bottom 0
    padding-bottom 0
    border 1px solid blue
</style>
