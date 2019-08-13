<template>
  <div class="sidebar">
    <el-menu style="margin-bottom:50px" :default-active="defaultActive" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
      <template v-for="item in routes">
        <!-- 一级菜单(含二级菜单) -->
        <el-submenu v-if="item.children" :key="item.name" :index="item.name">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{ item.meta.title }}</span>
          </template>
          <!-- 二级菜单 -->
          <template v-for="(subItem) in item.children">
            <el-submenu v-if="subItem.children" :key="subItem.name" :index="subItem.name">
              <template slot="title">
                <i :class="subItem.meta.icon"></i>
                <span>{{ subItem.meta.title }}</span>
              </template>
              <!-- 三级菜单 -->
              <router-link v-for="(grandchildItem) in subItem.children" :key="grandchildItem.name" class="icon-menu" :to="grandchildItem.path">
                <el-menu-item :index="grandchildItem.name">
                  <span>{{ grandchildItem.meta.title }}</span>
                </el-menu-item>
              </router-link>
            </el-submenu>

            <!-- 二级菜单else -->
            <router-link v-else :key="subItem.name" class="icon-menu" :to="subItem.path">
              <el-menu-item :index="subItem.name">
                <span>{{ subItem.meta.title }}</span>
              </el-menu-item>
            </router-link>
          </template>
        </el-submenu>
        <!-- 一级菜单(不含二级菜单) -->
        <router-link v-else :key="item.name" :to="item.path">
          <el-menu-item :index="item.name">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
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
      let sidebarList = routes.filter(item => item.hidden !== true)
      return flatten(sidebarList)
    },
    isCollapse() {
      return this.sidebar.closed
    },
    defaultActive() {
      return this.$route.name
    },
  },
  created() { },
  mounted() {
    // this._testRouterAttrs()
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
.sidebar {
  .logo {
    position sticky
    top 0
    left 0
    z-index 99
    height $header-height
    display flex
    justify-content center
    align-items center
    background-color #fff
    .name {
      width 148px
      transition height 0, width 0.3s linear // all 0.3s linear
    }
    .brand {
      width 40px
      transition height 0, width 0.3s linear
    }
  }
}
</style>
