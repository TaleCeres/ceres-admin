<template>
  <el-drawer :visible.sync="drawerState" direction="rtl" size="260px" :before-close="closeDrawer">
    <h3 slot="title">布局配置</h3>
    <div class="drawer-container">
      <div class="drawer-item">
        <span>开启 History-Tag</span>
        <el-switch :value="historyTagState" class="drawer-switch" @change="togglehistoryTag" />
      </div>
      <div class="drawer-item">
        <span>显示 Logo</span>
        <el-switch :value="logoState" class="drawer-switch" @change="toggleLogo" />
      </div>
      <div class="drawer-item" style="position: relative">
        <span>切换 Layout</span>
        <el-select v-model="layoutMode" placeholder="切换布局" style="position: absolut; left: 40px;">
          <el-option v-for="item in layoutOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
  </el-drawer>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'LayoutSetting',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      drawerState: 'app/drawerState',
      logoState: 'app/logoState',
      historyTagState: 'app/historyTagState',
      layoutOptions: 'app/layoutOptions'
    }),
    layoutMode: {
      get() {
        // - 方式 1
        return this.$store.getters['app/layoutMode'] 
        // - 方式 2
        // const { ['app/layoutMode']: val } = this.$store.getters
        // return val
      },
      set(val) {
        this.$store.commit('app/SET_LAYOUT_MODE', val)
      }
    },
  },
  created() { },
  mounted() { },
  methods: {
    // 控制布局配置的显示
    ...mapMutations({
      toggleSlidebar: 'app/TOGGLE_DRAWER',
      toggleLogo: 'app/TOGGLE_LOGO',
      closeDrawer: 'app/CLOSE_DRAWER',
      togglehistoryTag: 'app/TOGGLE_HISTORY_TAG',
    }),
    // 替代
    // toggleSlidebar() {
    //   this.$store.commit('app/TOGGLE_DRAWER')
    // },

  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.drawer-container {
  margin 0 20px
  .drawer-item {
    margin 10px 0
    padding-top 10px
    height 30px
    &:first-child {
      margin-top 0
      padding-top 0
    }
    &:last-child {
      padding-top 0
    }
    .drawer-switch {
      float right
    }
  }
}
.el-select {
  >>> .el-input {
    width 96px
    .el-input__inner {
      padding-left 5px
      // height 26px // 修改select的高度
    }
  }
}
</style>
