<template>
  <div class="sidebar">
    <div class="name" v-if="!isCollapse">
      <img src="../../../../assets/images/company/name.png" alt="">
    </div>
    <div class="logo" v-else>
      <img src="../../../../assets/images/company/logo.png" alt="">
    </div>
    <el-menu default-active="2" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <template v-for="item in routes">

        <!-- 一级菜单(含二级菜单) -->
        <el-submenu v-if="item.children" :index="item.name" :key="item.name">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{ item.name }}</span>
          </template>
          <router-link class="icon-menu" v-for="(subItem) in item.children" :to="subItem.path" :key="subItem.name">
            <el-menu-item :index="subItem.name" style="padding-left: 60px;">
              {{ subItem.name }}
            </el-menu-item>
          </router-link>
          <!-- 二级菜单 -->
        </el-submenu>

          <!-- 一级菜单(不含二级菜单) -->
          <router-link v-else :to="item.path" :key="item.name">
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
      console.log('sidebarList', sidebarList)
      return flatten(sidebarList)
    },
    isCollapse() {
      return this.sidebar.closed
    },
  },
  created() { },
  mounted() {
    console.log('所有路由(含嵌套子路由):', this.$router.options.routes)
    console.log('当前页面的路由(route)信息:', this.$route)
    console.log('当前页面的name:', this.$route.name)
  },
  methods: {
    handleOpen(key, keyPath) {
      // 打开&关闭 el-menu
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    },
  },
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.sidebar
  .name
    width $sidebar-width
    height $header-height
    display flex
    justify-content center
    align-items center

    img
      width 90%
      transition all 0.3s linear

  .logo
    display flex
    justify-content center
    align-items center

    img
      width 50%
      transition all 0.3s linear
</style>
