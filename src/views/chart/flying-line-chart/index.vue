<template>
  <div :id="id" style="height: 500px"></div>
</template>

<script type="text/ecmascript-6">
import resize from '@/mixins/resize'
import option from './option' // 引入配置项
import 'node_modules/echarts/map/js/china.js' // 引入中国地图数据
import 'node_modules/echarts/theme/shine' // 引入主题js文件

export default {
  name: 'ChinaMap',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'mapContainer'
    }
  },
  data() {
    return {
      chart: null,
      option,
      schoolList: [],
    }
  },
  mounted() {
    this.drawChart()
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
