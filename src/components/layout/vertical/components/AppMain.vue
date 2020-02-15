<template>
  <section class="container">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <LayoutSetting />
  </section>
</template>

<script type="text/ecmascript-6">
import LayoutSetting from 'comps/base/LayoutSetting'
export default {
  name: 'AppMain',
  components: {
    LayoutSetting
  },
  data() {
    return {
      drawer: true
    }
  },
  computed: {

  },
  methods: {},
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.container {
  width 100%
  height 100%
  text-align left
}
</style>
