<template>
  <nav class="nav-path">
    <span v-for="(item) in navList" :key="item.name" class="item" :to="item.path">
      <span>{{item.title}}</span>
    </span>
  </nav>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Breadcrumb', // 面包屑(导航路径层次)
  components: {},
  data() {
    return {}
  },
  computed: {
    pageName() {
      return this.$route.name
    },
    navList() {
      let { matched } = this.$route // 包含当前路由的所有嵌套路径(祖先-->子孙)
      return matched.map(item => ({
        name: item.name,
        title: item.meta.title,
        path: item.redirect ? item.redirect : item.path,
      }))
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.nav-path {
  .item {
    &:not(:last-child) {
      span {
        color $light-blue
      }
      &::after {
        padding 0 8px // 「间隔符」居中
        content '/'
        font-weight bold
        cursor default
      }
    }
    &:last-child {
      cursor default
    }
  }
}
</style>
