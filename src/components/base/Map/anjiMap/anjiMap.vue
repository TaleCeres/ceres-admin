<template>
  <div :id="id" class="anji-map"></div>
</template>

<script type="text/ecmascript-6">
  import echarts from 'echarts'
  import { debounce } from '../../../../utils/self-adaption'
  import tool from "./tool"
  let dotList = require('./anji.json')
  // let data = [
  //   { name: '安吉县政府', value: [119.6868384897, 30.6445573492, 32] },
  //   { name: '安吉客运中心', value: [119.6443674215, 30.6369561493, 32] },
  //   { name: '杭州Hello kitty乐园', value: [119.7473919803, 30.6271180988, 32] },
  //   { name: '安吉商会大厦', value: [119.6912560935, 30.6270532340, 35] },
  //   { name: '安吉县人民医院', value: [119.7028334699, 30.6313959321, 35] },
  //   { name: '安吉北收费站(出口方向)', value: [119.6900285074, 30.7584996669, 35] },
  //   { name: '安吉十里景溪景区', value: [119.5010275356, 30.4952060509, 38] },
  //   { name: '安吉服务区', value: [119.7409178969, 30.6628432082, 50] },
  //   { name: '浙江科技学院(安吉校区)', value: [119.6227801932, 30.6784148456, 46] },
  //   { name: '安吉科技创业园', value: [119.7031354042, 30.6578733511, 55] },
  // ]
  // let convertData = function (data) {
  //   let res = []
  //   for (let i = 0; i < data.length; i++) {
  //     let geoCoord = geoCoordMap[data[i].name]
  //     if (geoCoord) {
  //       res.push({
  //         name: data[i].name,
  //         value: geoCoord.concat(data[i].value),
  //       })
  //     }
  //   }
  //   return res
  // }

  export default {
    name: 'anjiMap',
    props: {
      id: {
        type: String,
        default: 'anjiMap',
      },
    },
    data() {
      return {
        chart: null,
        count: 0,
        option: {
          tooltip: {
            padding: 0,
            enterable: true,
            transitionDuration: 1,
            textStyle: {
              color: '#000',
              decoration: 'none',
            },
            formatter(params) {
              // console.log(params)
              let tipHtml = ''
              tipHtml = `${' <div style="height:200px; width:230px; border-radius:5px; background:#fff; box-shadow:0 0 10px 5px #aaa"> '
                + '    <div style="height:50px;width:100%;border-radius:5px;background:#F8F9F9;border-bottom:1px solid #F0F0F0">'
                + '        <span style="line-height:50px;margin-left:18px">'}${params.name}</span>`
                + '    </div>'
                + '    <div>'
                + '     <span style="float:right;line-height:50px;margin-right:18px;color:#5396E3;cursor:pointer" onclick="mapTooltipClick(this);">点击查看详情</span>'
                + '    </div>'
                // + '    <div style="height:110px;width:100%;background:#fff">'
                // + '        <div style="padding-left:18px;padding-top:22px">'
                // + '            <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:rgba(92,169,235,1)"></span> '
                // + '            <span>上传表格数量</span>'
                // + `            <span style="float:right;margin-right:18px">${params.data}万</span>`
                // + '        </div>'
                // + '        <div style="padding-left:18px;padding-top:14px">'
                // + '            <span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:rgba(92,169,235,1)"></span> '
                // + '            <span>上传数据条数</span>'
                // + `            <span style="float:right;margin-right:18px">${params.data}条</span>`
                // + '        </div>'
                // + '    </div>'
                + '</div>'
              return tipHtml
            },
          },
          geo: {
            roam: false,
            map: 'anji',
            geoIndex: 0,
            aspectScale: 0.85,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#05C3F9',
                },
              },
            },
            itemStyle: {
              normal: {
                areaColor: 'rgba(63, 218, 255, 0.1)',
                borderColor: 'rgba(63, 218, 255, 0.8)',
                borderWidth: 2,
                shadowColor: 'rgba(63, 218, 255, 0.5)',
                shadowBlur: 30,
              },
              emphasis: {
                areaColor: '#2B91B7',
              },
            },
          },
          // bmap: {
          //   center: [119.6867664145, 30.6445121351],
          //   zoom: 11,
          //   roam: true,
          //   mapStyle: {
          //     styleJson: [
          //       {
          //         featureType: 'water',
          //         elementType: 'all',
          //         stylers: {
          //           color: '#d1d1d1',
          //         },
          //       }, {
          //         featureType: 'land',
          //         elementType: 'all',
          //         stylers: {
          //           color: '#f3f3f3',
          //         },
          //       }, {
          //         featureType: 'railway',
          //         elementType: 'all',
          //         stylers: {
          //           visibility: 'off',
          //         },
          //       }, {
          //         featureType: 'highway',
          //         elementType: 'all',
          //         stylers: {
          //           color: '#fdfdfd',
          //         },
          //       }, {
          //         featureType: 'highway',
          //         elementType: 'labels',
          //         stylers: {
          //           visibility: 'off',
          //         },
          //       }, {
          //         featureType: 'arterial',
          //         elementType: 'geometry',
          //         stylers: {
          //           color: '#fefefe',
          //         },
          //       }, {
          //         featureType: 'arterial',
          //         elementType: 'geometry.fill',
          //         stylers: {
          //           color: '#fefefe',
          //         },
          //       }, {
          //         featureType: 'poi',
          //         elementType: 'all',
          //         stylers: {
          //           visibility: 'off',
          //         },
          //       }, {
          //         featureType: 'green',
          //         elementType: 'all',
          //         stylers: {
          //           visibility: 'off',
          //         },
          //       }, {
          //         featureType: 'subway',
          //         elementType: 'all',
          //         stylers: {
          //           visibility: 'off',
          //         },
          //       }, {
          //         featureType: 'manmade',
          //         elementType: 'all',
          //         stylers: {
          //           color: '#d1d1d1',
          //         },
          //       }, {
          //         featureType: 'local',
          //         elementType: 'all',
          //         stylers: {
          //           color: '#d1d1d1',
          //         },
          //       }, {
          //         featureType: 'arterial',
          //         elementType: 'labels',
          //         stylers: {
          //           visibility: 'off',
          //         },
          //       }, {
          //         featureType: 'boundary',
          //         elementType: 'all',
          //         stylers: {
          //           color: '#fefefe',
          //         },
          //       }, {
          //         featureType: 'building',
          //         elementType: 'all',
          //         stylers: {
          //           color: '#d1d1d1',
          //         },
          //       }, {
          //         featureType: 'label',
          //         elementType: 'labels.text.fill',
          //         stylers: {
          //           color: '#999999',
          //         },
          //       }],
          //   },
          // },
          series: [
            {
              name: 'pm2.5',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: [
                { name: '安吉县政府', value: [119.6868384897, 30.6445573492, 32] },
                { name: '安吉客运中心', value: [119.6443674215, 30.6369561493, 32] },
                { name: '杭州Hello kitty乐园', value: [119.7473919803, 30.6271180988, 32] },
                { name: '安吉商会大厦', value: [119.6912560935, 30.6270532340, 35] },
                { name: '安吉县人民医院', value: [119.7028334699, 30.6313959321, 35] },
                { name: '安吉北收费站(出口方向)', value: [119.6900285074, 30.7584996669, 35] },
                { name: '安吉十里景溪景区', value: [119.5010275356, 30.4952060509, 38] },
                { name: '安吉服务区', value: [119.7409178969, 30.6628432082, 50] },
                { name: '浙江科技学院(安吉校区)', value: [119.6227801932, 30.6784148456, 46] },
                { name: '安吉科技创业园', value: [119.7031354042, 30.6578733511, 55] },
              ],
              symbolSize(val) {
                return val[2] / 5
              },
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false,
                },
                emphasis: {
                  show: true,
                },
              },
              itemStyle: {
                normal: {
                  color: 'purple',
                  shadowBlur: 10,
                  shadowColor: '#333',
                },
              },
            },
          ],
        },
      }
    },
    mounted() {
      this.initChart()
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      })
      window.addEventListener('resize', this.__resizeHanlder)
    },
    beforeDestroy() {
      this.destroyChart()
    },
    methods: {
      initChart() {
        tool.throwCount.on('throwCount', (count) => {
          this.$emit("showDetails", this.option.series[0].data[count])
        })
        echarts.registerMap('anji', dotList)
        this.chart = echarts.init(document.getElementById(this.id))
        this.chart.setOption(this.option)
        // let count = 0
        tool.autoHover(this.chart, this.option, 10, 3000);
      },
      destroyChart() {
        if (!this.chart) {
          return
        }
        this.chart.dispose()
        this.chart = null
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .anji-map
    height 400px
</style>
