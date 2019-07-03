<template>
  <section class="container">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'BlankLayout',
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.container
  width 100%
  height 100%
  text-align left
</style>
