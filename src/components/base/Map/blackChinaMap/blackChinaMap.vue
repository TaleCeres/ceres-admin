<template>
  <div :ref="id"  class="china-black-color"></div>
</template>

<script>
  import io from 'socket.io-client'
  import echarts from 'echarts'
  import bmap from 'echarts/extension/bmap/bmap'
  import { debounce } from '../../../../utils/self-adaption'
  import { getTotal } from '@/api/chart'
  import mapStyle from './mapStyle'

  export default {
    name: 'blackChinaMap',
    props: {
      id: {
        type: String,
        default: 'chinaBlackColor',
      },
    },
    data() {
      return {
        chart: null,
        option: '',
        data: [],
        geoCoordMap: {},
        arrSeries: [],
        // 过期时间
        expirationDate: 0,
        intervalTime: '',
      }
    },
    watch: {
      arrSeries() {
        this.option = {
          tooltip: {
            trigger: 'item',
            formatter(obj) {
              let val = obj.value
              return `${'<div style="border-bottom: 2px solid rgba(255,255,255,.5); font-size: 20px;padding-bottom: 5px;margin-bottom: 5px">'
                + '采集器'
                + ':'}${val[3]}</div>`
                + '运行状况'
                + `:${val[4]}<br>`
                + 'cpu使用'
                + `:${val[5]}<br>`
                + '内存使用'
                + `:${val[6]}<br>`
                + '活跃进程数'
                + `:${val[7]}<br>`
            },
          },
          bmap: {
            // 设置地图中心点
            center: [104, 37],
            // 地图缩放级别
            zoom: 5,
            // 是否允许拖拽
            roam: true,
            mapStyle,
          },
          series: this.arrSeries,
        }
        this.initChart()
      },
    },
    created() {
      this.getProbeData()
    },
    mounted() {
      this.chart = echarts.init(this.$refs[this.id])
      this.getMouseDown()
      this.getMouseUp()
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          // console.log('1111111111')
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
        // this.chart = echarts.init(document.getElementById(this.id))
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
      // 获得所有点
      getProbeData() {
        getTotal().then(res => {
          res.data.result.forEach(i => {
            let arrPoint = [[i.longitude, i.latitude, 200, i.probe, '', '', '', '']]
            this.setSeries(arrPoint)
          })
        })
      },
      // 设置点的位置
      setSeries(arrPoint) {
        // 关闭的点
        let redPoint = {
          // 散点图
          name: 'Top 5',
          type: 'scatter',
          // 该系列使用的坐标系
          coordinateSystem: 'bmap',
          data: arrPoint,
          symbolSize(val) {
            return val[2] / 10
          },
          itemStyle: {
            normal: {
              color: '#dd1800',
              shadowBlur: 10,
              shadowColor: '#333',
            },
          },
        }
        this.arrSeries.push(redPoint)
        this.getPart()
      },
      // 更新某个点的数据
      getPart() {
        this.isOverTime()
        let _this = this
        let socket = io.connect('http://192.168.3.103:5001')
        socket.on('socket:probes-running-states', data => {
          let listProbe = data
          this.arrSeries = this.arrSeries.map(item => {
            if (item.data[0][3] === listProbe.probe) {
              item.data[0][4] = '运行'
              item.data[0][5] = `${(100 - listProbe.state.cpu.id).toFixed(2)}%`
              item.data[0][6] = `${(listProbe.state.mem.used / listProbe.state.mem.total).toFixed(2)}%`
              item.data[0][7] = listProbe.state.pids.length
              item.type = 'effectScatter'
              // 配置何时显示特效
              item.showEffectOn = 'render'
              item.rippleEffect = {
                //  周期
                period: 2,
                // 比例
                scale: 3,
                // 绘制方式
                brushType: 'stroke',
              }
              // 是否开启鼠标 hover 的提示动画效果
              item.hoverAnimation = true
              item.itemStyle.normal.color = '#01dd19'
              this.expirationDate = 0
              clearInterval(this.intervalTime)
            }
            return item
          })
        })
        this.intervalTime = setInterval(() => {
          _this.expirationDate += 1
        }, 10000)
      },
      // 超时,点变红
      isOverTime() {
        if (this.expirationDate >= 6) {
          this.getProbeData()
        }
      },
      // 鼠标按下取消气泡图
      getMouseDown() {
        this.chart.getZr().on('mousedown', () => {
          this.option = {
            series: [],
          }
          this.initChart()
        })
      },
      // 鼠标弹起生成气泡图
      getMouseUp() {
        this.chart.getZr().on('mouseup', () => {
          this.option = {
            series: this.arrSeries,
          }
          this.initChart()
        })
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .china-black-color
    height 866px
</style>
