<template>
  <div class="sidebar">
    <el-menu style="margin-bottom:50px" :default-active="defaultActive" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
      <template v-for="item in sidebarList">
        <!-- 一级菜单(不含二级菜单) -->
        <router-link v-if="!canUnflod(item)" :key="item.name" :to="defaultRoute(item).path">
          <el-menu-item :index="defaultRoute(item).name">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
        </router-link>

        <!-- 一级菜单(含二级菜单) -->
        <el-submenu v-else :key="item.name" :index="item.name">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{ item.meta.title }}</span>
          </template>
          <!-- 二级菜单 -->
          <template v-for="(subItem) in item.children">


            <!-- 二级菜单有且只有一个三级菜单 -->
            <router-link v-if="!canUnflod(subItem)" :key="subItem.name" class="icon-menu" :to="defaultRoute(subItem).path">
              <el-menu-item :index="defaultRoute(subItem).name">
                <span>{{ subItem.meta.title }}</span>
              </el-menu-item>
            </router-link>

            <!-- 二级菜单有多个三级菜单 -->
            <el-submenu v-else-if="subItem.children && subItem.children.length > 0" :key="subItem.name" :index="subItem.name">
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

            <!-- 二级菜单没有三级菜单 -->
            <router-link v-else :key="subItem.name" class="icon-menu" :to="subItem.path">
              <el-menu-item :index="subItem.name">
                <span>{{ subItem.meta.title }}</span>
              </el-menu-item>
            </router-link>


          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState, mapGetters } from 'vuex'
import { flatten } from 'lodash'
export default {
  name: 'SideBar',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState({
      authList: state => state.user.authList,
    }),
    ...mapGetters([
      'sidebar',
      'sidebarList'
    ]),
    ...mapGetters({
      logoVisible: 'app/logoState'
    }),
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
    defaultRoute(route) {
      return route.children[0]
    },
    canUnflod(route) {
      if (route.children && route.children.length === 1 && !route.children.children) return false
      return true
    },
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
