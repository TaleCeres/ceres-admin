<template>
  <div class="wrapper">
    <header>
      <el-row>
        <el-col><span>{{title}}</span></el-col>
      </el-row>
    </header>
    <main>
      <slot name="ChartOne"></slot>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'chartTitleRight',
    props: {
      title: {
        type: String,
        default: 'unknown',
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    position relative
    header
      padding-right 10px
      margin-bottom 15px
      text-align right
      height  1.5vw
      line-height  1.5vw
      border-right 8px solid  #9eb2dc
      span
        font-size 1vw
        font-weight 600
</style>
