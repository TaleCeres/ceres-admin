<template>
  <div class="gauge" :ref="id"></div>
</template>

<script>
  import echarts from 'echarts'
  import { debounce } from '../../../utils/self-adaption'
  import * as apiChart from '@/api/chart'

  export default {
    name: 'LogProRate',
    props: {
      id: {
        type: String,
        default: 'chart'
      },
    },
    data() {
      return {
        timer2: null,
        chart: null,
        logRate: '',
        maxRate: '',
        timer: null
      }
    },
    computed: {
      option() {
        return {
          backgroundColor: '#050505',
          series: [
            {
              name: 'Log Rate(MP5)',
              type: 'gauge',
              min: '',
              max: '',
              startAngle: 210,
              endAngle: -30,
              center: ['50%', '55%'], // 默认全局居中
              radius: 120,
              splitNumber: 1, // 分割段数，默认为10
              axisLine: {// 坐标轴线
                show: true,
                lineStyle: { // 属性lineStyle控制线条样式
                  width: 45,
                  color: [
                    [],
                    [1, '#0b0b0d']
                  ]
                }
              },
              axisLabel: {// 刻度标签
                show: true,
                distance: -18,
                color: '#fff',
                fontSize: 12
              },
              axisTick: {// 坐标轴刻度
                show: false
              },
              splitLine: { // 分隔线
                show: false
              },
              pointer: {
                show: false
              },
              title: {
                show: true,
                offsetCenter: [0, 40],
                textStyle: {
                  color: '#fff',
                  fontSize: 12
                }
              },
              // 数据展示
              detail: {
                show: true,
                backgroundColor: 'rgba(0,0,0,0)',
                color: '#9DEEFF',
                width: 100,
                height: 40,
                offsetCenter: [0, -15],
                formatter: '{value}',
                textStyle: {
                  fontSize: 50,
                  textShadowColor: '#8CDCF5',
                  textShadowBlur: 10
                }
              },
              data: [{ value: '', name: '速率/分钟' }]
            }
          ]
        }
      }
    },
    created() {
      this.getData()
      this.timer = setInterval(() => {
        this.getData()
      }, 50000)
    },
    mounted() {
      // 基于选择的dom,进行初始化echarts
      this.chart = echarts.init(this.$refs[this.id])
      // 监听窗口的变化
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    },
    watch: {
      logRate(newVal, oldVal) {
        if (!oldVal) oldVal = this.minRate
        this.numberGrow(newVal, oldVal)
      }
    },
    methods: {
      numberGrow(newVal, oldVal) {
        const _this = this
        const step = newVal - oldVal
        let increment
        if (step >= 0) increment = 1
        else increment = -1
        let i = oldVal

        let t = setInterval(() => {
          const stepNum = this.option
          stepNum.series[0].data[0].value = i
          stepNum.series[0].max = _this.maxRate
          stepNum.series[0].axisLine.lineStyle.color[0] = [(i - this.minRate) / (this.maxRate - this.minRate) + 1 / 500, '#018AD1']
          stepNum.series[0].min = _this.minRate
          if (stepNum) {
            this.chart.setOption(stepNum)
          }
          i += increment
          if (i === newVal + increment) {
            clearInterval(t)
            // t = null
          }
        }, 20)
        this.timer2 = t
      },
      getData() {
        apiChart.getLogRate().then(res => {
          const min = res.data.data.aggregations.stats_rate.min
          this.logRate = res.data.data.aggregations.log_rate.buckets[0].doc_count
          this.maxRate = res.data.data.aggregations.stats_rate.max
          this.minRate = Math.round(min - (this.maxRate - min))
          if (this.minRate < 0) {
            this.minRate = min
          }
          // var temp = this.option
          // temp.series[0].data[0].value = this.logRate
          // temp.series[0].max = this.maxRate
          // temp.series[0].axisLine.lineStyle.color[0] = [(this.logRate - this.minRate) / (this.maxRate - this.minRate) , '#018AD1']
          // temp.series[0].min = this.minRate
          // this.chart.setOption(temp)
        })
      },
      initChart() {
        this.chart.setOption(this.option)
      }
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHanlder)
      this.chart.dispose()
      this.chart = null
      clearInterval(this.timer2)
      if (this.timer) clearInterval(this.timer)
    }
  }
</script>

<style scoped rel="stylesheet/stylus" lang="stylus">
.gauge
  height: 500px
</style>

