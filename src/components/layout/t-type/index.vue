<template>
  <div style="height:100%;">
    <el-container>
      <el-header class="header">
        <NavBar />
      </el-header>
      <el-container>
        <el-aside :width="sidebarWidth" class="aside">
          <SideBar />
        </el-aside>
        <div class="icon-font side-btn" :style="{left: sidebarWidth}" @click="toggleSlidebarState">
          <i class="el-icon-caret-left" :class="{rotate: foldState}"></i>
        </div>
        <el-main class="main">
          <AppMain />
          <HistoryTag/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import HistoryTag from 'comps/base/HistoryTag'
import ResizeMixin from '../mixin/resize'
import { AppMain, SideBar, NavBar } from './components'
export default {
  name: 'TTypeLayout',
  components: {
    AppMain,
    SideBar,
    NavBar,
    HistoryTag
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters([
      'sidebar',
    ]),
    foldState() {
      return this.sidebar.closed
    },
    // 左侧菜单栏是否折叠
    isCollapse() {
      return this.sidebar.closed
    },
    // 左侧菜单栏展开的宽度
    sidebarWidth() {
      return this.isCollapse === false ? '170px' : '64px'
    },
  },
  mounted() {
  },
  methods: {
    toggleSlidebarState() {
      this.$store.commit('app/TOGGLE_SIDEBAR')
    },
  },
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.aside {
  border 1px solid red
  overflow-x hidden
  position relative
  &::-webkit-scrollbar {
    width 0px
    height 0px
  }
}
.header {
  display flex
  align-items center
  padding 0
  box-shadow 0px 2px 6px 0px rgba(190, 204, 216, 0.4)
}
.side-btn {
  position absolute
  top 150px
  background-color #eaeaea
  padding 12px 0
  border-top-right-radius 7px
  border-bottom-right-radius 7px
  cursor pointer
  z-index 100
}
.icon-font {
  font-size 15px
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
.main {
  margin 2px 0 0 2px // 避免过于紧凑
}
</style>
