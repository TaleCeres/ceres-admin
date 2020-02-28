<template>
  <div class="container">
    <div class="header">
      <div class="title">更新项目</div>
      <div class="back" @click="hanleHide">
        <fa-icon icon-name="undo" />
        返回
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'ProjectEdit',
  components: {},
  data() {
    return {}
  },
  computed: {},
  created() { },
  mounted() { },
  methods: {
    hanleHide() {
      this.$emit('hanleHide', false)
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.container {
  .header {
    display flex
    justify-content space-between
    align-items center
    .title {
      height 59px
      line-height 59px
      font-size 16px
      font-weight 500
    }
    .back {
      margin-right 40px
      cursor pointer
    }
  }
}
</style>
