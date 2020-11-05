<template>
  <div class="sidebar">
    <el-menu
      id="menu"
      :router="true"
      mode="horizontal"
      :default-active="defaultActive"
      @open="handleOpen"
      @close="handleClose">
      <template v-for="item in sidebarList">
        <!-- 一级菜单(不含二级菜单) -->
          <el-menu-item v-if="!canUnflod(item)" :key="item.name" :index="defaultRoute(item).path">
            <i :class="item.meta.icon"></i>
              <span slot="title">
                {{ item.meta.title }}
              </span>
          </el-menu-item>

        <!-- 一级菜单(含二级菜单) -->
        <el-submenu v-else :key="item.name" :index="item.path">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{ item.meta.title }}</span>
          </template>
          <!-- 二级菜单 -->
          <template v-for="(subItem) in item.children">


            <!-- 二级菜单有且只有一个三级菜单 -->
              <el-menu-item v-if="!canUnflod(subItem)" :key="subItem.name" :index="defaultRoute(subItem).path">
                <span>{{ subItem.meta.title }}</span>
              </el-menu-item>

            <!-- 二级菜单有多个三级菜单 -->
            <el-submenu v-else-if="subItem.children && subItem.children.length > 0" :key="subItem.name" :index="subItem.path">
              <template slot="title">
                <span>{{ subItem.meta.title }}</span>
              </template>
              <!-- 三级菜单 -->
                <el-menu-item v-for="(grandchildItem) in subItem.children" :key="grandchildItem.name" :index="grandchildItem.path">
                  <span>{{ grandchildItem.meta.title }}</span>
                </el-menu-item>
            </el-submenu>

            <!-- 二级菜单没有三级菜单 -->
              <el-menu-item v-else :key="subItem.name" :index="subItem.path">
                <span>{{ subItem.meta.title }}</span>
              </el-menu-item>


          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { flatten, cloneDeep } from 'lodash'
export default {
  name: 'SideBar',
  components: {},
  data() {
    return {
      sidebarList: this.$store.getters.sidebarList.concat([{
        path: '/',
        name: 'ellipsis',
        component: undefined,
        meta: {
          icon: 'fa fa-ellipsis-h',
        },
        children: []
      }])
    }
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
    defaultActive() {
      return this.$route.path
    },
  },
  created() { },
  mounted() {
    this.getOverflowedSubMenuItem()
    // window.onresize = () => {
    //   this.getOverflowedSubMenuItem()
    // }
  },
  methods: {
    getOverflowedSubMenuItem() {
      let menuList = cloneDeep(this.sidebarList)
      const ul = document.getElementById('menu')
      const width = ul.clientWidth
      const overflowedIndicatorWidth = ul.children[ul.children.length - 1].clientWidth
      let menuSizes = []
      for (let i = 0; i < ul.children.length; i += 1) {
        menuSizes.push(ul.children[i].clientWidth)
      }
      const originalTotalWidth = menuSizes.reduce((acc, cur) => acc + cur, 0)
      let lastVisibleIndex = -1
      let currentSumWidth = 0
      menuSizes.forEach(liWidth => {
        currentSumWidth += liWidth
        if (currentSumWidth + overflowedIndicatorWidth <= width) {
          lastVisibleIndex += 1
        }
      })
      for (let i = 0; i < menuList.length; i += 1) {
        if (i > lastVisibleIndex && i !== menuList.length - 1) {
          const item = cloneDeep(menuList[i])
          menuList[menuList.length - 1].children.push(item)
          menuList.splice(i, 1)
          i -= 1
        }
      }
      if (menuList[menuList.length - 1].children.length === 0) {
        menuList.splice(menuList.length - 1, 1)
      }
      this.sidebarList = cloneDeep(menuList)
    },
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
    a {
      display block
    }
  }
}
</style>

<!--<style lang="stylus" rel="stylesheet/stylus">-->
<!--  .sidebar {-->
<!--    .el-menu&#45;&#45;horizontal>.el-menu-item {-->
<!--    width: 145px-->
<!--    }-->
<!--  .el-menu&#45;&#45;horizontal>.el-submenu {-->
<!--    width: 145px-->
<!--  }-->
<!--  }-->
<!--</style>-->
