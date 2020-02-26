<template>
  <div style="height:100%;">
    <el-container>
      <el-aside :width="sidebarWidth" class="aside">
        <SideBar />
      </el-aside>
      <div class="icon-font side-btn" :style="{left: sidebarWidth}" @click="toggleSlidebarState">
        <i class="el-icon-caret-left" :class="{rotate: foldState}"></i>
      </div>
      <el-container>
        <el-header class="header" :height="navbarHeight">
          <NavBar />
          <HistoryTag v-if="isVisible" />
        </el-header>
        <el-main class="main">
          <AppMain />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import HistoryTag from 'comps/base/HistoryTag'
import { AppMain, SideBar, NavBar } from './components'
import ResizeMixin from '../mixin/resize'
import config from '@/config'

export default {
  name: 'DefalutLayout',
  components: {
    AppMain,
    SideBar,
    NavBar,
    HistoryTag,
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters([
      'sidebar',
    ]),
    ...mapGetters({
      isVisible: 'app/historyTagState'
    }),
    foldState() {
      return this.sidebar.closed
    },
    // 左侧菜单栏是否折叠
    isCollapse() {
      return this.sidebar.closed
    },
    navbarHeight() {
      return this.isVisible ? '84px' : '52px'
    },
    // 左侧菜单栏展开的宽度
    sidebarWidth() {
      const { layout: { sidebar: { minWidth, maxWidth } } } = config
      return this.isCollapse === false ? maxWidth : minWidth
    },
  },
  mounted() { },
  methods: {
    toggleSlidebarState() {
      this.$store.commit('app/TOGGLE_SIDEBAR')
    },
  },
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.aside {
  border-right 1px solid black
  overflow-x hidden
  &::-webkit-scrollbar {
    width 0px
    height 0px
  }
}
.header {
  width 100%
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
