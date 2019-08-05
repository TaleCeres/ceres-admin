<template>
  <div style="height:100%;">
    <el-container>
      <el-aside :width="sidebarWidth" class="aside">
        <SideBar />
      </el-aside>
      <el-container>
        <el-header class="header">
          <NavBar />
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
import ResizeMixin from './mixin/resize'
import AppMain from './components/AppMain'
import SideBar from './components/SideBar'
import NavBar from './components/NavBar/index'

export default {
  name: 'DefalutLayout',
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
    // 左侧菜单栏是否折叠
    isCollapse() {
      return this.sidebar.closed
    },
    // 左侧菜单栏展开的宽度
    sidebarWidth() {
      return this.isCollapse === false ? '170px' : '64px'
    },
  },
  mounted() { },
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.aside {
  border 1px solid red
  overflow-x hidden
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
.main {
  margin: 2px 0 0 2px // 避免过于紧凑
}
</style>
