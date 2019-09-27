<template>
  <div :id="id" style="height: 95%"></div>
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
    this.chart.on('click', 'series', data => {
      let { seriesIndex: geoLevel, name: province, dataIndex } = data
      if (geoLevel === 0) {
        let newRouter = this.$router.resolve({
          path: '/data-graph/college-list',
          query: {
            province
          }
        })
        window.open(newRouter.href, '_blank')
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
