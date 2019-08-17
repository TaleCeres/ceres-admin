<template>
  <i :class="iconClass" class="icon"></i>
</template>

<script type="text/ecmascript-6">
/* 对 FontAwesome(矢量图标库)进行封装
 * 链接：http://fontawesome.dashgame.com/
 */
export default {
  name: 'FaIcon',
  props: {
    iconName: {
      type: String,
      default: '',
    },
  },
  computed: {
    iconClass() {
      return `fa fa-${this.iconName}`
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.icon {
  font-size 22px
  color $color-grey
  &:hover {
    color $color-black
  }
}
</style>
