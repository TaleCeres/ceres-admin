<template>
  <div :ref="id" class="case-trend-bar"></div>
</template>

<script>
  import echarts from 'echarts'
  import * as apiChart from '@/api/chart'
  import { debounce } from '../../../utils/self-adaption'

  export default {
    name: 'Bar',
    props: {
      id: {
        type: String,
        default: 'barChart',
      },
      selectTime: {
        type: Array,
        default: () => [],
      },
      selectInterval: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        chart: null,
        xKeyData: [],
        request: {
          start: new Date() - 1000 * 60 * 60 * 24 * 365,
          end: new Date().getTime(),
          interval: '1d',
        },
        option: '',
      }
    },
    watch: {
      // 时间间隔
      selectInterval() {
        this.request.interval = this.selectInterval
        this.getData()
      },
      // 开始和结束时间
      selectTime() {
        // let request = this.request
        // {[} request.start, request.end ] =  [this.selectTime[0],this.selectTime[1]]
        this.request.start = this.selectTime[0]
        this.request.end = this.selectTime[1]
        this.getData()
      },
      xKeyData() {
        // 指定图表的配置向
        this.option = {
          // backgroundColor: '#050505',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              textStyle: {
                color: '#000',
              },
            },
            formatter: '{a}&nbsp;&nbsp;&nbsp;{b}<hr>{c}kb',
          },
          grid: {
            left: '8%',
            right: '2%',
            borderWidth: 0,
            top: 10,
            bottom: 80,
            textStyle: {
              color: '#000',
            },
          },
          legend: {
            show: false,
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            show: true,
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#4C4C4C',
              },
            },
            // 显示坐标轴刻度
            axisTick: {
              show: false,
            },
            // 标签的相关设置
            axisLabel: {
              rotate: 45,
              color: '#000',
            },
            data: this.xKeyData,
          }],
          yAxis: [{
            type: 'value',
            // 网格线
            splitLine: {
              show: true,
              lineStyle: {
                color: '#252525',
              },
            },
            axisLine: {
              lineStyle: {
                color: '#050505',
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              formatter: '{value}kb',
              color: '#000',
            },
          }],
          dataZoom: [
            // 默认是slider,滑动型
            {
              show: true,
              height: 20,
              xAxisIndex: [0],
              handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
              handleSize: '110%',
              handleStyle: {
                color: '#d3dee5',
              },
              textStyle: {
                color: '#000',
              },
              borderColor: '#90979c',
              bottom: 0,
              start: 0,
              end: 15,
              minSpan: 5,
              maxSpan: 15,
            },
            // 内置型数据区域缩放组件
            {
              type: 'inside',
              show: true,
              start: 0,
              end: 15,
              minSpan: 5,
              maxSpan: 15,
            },
          ],
          series: [
            {
              name: 'flow',
              type: 'bar',
              stack: 'total',
              barMaxWidth: 15,
              barGap: '10%',
              itemStyle: {
                normal: {
                  color: '#018AD1',
                  label: {
                    show: false,
                  },
                },
              },
              data: this.yKeyData,
            },
          ],
        }
        this.initChart()
      },
    },
    created() {
      this.getData()
    },
    mounted() {
      // 基于选择的dom,进行初始化echarts
      this.chart = echarts.init(this.$refs[this.id])
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHanlder)
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      getData() {
        apiChart.getBarData(this.request).then(res => {
          const resList = res.data.data
          // this.xKeyData = resList.map(item => new Date(item.key_as_string).toLocaleString('chinese', {hour12: false}))
          this.xKeyData = resList.map(item => item.key_as_string.slice(0, 10))
          this.yKeyData = resList.map(item => parseInt(item.total_bytes.value / 1024))
        })
      },
      initChart() {
        this.chart.setOption(this.option)
      },
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .case-trend-bar
    height 437.5px
</style>
