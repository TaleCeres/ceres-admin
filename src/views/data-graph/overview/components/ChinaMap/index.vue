<template>
  <div class="map">
    <div :id="id" style="height: 95%"></div>
    <div class="detail-wrapper">
      <table border="1" :data="schoolList">
        <tr>
          <th>序号</th>
          <th>院校名称</th>
        </tr>
        <tr v-for="(item, index) in schoolList" :key="index">
          <template v-if="index < 10">
            <td>{{index + 1}}</td>
            <td>{{item.name}}</td>
          </template>
        </tr>
      </table>
    </div>
  </div>
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
}
</script>

<style lang="stylus" scoped>
.map {
  position relative
  height 100%
  .detail-wrapper {
    position absolute
    top 10px
    right 0
    width 180px
    table {
      box-sizing border-box
      width 100%
    }
  }
}
</style>
