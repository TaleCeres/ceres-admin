// Echart 详细参数信息： https://www.jianshu.com/p/3cf80b96a65d
import echarts from 'echarts'
import { Loading } from 'element-ui'
export default {
  data() {
    return {
      loadingInstance: '',
      loadingOptions: {},
    }
  },
  watch: {
    option() {
      // option变化，立马渲染
      this.updateChart()
    }
  },
  mounted() {
    // this.drawChart()
    // 监听窗口的变化
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    this.destroyChart()
  },
  methods: {
    __resizeHanlder() {
      if (this.chart) {
        this.chart.resize()
      }
    },
    drawChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.option)
    },
    updateChart() {
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
    startLoading() {
      this.loadingOptions.target = document.getElementById(this.id).parentNode
      this.loadingOptions.fullscreen = true
      this.loadingInstance = Loading.service(this.loadingOptions)
    },
    endLoading() {
      this.loadingInstance.close()
    }
  },
}
