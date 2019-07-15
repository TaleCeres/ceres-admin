<template>
  <div :id="id" class="pie-wrapper"></div>
</template>

<script>
  import echarts from 'echarts'
  import { debounce } from '../../../utils/self-adaption'

  export default {
    name: 'pieChartWithTable',
    props: {
      id: {
        type: String,
        default: 'pieChartWithTable',
      },
      width: {
        type: String,
        default: '100%',
      },
      data: Array,
      float: {
        type: String,
        default: 'none',
      },
    },
    data() {
      return {
        chart: null,
      }
    },
    computed: {
      option() {
        return {
          title: {
            text: '某站点用户访问来源',
            x: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1548, name: '搜索引擎' },
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        }
      },
    },
    mounted() {
      this.drawChart()
      // 监听窗口的变化
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
      drawChart() {
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
  .pie-wrapper
    height 500px
</style>
