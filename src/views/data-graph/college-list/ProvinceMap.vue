<template>
  <div style="height: 100%" class="visual">
    <el-select v-model="value" placeholder="请选择" size="mini" filterable popper-class="select-option" @change="handelUpdateMap">
      <el-option v-for="item in provincesInCN" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <div :id="id" style="height: 95%"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import resize from '@/mixins/resize'
import { provincesInCN } from 'assets/data/index'
import { collegeDistributionByProvince } from 'assets/data/stat'

// 导入地图信息
// echarts会自动用 echarts.registerMap('china', GeoJson} 载入地图信息
// require.context参考 https://juejin.im/post/5ab8bcdb6fb9a028b77acdbd
const files = require.context('node_modules/echarts/map/js/province', false, /\.js$/)
files.keys().forEach(key => {
  files(key)
})

export default {
  name: 'ProvinceMap',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      chart: null,
      province: '',
      provincesInCN,
      value: ''
    }
  },
  computed: {
    collegeDistribution() {
      return collegeDistributionByProvince[this.province]
    },
    maxValue() {
      let valueArr = this.collegeDistribution.map(item => item.value)
      return Math.max(...valueArr)
    },
    option() {
      return {
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
          map: this.province,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: 12,
              },
            },
            emphasis: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: 28,
              },
            }
          },
          zoom: 1.2, // 当前视角的缩放比例
          roam: true, // 是否缩放
          itemStyle: {
            normal: { areaColor: '#00457E', borderColor: '#fff' },
            emphasis: { areaColor: '#2B91B6' }
          },
        },
        visualMap: {
          type: 'continuous',
          show: true,
          min: 0,
          max: this.maxValue,
          left: 5,
          text: ['多', '少'],
          realtime: false,
          calculable: true,
          color: ['red', 'orange', 'yellow', 'green', 'steelblue'],
          textStyle: {
            color: '#fff',
            fontSize: '16',
          },
        },
        series: [
          {
            type: 'map',
            name: '院校数量',
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
            roam: true,
            animation: false,
            data: this.collegeDistribution
          }
        ]
      }
    }
  },
  created() {
    let { province } = this.$route.query
    this.province = province
    this.value = province
    // setTimeout(() => {
    //   this.$store.commit('visual/SET_PROVINCE', this.province)
    // }, 200)
  },
  mounted() {
    this.chart.on('click', 'series', data => {
      let { name: city } = data
      this.$store.commit('visual/SET_CITY', city)
    })
    this.$store.commit('visual/SET_PROVINCE', this.province)
  },
  methods: {
    handelUpdateMap() {
      this.province = this.value
      this.$store.commit('visual/SET_PROVINCE', this.province)
      // 刷新 map
      this.updateChart()
      // 替换「路由路径」，不刷新
      this.$router.replace({
        // path: '/data-graph/college-list',
        query: {
          province: this.province
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
