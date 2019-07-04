<template>
  <div class="sidebar">
    <div v-if="!isCollapse" class="name">
      <img src="../../../../assets/images/company/name.png" alt="">
    </div>
    <div v-else class="logo">
      <img src="../../../../assets/images/company/logo.png" alt="">
    </div>
    <el-menu default-active="2" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
      <template v-for="item in routes">

        <!-- 一级菜单(含二级菜单) -->
        <el-submenu v-if="item.children" :key="item.name" :index="item.name">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{ item.name }}</span>
          </template>
          <router-link v-for="(subItem) in item.children" :key="subItem.name" class="icon-menu" :to="subItem.path">
            <el-menu-item :index="subItem.name" style="padding-left: 60px;">
              {{ subItem.name }}
            </el-menu-item>
          </router-link>
          <!-- 二级菜单 -->
        </el-submenu>

        <!-- 一级菜单(不含二级菜单) -->
        <router-link v-else :key="item.name" :to="item.path">
          <el-menu-item :index="item.name">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </router-link>

      </template>
    </el-menu>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { flatten } from 'lodash'
export default {
  name: 'SideBar',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'sidebar',
    ]),
    routes() {
      let { routes } = this.$router.options
      let sidebarList = routes.filter(item => item.hidden !== true).map(item => item.children)
      return flatten(sidebarList)
    },
    isCollapse() {
      return this.sidebar.closed
    },
  },
  created() { },
  mounted() {
    // this.__testRouterAttrs()
  },
  methods: {
    handleOpen(key, keyPath) {
      // 打开&关闭 el-menu
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    },
    _testRouterAttrs() {
      console.log('$router:', this.$router)
      console.log('所有路由(含嵌套子路由):', this.$router.options.routes)
      console.log('$route:', this.$route)
      console.log('当前页面的name:', this.$route.name)
    },
  },
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.sidebar
  .name
    width 100%
    height $header-height
    display flex
    justify-content center
    align-items center

    img
      width 148px
      transition height 0, width 0.3s linear // all 0.3s linear

  .logo
    display flex
    justify-content center
    align-items center

    img
      width 40px
      transition height 0, width 0.3s linear
</style>
