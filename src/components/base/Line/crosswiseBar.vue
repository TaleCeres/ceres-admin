<template>
  <div :ref="id" class="crosswise-bar"></div>
</template>

<script>
  import echarts from 'echarts'
  import { debounce } from '../../../utils/self-adaption'
  import * as apiChart from '@/api/chart'

  export default {
    name: 'CrosswiseBar',
    props: {
      id: {
        type: String,
        default: 'chart',
      },
    },
    data() {
      return {
        chart: null,
        xKeyData: [],
        yKeyData: [],
        option: '',
        sum: 0,
        arr: [],
      }
    },
    watch: {
      xKeyData() {
        // 指定图表的配置向
        this.option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
            formatter: '{a}<hr>{b}&nbsp;&nbsp;&nbsp;{c}M',
          },
          grid: {
            top: '3%',
            left: '4%',
            right: '8%',
            bottom: '10%',
            containLabel: true,
          },
          xAxis: {
            // 对数轴
            type: 'log',
            min: 1,
            boundaryGap: [0, 0.01],
            // 网格线
            splitLine: {
              lineStyle: {
                color: '#252525',
              },
            },
            axisLabel: {
              rotate: 30,
              formatter: item => {
                const res = `${item}M`
                return res
              },
              color: '#000',
            },
            axisLine: {
              lineStyle: {
                color: '#050505',
              },
            },
          },
          yAxis: {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#4C4C4C',
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: '#000',
            },
            data: this.yKeyData,
          },
          series: [
            {
              name: 'top',
              type: 'bar',
              barMaxWidth: 15,
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  formatter: item => {
                    let res = ''
                    let avg = item.data / this.sum * 100
                    // 所占百分比<1的话，则保留两位小数
                    if (avg > 1) {
                      avg = parseInt(avg, 10)
                    } else {
                      avg = avg.toFixed(2)
                    }
                    res += `${avg}%`
                    return res
                  },
                },
              },
              data: this.xKeyData,
            },
          ],
          visualMap: {
            show: false,
            type: 'continuous',
            min: 0,
            max: 6,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            color: ['#0f94DA', '#062F5A'],
            textStyle: {
              color: '#fff',
            },
          },
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
      removeFirst(arrayXkey, arrayYkey) {
        // 拼接去掉首项
        this.xKeyData = this.xKeyData.concat(arrayXkey)
        this.xKeyData.shift()
        this.yKeyData = this.yKeyData.concat(arrayYkey)
        this.yKeyData.shift()
      },
      arrayOperation() {
        // 构成数组对象
        for (const i in this.xKeyData) {
          const obj = {
            name: [this.yKeyData[i]],
            value: this.xKeyData[i],
          }
          this.arr.push(obj)
        }
        // 升序
        this.arr.sort((a, b) => a.value - b.value)
        // 清空
        this.xKeyData = []
        this.yKeyData = []
        // 赋值
        for (const i in this.arr) {
          // 首字母大写 and 下划线后一位字母为大写
          this.arr[i].name[0] = this.arr[i].name[0].replace(this.arr[i].name[0][0], this.arr[i].name[0][0].toUpperCase())
          for (let j = 0; j < this.arr[i].name[0].length; j += 1) {
            if (this.arr[i].name[0][j] === '_') {
              if (this.arr[i].name[0][j + 1]) { this.arr[i].name[0] = this.arr[i].name[0].replace(this.arr[i].name[0][j + 1], this.arr[i].name[0][j + 1].toUpperCase()) }
            }
          }
          this.xKeyData.push(this.arr[i].value)
          this.yKeyData.push(this.arr[i].name)
        }
        this.xKeyData = this.xKeyData.map(item => parseInt(item / 1024 / 1024, 10))
        this.xKeyData.forEach(i => {
          this.sum += i
        })
      },
      getData() {
        apiChart.getL7Application().then(res => {
          // es6对象转数组
          const identifyUnknown = res.data.data.filter_unknown.identify_unknown.buckets
          // unknown分离
          const arrayXkey = Object.keys(identifyUnknown).map(key => identifyUnknown[key].bytes_sum.value)
          const arrayYkey = Object.keys(identifyUnknown)
          // 将第二部分赋值
          const array2 = res.data.data.l7proto.buckets
          array2.forEach(item => {
            this.xKeyData.push(item.bytes_sum.value)
            this.yKeyData.push(item.key)
          })
          this.removeFirst(arrayXkey, arrayYkey)
          this.arrayOperation()
        })
      },
      initChart() {
        this.chart.setOption(this.option)
      },
    },
  }
</script>
<style lang="stylus"  rel="stylesheet/stylus" scoped>
  .crosswise-bar
    height 437.5px
</style>
