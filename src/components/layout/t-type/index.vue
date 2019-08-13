<template>
  <div style="height:100%;">
    <el-container>
      <el-header class="header">
        <NavBar />
      </el-header>
      <el-container>
        <el-aside :width="sidebarWidth" class="aside">
          <i v-show="true" class="icon-font el-icon-s-fold do-slide" :class="{rotate: foldState}" @click="toggleSlidebarState" />
          <SideBar />
        </el-aside>
        <el-main class="main">
          <AppMain />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import ResizeMixin from '../mixin/resize'
import AppMain from './components/AppMain'
import SideBar from './components/SideBar'
import NavBar from './components/NavBar'
export default {
  name: 'TTypeLayout',
  components: {
    AppMain,
    SideBar,
    NavBar,
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
.do-slide {
  position absolute
  bottom 100px
  right 20px
}
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
.main {
  margin 2px 0 0 2px // 避免过于紧凑
}
</style>
