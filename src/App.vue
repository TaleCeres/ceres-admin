<template>
  <div id="app">
    <router-view :key="key"/>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'AppMain',
  data() {
    return {
    }
  },
  computed: {
    key() {
      // 只要保证 key 唯一性就可以了，保证不同页面的 key 不相同
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#app {
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align left
  color #2c3e50
  overflow-x hidden
}
</style>
