<template>
  <div>
    <div class="container">
      <div v-if="title" class="title">{{title}}</div>
      <slot />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'GraphContainer',
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {},
  created() { },
  mounted() { },
  methods: {},
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.container {
  position relative
  background url('./panel.png') center no-repeat
  background-size 100% 100%
  overflow hidden
  height 100%
  color $color-white
  .title {
    position relative
    top 10px
    left 15px
    height 40px
    line-height 40px
    font-size 20px
  }
}
</style>
