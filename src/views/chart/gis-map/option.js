/**
 * 获取坐标 http://api.map.baidu.com/lbsapi/getpoint/index.html
 * gis坐标[经度, 纬度], 经度越大越向右，纬度越大越向上
 * */

import echarts from 'echarts'
const anjiData = require('./anji.json')
echarts.registerMap('zhejiang', anjiData)
const dataCenterGis = [119.703307, 30.657736] // 数据中心经纬度
const cloudServiceGis = [119.325287, 30.850739] // 云服务经纬度
const chinaGeoCoordMap = {
  '云服务': cloudServiceGis,
  '中源家居股份有限公司': [119.616093, 30.62116],
  '永艺家具股份有限公司': [119.675803, 30.607438],
  '浙江恒林椅业股份有限公司': [119.681168, 30.661117],
  '安吉富和家具股份有限公司': [119.678959, 30.612794],
  '安吉隆博家具股份有限公司': [119.613253, 30.671319],
  '浙江盛信椅业股份有限公司': [119.619262, 30.622846]
}
const chinaDatas = [
  {
    id: '0',
    name: '杭电安吉研究院',
    alias: '数据中心',
    value: [...dataCenterGis, 0, '中心']
  },
  {
    id: '1',
    name: '云服务',
    alias: '云服务',
    value: [...cloudServiceGis, 0, '云服务']
  },
  {
    id: '5d8042e7de1685795bc379ce',
    name: '中源家居股份有限公司',
    alias: '中源家居',
    value: [119.616093, 30.62116, 30, '入驻']
  },
  {
    id: '5d8042f7de1685795bc379d0',
    name: '永艺家具股份有限公司',
    alias: '永艺家具',
    value: [119.675803, 30.607438, 10, '入驻'],
  },
  {
    id: '5d804350de1685795bc379dc',
    name: '浙江恒林椅业股份有限公司',
    alias: '恒林椅业',
    value: [119.681168, 30.661117, 30, '入驻'],
  },
  {
    id: '5d804314de1685795bc379d4',
    name: '安吉富和家具股份有限公司',
    alias: '富和家具',
    value: [119.678959, 30.612794, 8, '入驻']
  },
  {
    id: '5d8041e4de1685795bc379b2',
    name: '安吉隆博家具股份有限公司',
    alias: '隆博家具',
    value: [119.613253, 30.671319, 1, '入驻']
  },
  {
    id: '5d804375de1685795bc379e0',
    name: '浙江盛信椅业股份有限公司',
    alias: '盛信椅业',
    value: [119.619262, 30.622846, 1, '入驻']
  },
  {
    id: '1111',
    name: '安吉联胜家具有限公司',
    alias: '联胜家具',
    value: [119.675287, 30.57134, 10, '未入驻']
  },
  {
    id: '1111',
    name: '浙江五星家具有限公司',
    alias: '五星家具',
    value: [119.684128, 30.693911, 10, '未入驻']
  },
  {
    id: '1111',
    name: '浙江中义家具有限公司',
    alias: '中义家具',
    value: [119.475287, 30.61134, 10, '未入驻']
  },
  {
    id: '1111',
    name: '浙江强盛家具有限公司',
    alias: '强盛家具',
    value: [119.617488, 30.703658, 10, '未入驻']
  },
  {
    id: '1111',
    name: '浙江安吉铭成椅业有限责任公司',
    alias: '铭成椅业',
    value: [119.575287, 30.51134, 10, '未入驻']
  },
  {
    id: '1111',
    name: '大康控股集团有限公司',
    alias: '大康控股',
    value: [119.632147, 30.649607, 10, '未入驻']
  },
  {
    id: '1111',
    name: '浙江环辰椅业有限公司',
    alias: '环辰椅业',
    value: [119.612225, 30.61461, 10, '未入驻']
  },
  {
    id: '1111',
    name: '浙江大东方椅业股份有限公司',
    alias: '大东方',
    value: [119.68004, 30.626159, 10, '未入驻']
  },
  {
    id: '1111',
    name: '浙江万昌家具股份有限公司',
    alias: '万昌家具',
    value: [119.753518, 30.753862, 10, '未入驻']
  },
  {
    id: '1111',
    name: '安吉科瑞椅业科技有限公司',
    alias: '科瑞椅业',
    value: [119.70004, 30.756159, 10, '未入驻']
  },
  {
    id: '1111',
    name: '强龙家具股份有限公司',
    alias: '强龙家具',
    value: [119.48004, 30.586159, 10, '未入驻']
  },
  {
    id: '1111',
    name: '浙江博泰家具有限公司',
    alias: '博泰家具',
    value: [119.74004, 30.646159, 10, '未入驻']
  },
  {
    id: '1111',
    name: '浙江泰丰家具有限公司',
    alias: '泰丰家具',
    value: [119.63004, 30.786159, 10, '未入驻']
  },
  {
    id: '1111',
    name: '浙江大唐家具有限公司',
    alias: '大唐家具',
    value: [119.52004, 30.526159, 10, '未入驻']
  },

]

let convertData = data => {
  let res = []
  for (let i = 0; i < data.length; i += 1) {
    let dataItem = data[i]
    let fromCoord = chinaGeoCoordMap[dataItem.name]
    let toCoord = cloudServiceGis
    if (dataItem.name === '云服务') {
      fromCoord = chinaGeoCoordMap[dataItem.name]
      toCoord = dataCenterGis
    }

    if (fromCoord && toCoord) {
      res.push([{
        coord: fromCoord,
        value: dataItem.value
      }, {
        coord: toCoord,
      }])
    }
  }
  return res
}

let series = [];
[['数据中心', chinaDatas]].forEach((item, i) => {
  series.push({
    type: 'lines',
    zlevel: 2,
    effect: {
      show: true,
      period: 4, // 箭头指向速度，值越小速度越快
      trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
      symbol: 'arrow', // 箭头图标
      symbolSize: 5, // 图标大小
    },
    lineStyle: {
      normal: {
        color: val => {
          if (val.data.value[3] === '云服务') {
            return 'yellow'
          }
          return 'green'
        },
        width: 1, // 尾迹线条宽度
        opacity: 1, // 尾迹线条透明度
        curveness: 0.3 // 尾迹线条曲直度
      }
    },
    data: convertData(item[1])
  },
  {
    name: '事件',
    type: 'effectScatter',
    coordinateSystem: 'geo',
    data: chinaDatas,
    symbolSize: val => 10,
    showEffectOn: 'render',
    rippleEffect: {
      brushType: 'stroke',
      scale: 4
    },
    label: {
      normal: {
        show: true,
        position: 'right', // 显示位置
        offset: [5, -10], // 偏移设置
        formatter(params) { // 圆环显示文字
          if (params.data.id === '1' || params.data.id === '0') {
            return params.data.alias
          }
          return ''
        },
        fontSize: 13
      },
      emphasis: {
        show: true
      }
    },
    itemStyle: {
      normal: {
        color(params) {
          if (params.value[3] === '入驻') {
            return 'green'
          } if (params.value[3] === '未入驻') {
            return '#cccccc'
          }
          return 'yellow'
        }
      },
    }
  },)
})
export default {
  tooltip: {
    trigger: 'item',
    formatter(params) {
      const { name, seriesType, value } = params
      if (name === '杭电安吉研究院') return '数据中心'
      if (seriesType === 'lines') {
        return
      }
      if (value[3] === '入驻') {
        return `${name} <br> 生产线: ${value[2]} 条`
      } if (value[3] === '未入驻') {
        return `${name} <br> 未入驻`
      }
      return `${name}`
    }
  },
  geo: {
    roam: false,
    map: 'zhejiang',
    geoIndex: 0,
    aspectScale: 0.75,
    layoutCenter: ['50%', '50%'],
    layoutSize: '100%',
    label: {
      normal: {
        show: true,
        textStyle: {
          color: '#05C3F9',
          fontSize: 20
        }
      },
      emphasis: {
        textStyle: {
          color: '#05C3F9',
          fontSize: 21
        }
      }
    },
    itemStyle: {
      normal: {
        areaColor: 'rgba(63, 218, 255, 0.1)',
        borderColor: 'rgba(63, 218, 255, 0.8)',
        borderWidth: 2,
        shadowColor: 'rgba(63, 218, 255, 0.5)'
      },
      emphasis: {
        // areaColor: '#2B91B7'
        areaColor: 'rgba(63, 218, 255, 0.1)',
        borderColor: 'rgba(63, 218, 255, 0.8)',
        borderWidth: 2,
        shadowColor: 'rgba(63, 218, 255, 0.5)'
      }
    }
  },
  series
}
