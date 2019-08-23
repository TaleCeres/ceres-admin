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
import { provinces } from 'assets/data/index'
const provincesInCN = Object.entries(provinces).map(item => ({ value: item[1], label: item[1] }))

Object.keys(provinces).forEach(item => {
  // eslint-disable-next-line
  require(`node_modules/echarts/map/js/province/${item}.js`)
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
          max: 46,
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
            data: [
              { name: '杭州市', value: 46 },
              { name: '宁波市', value: 14 },
              { name: '温州市', value: 11 },
              { name: '丽水市', value: 2 },
              { name: '舟山市', value: 4 },
              { name: '台州市', value: 4 },
              { name: '金华市', value: 7 },
              { name: '衢州市', value: 2 },
              { name: '绍兴市', value: 8 },
              { name: '嘉兴市', value: 6 },
              { name: '湖州市', value: 3 },
            ]
          }
        ]
      }
    }
  },
  created() {
    let { province } = this.$route.query
    this.province = province
    this.value = province
  },
  mounted() {
    this.chart.on('click', 'series', data => {
      let { name: city } = data
      this.$store.commit('visual/SET_CITY', city)
    })
  },
  methods: {
    handelUpdateMap() {
      this.province = this.value
      this.$store.commit('visual/SET_PROVINCE', this.province)
      // 刷新 map
      this.updateChart()
      // 刷新 路由路径
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
