<template>
  <nav class="nav-bar">
    <div class="left-menu">
      <i v-show="true" class="icon-font el-icon-s-fold" :class="{rotate: foldState}" @click="toggleSlidebarState" />
      <Breadcrumb />
    </div>
    <div class="right-menu">
      <el-tooltip effect="dark" content="数据大屏" placement="bottom">
        <router-link to="/data-graph/overview">
          <fa-icon icon-name="area-chart" style="margin-right: 15px;" />
        </router-link>
      </el-tooltip>
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
import UserCard from 'comps/base/UserCard'
import Breadcrumb from 'comps/base/Breadcrumb'
import LangSelect from 'comps/base/LangSelect'
import Screenfull from 'comps/base/Screenfull'
export default {
  name: 'NavBar',
  components: {
    UserCard,
    Breadcrumb,
    LangSelect,
    Screenfull,

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
.nav-bar {
  width 100%
  display flex
  justify-content space-between
  align-items center
  .left-menu,
  .right-menu {
    display flex
    align-items center
  }
  .left-menu {
    .icon-font {
      margin 0 10px
      font-size 22px
      font-weight 500
      transform rotate(0deg)
      transition all 0.3s linear
      &:hover {
        color #3963bc
      }
    }
    .rotate {
      transform rotate(180deg)
      transition all 0.3s linear
    }
  }
}
</style>
