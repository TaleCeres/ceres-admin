<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script type="text/ecmascript-6">
import resize from '@/mixins/resize'
import option from './option'

export default {
  name: 'TopCity',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'topCity'
    }
  },
  data() {
    return {
      chart: null,
      option,
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
