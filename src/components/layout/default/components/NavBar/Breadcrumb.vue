<template>
  <nav class="nav-path">
    <a class="item" v-for="(item, index) in navList" :key="index">
      <span>{{item}}</span>
    </a>
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
      return ['首页', '第二页', this.$route.name]
    },

  },
  created() { },
  mounted() { },
  methods: {},
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.nav-path
  .item
    &:not(:last-child)
      span
        color $light-blue

      &::after
        padding 0 8px // 「间隔符」居中
        content '/'
        font-weight bold
        cursor default

    &:last-child
      cursor default
</style>
