<template>
  <div class="wrapper">
    <header :title="title">
      <el-row>
        <el-col :span="10"><span>{{title}}</span></el-col>
        <el-col :span="14">
          <slot name="countLabel"></slot>
        </el-col>
      </el-row>
    </header>
    <main>
      <slot name="ChartOne"></slot>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'chartTitleLeft',
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
      padding-left 10px
      margin-bottom 15px
      height 1.5vw
      line-height 1.5vw
      border-left 8px solid  #9eb2dc
      span
        font-size: 1vw
        font-weight 600
</style>
