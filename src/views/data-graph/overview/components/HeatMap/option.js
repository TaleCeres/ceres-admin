/* eslint-disable */
let max = 480
let min = 9
let maxSize4Pin = 100
let minSize4Pin = 20

export default {
  tooltip: {
    trigger: 'item',
    formatter: params => {
      if (params.value.length === 3) {
        return `<p>${params.name}</p><p>${params.seriesName}:${params.value[2]}</p>`
      } 
      return `<p>${params.name}</p><p>${params.seriesName}:${params.value}</p>`
    }
  },
  geo: {
    show: true,
    map: 'china',
    label: {
      normal: {
        show: true,
        textStyle: {
          color: '#fff'
        },
      },
      emphasis: {
        show: true,
        textStyle: {
          color: '#fff'
        },
      }
    },
    zoom: 1.2,
    roam: false, // 缩放
    itemStyle: { // 地图元素块的样式
      normal: { // 普通情况下
        areaColor: '#00457E', // 元素块的填充色
        borderColor: '#fff' // 元素块的边框色
      },
      emphasis: { // 鼠标划过时
        areaColor: '#2B91B6'
      }
    }
  },
  // 
  visualMap: {
    type: 'continuous',
    min: 0,
    max: 170,
    left: 3,
    bottom: '5%',
    text: ['多', '少'],
    realtime: false,
    calculable: true,
    color: ['red', 'orange', 'yellow', 'green', 'steelblue'],
    textStyle: {
      color: '#fff',
      fontSize: '14',
    },
  },
  series: [
    {
      name: '院校数量',
      type: 'map',
      mapType: 'china',
      geoIndex: 0,
      aspectScale: 0.75, // 长宽比
      label: {
        normal: {
          show: true
        },
        emphasis: {
          show: false,
        }
      },
      data: [
        { name: '北京', value: 92 },
        { name: '天津', value: 57 },
        { name: '上海', value: 64 },
        { name: '重庆', value: 65 },
        { name: '河北', value: 121 },
        { name: '河南', value: 134 },
        { name: '云南', value: 77 },
        { name: '辽宁', value: 115 },
        { name: '黑龙江', value: 81 },
        { name: '湖南', value: 124 },
        { name: '安徽', value: 119 },
        { name: '山东', value: 145 },
        { name: '新疆', value: 47 },
        { name: '江苏', value: 167 },
        { name: '浙江', value: 107 },
        { name: '江西', value: 100 },
        { name: '湖北', value: 129 },
        { name: '广西', value: 74 },
        { name: '甘肃', value: 1 },
        { name: '山西', value: 80 },
        { name: '内蒙古', value: 53 },
        { name: '陕西', value: 93 },
        { name: '吉林', value: 62 },
        { name: '福建', value: 89 },
        { name: '贵州', value: 70 },
        { name: '广东', value: 151 },
        { name: '青海', value: 12 },
        { name: '西藏', value: 7 },
        { name: '四川', value: 125 },
        { name: '宁夏', value: 18 },
        { name: '海南', value: 14 },
        { name: '台湾', value: undefined },
        { name: '香港', value: undefined },
        { name: '澳门', value: undefined }
      ]
    }
  ]
}
