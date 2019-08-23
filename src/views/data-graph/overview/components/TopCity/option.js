// 参考 https://www.echartsjs.com/examples/editor.html?c=bar-gradient
import echarts from 'echarts'

export default {
  // canvas中图形的位置
  grid: {
    x: 70,
    y: 15,
  },
  xAxis: {
    axisLabel: {
      inside: false,
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    z: 10
  },
  yAxis: {
    type: 'category',
    data: ['成都市', '长沙市', '天津市', '郑州市', '西安市', '上海市', '重庆市', '广州市', '武汉市', '北京市'],
    axisLine: {
      show: false
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      interval: 0,
      color: '#fff',
      fontSize: 14
    }
  },
  dataZoom: [
    {
      type: 'inside'
    }
  ],
  series: [
    {
      type: 'bar',
      label: {
        normal: {
          show: true,
          position: 'right',
          color: '#fff',
          fontSize: 16
        }
      },
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ]
          )
        },
        emphasis: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ]
          )
        }
      },
      data: [56, 57, 58, 58, 63, 64, 65, 83, 84, 92]
    }
  ]
}
