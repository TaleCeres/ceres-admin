
<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script type="text/ecmascript-6">
import resize from '@/mixins/resize'
import option from './option'
import echarts from 'echarts'

export default {
  name: 'HeatMap',
  components: {},
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'colorMap'
    }
  },
  data() {
    return {
      chart: null,
      option,
    }
  },
  mounted() {}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
