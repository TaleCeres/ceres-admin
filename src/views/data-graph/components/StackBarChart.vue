<template>
  <div :id="id" style="height: 90%"></div>
</template>

<script type="text/ecmascript-6">
import { debounce } from '@/utils'
import resize from '@/mixins/resize'
import echarts from 'echarts'
export default {
  mixins: [resize],
  props: {
    chartHeight: {
      type: Number,
      default: 300
    },
    id: {
      type: String,
      default: 'gaugeChart'
    },
    data: {
      type: Array
    },
    width: {
      type: String,
      default: '100%'
    },
    float: {
      type: String,
      default: 'none'
    }
  },
  data() {
    return {
      chart: null,
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          show: false
        },
        grid: {
          left: '2%',
          right: '5%',
          top: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(70, 118, 255, 0.2)'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#4676FF'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#4676FF',
              fontSize: '12'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#4676FF'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['水务', '医疗', '教育', '民航', '燃气', '环保', '交通', '电力'],
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#4676FF'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#4676FF',
              fontSize: '12'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#4676FF'
            }
          }
        },
        color: ['rgba(243, 78, 78, 0.7)', 'rgba(253, 125, 255, 0.7)', 'rgba(171, 89, 255, 0.7)', 'rgba(114, 151, 255, 0.7)', 'rgba(81, 174, 255, 0.7)'],
        series: [
          {
            name: '严重',
            type: 'bar',
            stack: '总量',
            data: [1, 5, 13, 4, 4, 2, 13, 9]
          },
          {
            name: '高危',
            type: 'bar',
            stack: '总量',
            data: [10, 7, 13, 14, 10, 20, 17, 7]
          },
          {
            name: '中危',
            type: 'bar',
            stack: '总量',
            data: [3, 3, 10, 11, 16, 12, 13, 21]
          },
          {
            name: '低危',
            type: 'bar',
            stack: '总量',
            data: [8, 18, 11, 1, 6, 17, 18, 19]
          },
          {
            name: '信息',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                formatter: params => {
                  let vulnedate = [34, 47, 54, 56, 57, 65, 73, 86]
                  return vulnedate[params.dataIndex]
                },
                show: true,
                position: 'right',
                color: '#9eb2dc',
                fontSize: 15
              }
            },
            data: [6, 15, 7, 26, 21, 14, 12, 30]
          }
        ]
      }
    }
  },
  computed: {
    chartSize() {
      return this.chartHeight
    },
    chartWidth() {
      return { width: this.width }
    }
  },
  watch: {
    data() {
      this.drawChart()
    },
    chartHeight() {
      this.chart.resize()
    }
  },
  mounted() {
    this.drawChart()
    // 监听窗口的变化
    this.__resizeHanlder = () => {
      if (this.chart) {
        this.chart.resize()
      }
    }
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
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
