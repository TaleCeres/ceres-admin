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
        <el-main>
          <AppMain />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
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
  data() {
    return {
      clientWidth: 0, // 页面宽度(body标签)
      clientHeight: 0, // 页面高度
    }
  },
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
  methods: {
    // 响应页面的宽度高度变化
    setResize() {
      this.clientHeight = document.body.clientHeight
      this.clientWidth = document.body.clientWidth
    },
  },
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.header
  display flex
  align-items center
  padding 0
  box-shadow 0px 2px 6px 0px rgba(190, 204, 216, 0.4)

.aside
  border 1px solid red
  overflow-x hidden
</style>
