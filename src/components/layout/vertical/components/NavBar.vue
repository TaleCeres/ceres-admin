<template>
  <nav class="nav-bar">
    <div class="left-menu">
      <router-link class="logo" to="/">
        <img class="icon" src="@/assets/images/company/logo-02.png" alt="">
      </router-link>
      <SideBar />
    </div>
    <div class="right-menu">
      <el-tooltip effect="dark" content="全屏显示" placement="bottom">
        <Screenfull style="margin-right: 15px;" />
      </el-tooltip>
      <LangSelect style="margin-right: 15px;" />
      <UserCard style="margin-right: 10px;" />
    </div>
  </nav>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import Screenfull from 'comps/base/Screenfull'
import UserCard from 'comps/base/UserCard'
import LangSelect from 'comps/base/LangSelect'
import SideBar from './SideBar'
export default {
  name: 'NavBar',
  components: {
    Screenfull,
    UserCard,
    SideBar,
    LangSelect
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'sidebar',
    ]),
    // 控制左侧菜单栏按键
    foldState() {
      return this.sidebar.closed
    },
  },
  created() { },
  mounted() { },
  methods: {
    // 控制菜单折叠
    toggleSlidebarState() {
      this.$store.commit('app/TOGGLE_SIDEBAR')
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.nav-bar
  width 100%
  display flex
  justify-content space-between
  align-items center

  .left-menu,
  .right-menu
    display flex
    align-items center

  .left-menu
    .icon-font
      margin 0 10px
      font-size 22px
      font-weight 500
      transform rotate(0deg)
      transition all 0.3s linear

      &:hover
        color #3963bc

    .rotate
      transform rotate(180deg)
      transition all 0.3s linear
  .logo {
    margin-left 20px
    display flex
    .icon {
      width 148px
      transition height 0, width 0.3s linear // all 0.3s linear
    }
  }
</style>
