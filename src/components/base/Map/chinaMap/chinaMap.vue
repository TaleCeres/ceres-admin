<template>
  <div class="china-map-wrapper">
    <div :id="id" class="china-map"></div>
    <div class="detail-wrapper">
      <table border="1" :data="schoolList">
        <tr>
          <th>序号</th>
          <th>院校名称</th>
        </tr>
        <tr v-for="(item, index) in schoolList" :key="index">
          <td  v-if="index < 10">{{index + 1}}</td>
          <td  v-if="index < 10">{{item.name}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import echarts from 'echarts'
  import * as mapApi from '@/api/chart'
  import option from './option' // 引入配置项
  import { debounce } from '../../../../utils/self-adaption'
  import '../../../../../node_modules/echarts/map/js/china' // 引入中国地图数据
  import '../../../../../node_modules/echarts/theme/roma' // 引入主题js文件

  export default {
    name: 'chinaMap',
    props: {
      id: {
        type: String,
        default: 'chinaMap',
      },
    },
    data() {
      return {
        chart: null,
        showDetail: false,
        schoolList: [],
      }
    },
    created() {
      mapApi.getCityList().then(res => {
        console.log(res)
      })
    },
    mounted() {
      this.initChart()
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    },
    beforeDestroy() {
      this.destroyChart()
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id), 'roma')
        this.chart.setOption(option)
        // 防止重复触发点击事件
        if (this.chart._$handlers.click) {
          this.chart._$handlers.click.length = 0
        }
        // chart click event
        this.chart.on('click', param => {
          mapApi.getSchoolList(param.name).then(res => {
            this.schoolList = res.data.data
          })
        })
      },
      destroyChart() {
        if (!this.chart) {
          return
        }
        window.removeEventListener('resize', this.__resizeHanlder)
        this.chart.dispose()
        this.chart = null
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .china-map-wrapper
    position relative
    .china-map
      height 866px
    .detail-wrapper
      position absolute
      top 40px
      right 2px
      width 180px
      table
        box-sizing border-box
        width 100%
</style>
