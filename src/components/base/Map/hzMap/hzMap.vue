<template>
  <div :id="id" class="hz-map"></div>
</template>

<script type="text/ecmascript-6">
  import echarts from 'echarts'
  import axios from 'axios'
  import { debounce } from '../../../../utils/self-adaption'
  let dotList = require('./hangzhou')
  export default {
    name: 'hzMap',
    props: {
      id: {
        type: String,
        default: 'hzMap',
      },
    },
    data() {
      return {
        chart: null,
        option: {
          geo: {
            roam: false,
            map: 'hangzhou',
            geoIndex: 0,
            aspectScale: 0.85,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#05C3F9',
                },
              },
            },
            itemStyle: {
              normal: {
                areaColor: 'rgba(63, 218, 255, 0.1)',
                borderColor: 'rgba(63, 218, 255, 0.8)',
                borderWidth: 2,
                shadowColor: 'rgba(63, 218, 255, 0.5)',
                shadowBlur: 30,
              },
              emphasis: {
                areaColor: '#2B91B7',
              },
            },
          },
          series: [
            {
              name: '事件', // series名称
              type: 'effectScatter', // series图表类型
              coordinateSystem: 'geo', // series坐标系类型
              data: [
                { name: '机场', value: [120.55, 30.20, 9] },
                { name: '电场', value: [120.25, 30.07, 8] },
                { name: '学校', value: [120.45, 30.35, 81] },
                { name: '医院', value: [119.16, 30.11, 37] },
                { name: '学校', value: [119.5, 30.33, 20] },
                { name: '电场', value: [118.63, 29.5, 14] },
                { name: '交通', value: [119.1, 30.15, 92] },
                { name: '交通', value: [118.87, 29.77, 35] },
                { name: '学校', value: [119.5, 29.66, 20] },
                { name: '水利', value: [119.1, 29.35, 14] },
                { name: '电场', value: [119.63, 29.88, 52] },
                { name: '交通', value: [119.5, 29.78, 92] },
                { name: '医院', value: [119.7, 30.05, 37] },
                { name: '学校', value: [119.9, 30.01, 20] },
                { name: '电场', value: [120.01, 30.34, 14] },
                { name: '交通', value: [120.05, 30.20, 92] },
                { name: '医院', value: [120.20, 30.43, 37] },
                { name: '学校', value: [120.30, 30.30, 44] },
                { name: '电场', value: [120.17, 30.34, 14] },
                { name: '交通', value: [120.16, 30.17, 92] },
              ],
              tooltip: {
                formatter(params) {
                  return `${params.name}:${params.value[2]}`
                },
              },
              symbolSize: 10,
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke',
                scale: 4,
              },
              itemStyle: {
                normal: {
                  color(params) {
                    if (params.value[2] < 30) {
                      return 'green'
                    } if (params.value[2] >= 30 && params.value[2] <= 80) {
                      return 'yellow'
                    }
                    return 'red'
                  },
                },
              },
            },
          ],
        },
      }
    },
    mounted() {
      this.initChart()
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      })
      window.addEventListener('resize', this.__resizeHanlder)
    },
    beforeDestroy() {
      this.destroyChart()
    },
    methods: {
      initChart() {
        echarts.registerMap('hangzhou', dotList)
        this.chart = echarts.init(document.getElementById(this.id))
        this.chart.setOption(this.option)
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
  .hz-map
    height 400px
</style>
