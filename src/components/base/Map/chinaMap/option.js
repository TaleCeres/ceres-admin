// Map-option.js

let max = 480
let min = 9
let maxSize4Pin = 100
let minSize4Pin = 20

export default {
  // title: {
  //   text: '地区分布',
  //   x: 'left',
  //   textStyle: {
  //     color: '#fff',
  //     fontWeight: 600,
  //     fontSize: '1vw'
  //   }
  // },
  tooltip: {
    trigger: 'item',
    formatter(params) {
      // console.log(JSON.stringify(params))   !!!!
      if (params.value.length === 3) {
        return `<p>${params.name}</p><p>${params.seriesName}:${params.value[2]}</p>`
      }
      return `<p>${params.name}</p><p>${params.seriesName}:${params.value}</p>`
    },
  },
  visualMap: {
    show: true,
    min: 0,
    max: 200,
    x: 'left',
    y: 'bottom',
    text: ['高', '低'],
    calculable: true,
    seriesIndex: [1],
    inRange: {
      color: ['#00467F', '#A5CC82'], // 蓝绿
    },
  },
  // toolbox: {
  //   show: true,
  //   orient: 'vertical',
  //   x: 'right',
  //   y: 'center',
  //   feature: {
  //     mark: {show: true},
  //     dataView: {show: true, readOnly: false},
  //     restore: {show: true},
  //     saveAsImage: {show: true}
  //   }
  // },
  // roamController: {
  //   show: true,
  //   x: 'right',
  //   mapTypeControl: {
  //     'china': true
  //   }
  // },
  geo: {
    show: true,
    map: 'china',
    label: {
      normal: { show: false },
      emphasis: { show: false },
    },
    roam: true,
    itemStyle: {
      normal: { areaColor: '#031525', borderColor: '#097bba' },
      emphasis: { areaColor: '#2B91B7' },
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
          show: true,
        },
        emphasis: {
          show: false,
          textStyle: {
            color: '#fff',
          },
        },
      },
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#031525',
          borderColor: '#3B5077',
        },
        emphasis: {
          areaColor: '#2B91B7',
        },
      },
      animation: false,
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
        { name: '广东', value: 123 },
        { name: '青海', value: 12 },
        { name: '西藏', value: 7 },
        { name: '四川', value: 125 },
        { name: '宁夏', value: 18 },
        { name: '海南', value: 14 },
        { name: '台湾', value: undefined },
        { name: '香港', value: undefined },
        { name: '澳门', value: undefined },
      ],
    },
    {
      name: '数量',
      type: 'scatter',
      coordinateSystem: 'geo',
      symbol: 'pin', // 气泡
      symbolSize(val) {
        let a = (maxSize4Pin - minSize4Pin) / (max - min)
        let b = minSize4Pin - a * min
        b = maxSize4Pin - a * max
        return a * val[2] + b
      },
      label: {
        normal: {
          show: true,
          textStyle: {
            color: '#fff',
            fontSize: 9,
          },
        },
      },
      itemStyle: {
        normal: {
          color: '#F62157',
        },
      },
      zlevel: 6,
      data: [
        { name: '北京', value: [116.46, 39.92, 92] },
        { name: '武汉', value: [114.31, 30.52, 84] },
        { name: '广州', value: [113.23, 23.16, 83] },
        { name: '重庆', value: [106.54, 29.59, 65] },
        { name: '上海', value: [121.48, 31.22, 64] },
        { name: '新疆', value: [87.68, 43.77, 27] },
        { name: '青海', value: [101.74, 36.56, 10] },
        { name: '西藏', value: [91.11, 29.97, 7] },
        { name: '西安', value: [108.95, 34.27, 63] },
        { name: '郑州', value: [113.65, 34.76, 58] },
        { name: '天津', value: [117.2, 39.13, 58] },
        { name: '长沙', value: [113, 28.21, 57] },
        { name: '成都', value: [104.06, 30.67, 56] },
        { name: '合肥', value: [117.27, 31.86, 54] },
        { name: '南昌', value: [115.89, 28.68, 53] },
        { name: '南京', value: [118.78, 32.04, 53] },
        { name: '哈尔滨', value: [126.63, 45.75, 51] },
        { name: '昆明', value: [102.73, 25.04, 49] },
        { name: '沈阳', value: [123.38, 41.8, 48] },
        { name: '杭州', value: [120.19, 30.26, 46] },
        { name: '石家庄', value: [114.48, 38.03, 44] },
        { name: '济南', value: [117, 36.65, 43] },
        { name: '太原', value: [112.53, 37.87, 43] },
        { name: '莱芜', value: [117.67, 36.19, 1] },
        { name: '梅州', value: [116.1, 24.55, 1] },
        { name: '河源', value: [114.68, 23.73, 1] },
        { name: '甘肃', value: [98.289152, 39.77313, 1] },
        { name: '潮州', value: [116.63, 23.68, 1] },
      ],
    },
  ],
}
