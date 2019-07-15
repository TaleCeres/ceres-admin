<template>
  <div class="panel-wrapper">
    <div class="panel">
      <slot />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'panel',
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .panel-wrapper
    padding-bottom 15px
    /*padding 10px 5px 15px*/
    box-sizing border-box
    height: 50%
    .panel
      padding 5px
      height: 100%
      min-height 170px
      /*color: #fff*/
      background url("../../assets/images/panel.png") center no-repeat
      background-size 100% 100%
      overflow auto
</style>
