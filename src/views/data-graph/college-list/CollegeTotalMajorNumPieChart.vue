
<template>
  <div :id="id" style="height: 95%"></div>
</template>

<script type="text/ecmascript-6">
import resize from '@/mixins/resize'
import { mapState } from 'vuex'
import { totalMajorNum } from 'assets/data/stat'
export default {
  name: 'CollegeTotalMajorNumPieChart',
  components: {},
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'collegeTotalMajorNumPieChart'
    },
  },
  data() {
    return {
      chart: null,
      provinceStat: null,
    }
  },
  computed: {
    ...mapState({
      province: state => state.visual.geo.province
    }),
    option() {
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>设立{b}: {c}个 ({d}%)'
        },
        color: ['#60acfc', '#32d3eb', '#5bc49f', '#feb64d', '#ff7c7c', '#9287e7'],
        series: [
          {
            name: '本/专科统计',
            type: 'pie',
            center: ['50%', '45%'],
            radius: ['40%', '70%'],
            avoidLabelOverlap: true, // avoidLabelOverlap:是否启用防止标签重叠策略，默认开启
            label: {
              fontSize: 16,
              formatter: '设立{b} \n {c}个 \n ({d}%)',
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: 20,
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              show: true,
            },
            data: this.provinceStat
          }
        ]
      }
    }
  },
  watch: {
    // 监听省份变化(失败)
    province(val) {
      let province = val
      this.provinceStat = totalMajorNum[province]
      // 刷新 map
      this.updateChart()
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
